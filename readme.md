# RxJS Playground

Just a simple playground for play with RxJS

## Installation

Run `npm install`

## Start

Run `npm start`

## TSCONFIG

Ho inserito le lib "dom" e "es2015" rispettivamente per supportare `console.log` e `Promise`

# Promise

Prima di vedere gli _Observables_ un ripasso veloce di un semplice Autocomplete implementato con le _Promises_.
Nel file autocomplete.ts faccio una prova con le Promise in cui vado a gestire:

- se ho lo stesso valore della query da inviare allora non invio la query, es. se mi muovo nel campo input senza modificarlo, con i tasti freccia, non reinvio la richiesta. Risolvo impostando il valore in `lastQuery`;
- invio la richiesta solamente dopo un tot di millisecondi in cui l'utente non digita. Risolvo impostando un intervallo che di volta in volta elimino con clearInterval;
- faccio vedere solo l'ultimo risultato associato dalla query inviata ed ignoro risposte precedenti arrivate in ritardo. Risolvo impostando un ID per ogni query con `currentQueryId` e `nextQueryId`.

Lo stesso esercizio lo posso impostare con gli `Observables`:

```js
import { fromEvent } from 'rxjs';

export function autocomplete() {
  const $title = document.getElementById('title');
  const $results = document.getElementById('results');
  if ($title && $results) {
    // Ritorna uno stream generato dall'evento keyup sull'elemento
    const keyUp$ = fromEvent($title, 'keyup');
    keyUp$.subscribe(event => {
      console.log((event.target as HTMLInputElement).value);
    });
  }
}
```

Nella versione con gli _Observable_ ho vari vantaggi:

- Codice più corto, ne risente la leggibilità e la qualità del codice;
- Non gestisco lo stato;
- Forma dichiarativa anzichè imperativa.

# Observable, Operators, Subscription

**Observables**: qualcosa che produce valori nel tempo e che possiamo osservarli.
**Operators**: sono operatori che ci permettono di modificare il valore dell'Observables, la maggior parte degli operatori ritornano un nuovo Observables. Non producono valori, li modificano.
**Subscription**: è il codice che poi manipola il valore ritornato dall'Observables.

Un esempio è il movimento del mouse, in cui il movimento ci produce un Evento dovuto al movimento (o al click), che può andare all'infinito, ma può essere la lettura di files da una folder, oppure una richiesta ad una API.

Vediamo un es. rudimentale ho una serie di cerchi che trasformo in rettangoli:

- _Observables_: next -> () -> next -> () -> next -> () next -> ... posso continuare all'infinito a meno di un segnale di complete o error
- _Operators_: [] -> [] -> [] -> ... (effettuo del side-effects - non tutti gli operatori lo fanno es. tap)
- _Subscriptions_: effettuano una azione, magari il calcolo dell'area del quadrato :D, qui effettuo qualcosa sul valore prodotto.

Gli Observables hanno 3 proprietà: **next** (produce un valore), **complete** (non produce nessun valore) ed **error** (produce un valore, solitamente un Error ma lo definiamo noi). Con l'error fermo, come il complete, lo stream dei dati.

Grazie a **RxJS**, abbiamo una serie di operatori per poter modificare e controllare la sorgente che produce il dato.

# Esempio Sequenza di numeri con delay

Supponiamo di volere generare una sequenza di numeri con un delay, utilizzando `of` e `delay`, l'approcio iniziale potrebbe essere quello di usare una `map`:

```js
const ob: Observable<number> = of(1, 2, 3).pipe(
  map(value => {
    console.log(value);
    return value;
  }),
  delay(2000),
);
ob.subscribe(data => $('#time').text(data));
```

La `map` è ridondante in quanto non farà nient'altro che ribadire il value e il risultato che otterrei è il valore 3 (dopo 2s) nella subscribe mentre in console.log otterrei la sequenza in maniera istanea.
La maniera corretta è:

```js
const ob: Observable<number> = of(1, 2, 3).pipe(
  concatMap(value => of(value).pipe(delay(800))),
  tap(value => console.log(value)),
);

ob.subscribe(data => $('#time').text(data));
```

Ovviamente c'è una soluzione migliore che sarà ovvia più avanti.

# Creazione di uno stream osservabile

Per giocare con RxJS è importante conoscere come creare facilmente uno stream di oggetti osservabili. Possiamo creare Observables da Promise, array, sequenze di numeri, stringe, ecc..
Una Promise produce un valore ed un solo valore in un tempo futuro. La promise produce il valore non appena è disponibile.
Uno stream di Observables produce una sequenza di valori in un tempo futuro. La produzione è lazy ovvero viene prodotto un valore nel momento in cui ho un Observer cioè un consumatore interessato al dato:

```js
const observable = new Observable(obs => {
  obs.next('Ciao Mondo');
  obs.next('Hello World!');
});
observable.subscribe(
  dato => console.log('Dato', dato),
  error => console.log('Errore', error),
  () => console.log('COMPLETE'),
);
```

# Mapping

Il mapping è una delle funzionalità più utilizzate, cioè quella di prendere una sequenza dello stream e manipolarla come ad esempio unirla ad un'altra sequenza, preservare o meno l'ordine, oppure scartare i precedenti risultati a fronte di un nuovo arrivo di un valore dallo stream: map, mergeMap, switchMap, concatMap.

**Map**: equivale alla map degli array in JavaScript o alla select in C#

# Fix

- Ho dovuto aggiungere in webpack.config.json:

```json
  resolve: {
    extensions: ['.js', '.ts'],
  },
```

altrimenti l'import dei miei file ts non venivano elaborati correttamente
