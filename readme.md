# RxJS Playground

Just a simple playground for play with RxJS

# Installation

Run npm install

# Start

Run npm start

# TSCONFIG

Ho inserito le lib "dom" e "es2015" rispettivamente per supportare `console.log` e `Promise`

# Map vs ConcatMap

Supponiamo di volere generare una sequenza di numeri con un delay, utilizzando `of` e `delay`, l'approcio iniziale potrebbe essere quello di usare una `map`:

```
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

```
const ob: Observable<number> = of(1, 2, 3)
.pipe(
  concatMap(value => of(value)
  .pipe(
    delay(800),
  )),
  tap( (value) => console.log(value)),
);

ob.subscribe(data => $('#time').text(data));
```

# Fix

- Ho dovuto aggiungere in webpack.config.json:
```
  resolve: {
    extensions: ['.js', '.ts'],
  },
```
altrimenti l'import dei miei file ts non venivano elaborati correttamente