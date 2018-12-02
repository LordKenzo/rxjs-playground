import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export function creating() {
  of('hello', 'world')
    .subscribe( valore => console.log('Creating', valore));

  const observable = new Observable(obs => {
    obs.next('Ciao Mondo');
    obs.next('Hello World!');
  });
  observable.subscribe(dato => console.log('Dato', dato));
}
