import { Observable, of } from 'rxjs';

let ob: Observable<number> = of(1, 2, 3);
ob.subscribe(data => console.log(data));
