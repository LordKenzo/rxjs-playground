import { of, interval } from 'rxjs';
import { tap } from 'rxjs/operators';

export function timing() {
  // Emette valori ogni x ms partendo da 0
  interval(1000)
    .subscribe( valore => console.log('Interval', valore));
}
