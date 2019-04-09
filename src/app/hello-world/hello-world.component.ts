import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  public loadGreeting(): Observable<string> {
    return new Observable<string>(observer => {
      setTimeout(() => observer.next('hello'), 5000);
      setTimeout(() => observer.next('world!'), 15000);
      setTimeout(() => observer.complete(), 15001);
    });
  }
}

@Component({
  selector: 'app-hello-world',
  template: `
    <p>{{ greeting$ }}</p>
  `
})
export class HelloWorldComponent implements OnInit, OnDestroy {
  constructor(private dataProviderService: DataProviderService) {}

  private subscription: Subscription;

  public greeting$: string;

  ngOnInit() {
    this.subscription = this.dataProviderService
      .loadGreeting()
      .subscribe(value => {
        this.greeting$ = value;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
