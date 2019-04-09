# Observable Basics

This exercise helps you in understanding the basics of RxJS Observables and Observers. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

## Tasks

1. Create a component which subscribes to a Greeting-Observable that emits the string `"hello"` after 5 seconds and the string `"world!"` after 10 more seconds. Use `setTimeout` and `new Observable<string>()` to create this Observable. Finally, render the greeting message in the component.

2. Move the Observable-Creation into an own Service. 

3. Use the `ngOnDestroy`-hook to unsubscribe from the Greeting-Observable as soon as the component is destroyed. 

4. Follow the _Finnish Notation_ which is commonly used in Angular to declare variables that contain asynchronous values.

5. Emit an Error after 6 seconds. The component should render `ERROR` then. Check if `world!` is still rendered after 15 seconds?

6. Use the `async`-pipe to get rid of unsubscribing in the `ngOnDestroy`. 

7. Transform all greeting-values into uppercase and handle the error without `.subscription()`. Keep in mind that the `catchError`-operator needs to return a new Observable.

8. __BONUS:__ Merge to observables to show always the current second in front of the greeter-message, which will result in something like this: 

```
1s: 
2s: 
3s: 
4s: 
5s: HELLO 
6s: HELLO
...
9s: HELLO
10s: WORLD!
...
```

_HINT:_ use `combineLatest` to get this done. 
