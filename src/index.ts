import { Observable, of } from 'rxjs';
import { delay, concatMap, tap } from 'rxjs/operators';
import moment from 'moment';
import $ from 'jquery';
// import { autocomplete } from './promises/autocomplete';
import { autocomplete } from './observables/autocomplete';
import { mapping } from './../src/observables/operators/mapping';
import { timing } from './../src/observables/operators/timing';
import { creating } from './../src/observables/operators/creating';

const ob: Observable<number> = of(1, 2, 3).pipe(
  concatMap(value => of(value).pipe(delay(800))),
  tap(value => console.log(value)),
);

ob.subscribe(data => $('#time').text(data));

$('#time').text(moment().format());

const $autocompleteButton = $('#autocomplete');
$autocompleteButton.on('click', autocomplete);

const $creatingButton = $('#creating');
$creatingButton.on('click', creating);

const $mappingButton = $('#mapping');
$mappingButton.on('click', mapping);

const $timingButton = $('#timing');
$timingButton.on('click', timing);
