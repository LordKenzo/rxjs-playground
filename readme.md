# RxJS Playground

Just a simple playground for play with RxJS

# Installation

Run npm install

# Start

Run npm start

# TSCONFIG

Ho inserito le lib "dom" e "es2015" rispettivamente per supportare `console.log` e `Promise`

# Fix

- Ho dovuto aggiungere in webpack.config.json:
```
  resolve: {
    extensions: ['.js', '.ts'],
  },
```
altrimenti l'import dei miei file ts non venivano elaborati correttamente