import { Component, OnInit, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  public loadGreeting(): Observable<string> {
    return new Observable<string>(observer => {
      setTimeout(() => observer.next('hello'), 5000);
      setTimeout(() => observer.error('error'), 6000);
      setTimeout(() => observer.next('world!'), 15000);
      setTimeout(() => observer.complete(), 15001);
    });
  }
}

@Component({
  selector: 'app-hello-world',
  template: `
    <p>{{ greeting$ | async }}</p>
  `
})
export class HelloWorldComponent implements OnInit {
  constructor(private dataProviderService: DataProviderService) {}

  public greeting$: Observable<string>;

  ngOnInit() {
    this.greeting$ = this.dataProviderService.loadGreeting().pipe(
      catchError(() => of('error')),
      map(v => v.toUpperCase()),
    );
  }
}
