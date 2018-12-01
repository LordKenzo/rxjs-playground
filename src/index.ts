import { Observable, of } from 'rxjs';
import moment from 'moment';
import $ from 'jquery';

let ob: Observable<number> = of(1, 2, 3);
ob.subscribe(data => console.log(data));
$('#time').text(moment().format());
console.log('Hello!!!');
