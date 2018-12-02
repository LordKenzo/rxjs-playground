import { Observable, of } from 'rxjs';
import { delay, concatMap, tap } from 'rxjs/operators';
import moment from 'moment';
import $ from 'jquery';
import { autocomplete } from './autocomplete';

const ob: Observable<number> = of(1, 2, 3)
  .pipe(
    concatMap(value => of(value)
    .pipe(
      delay(800),
    )),
    tap( (value) => console.log(value)),
  );

ob.subscribe(data => $('#time').text(data));

$('#time').text(moment().format());

console.log('Hello!!!');

autocomplete();
