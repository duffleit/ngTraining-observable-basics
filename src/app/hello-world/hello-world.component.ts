import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import {
  Observable,
  of,
  interval,
  merge,
  combineLatest
} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  public loadGreeting(): Observable<string> {
    return new Observable<string>(observer => {
      setTimeout(() => observer.next('hello'), 5000);
      // setTimeout(() => observer.error('error'), 6000);
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
    const secondObservable = interval(1000);
    const greetingObservable = merge(
      of(''),
      this.dataProviderService.loadGreeting().pipe(
        catchError(() => of('error')),
        map(v => v.toUpperCase())
      )
    );

    this.greeting$ = combineLatest(secondObservable, greetingObservable).pipe(
      map(value => {
        return `${value[0]}s: ${value[1]}`;
      })
    );
  }
}
