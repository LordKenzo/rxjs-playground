import { of } from 'rxjs';
import { tap, switchMap, mergeMap, map, delay, concatMap } from 'rxjs/operators';

export function mapping() {
  const obs = of(1, 2, 3)
    .pipe(
      tap(x => console.log('prima', x)),
      // map(x => x),
      // mergeMap(getValore),
      concatMap(getValore),
      // tap( (x) => console.log(x)),
    )
    .subscribe(valore => console.log('valore', valore));
}

function getValore(x: number) {
  return of(x + 1).pipe(delay(Math.floor(Math.random() * 4) + 1 * 800));
}
