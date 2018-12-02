import $ from 'jquery';
import { fromEvent } from 'rxjs';

import { getItems } from './../lib/suggest';
import { map, distinctUntilChanged, debounceTime, mergeMap, switchMap } from 'rxjs/operators';

export function autocomplete() {
  const $title = $('#title');
  const $results = $('#results');
  if ($title && $results) {
    // Ritorna uno stream generato dall'evento keyup sull'elemento
    const keyUp$ = fromEvent($title, 'keyup').pipe(
      map((e: any) => e.target.value),
      /* ottengo un Observable il cui valore next sarà la stringa dell'input
       * a cui accederò senza e.target.value ma direttamente
       */
      distinctUntilChanged(),
      /* Emetto valori dal flusso solo dopo un tot di ms senza che ci sia una
       * precedente emissione
       */
      debounceTime(250),
      // adesso la subscribe non dovrà fare più getItems ma ottengo l'array di items direttamente
      /**
       * di fatto con la mergeMap andiamo a fare un fork nella pipeline di emissione degli observable
       */
      // mergeMap(getItems),
      /**
       * Andiamo ad utilizzare la switchMap perchè se arriva qualcosa prima che la callback passata alla switchMap venga "risolta", questa viene scartata e passiamo al successivo. SwitchMap fornisce solo l'ultimo valore valido prima che arrivi un nuovo Observable
       */
      switchMap(getItems),
    );
    keyUp$.subscribe(items => {
      $results.empty();
      $results.append(items.map(item => $('<li />').text(item)));
    });
  }
}
