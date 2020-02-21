![](https://www.politico.com/interactives/cdn/images/badge.svg)

# react-stateface

Low-resolution SVG `jsx` components for all 50 United States along with DC and Puerto Rico. Lookup by postal code, fips code, or just the state's name. It comes with absolutely no styles allowing you to style as you see fit.

[See it in action!](https://the-politico.github.io/react-stateface/State/)

## Why This?
We're big fans of [ProPublica's StateFace font](https://propublica.github.io/stateface/) at the POLITICO Interactive Desk, but sometimes we need a level of precision that only SVGs have. For that reason, we've converted all of their glyphs into SVGs and loaded them up into an easy-to-use React component. Check out ProPublica's repo if font glyphs is a better/lighter solution for you.

## Quick Start

Installation:

```
$ yarn add react-stateface
```

Import it:

```javascript
import { State } from 'react-stateface';
```

Use it in your component:

```javascript
import React from "react";

const MyComponent = () => <State>{"FL"}</State>;

export default MyComponent;
```

## Development

Clone Repo:

```
$ git clone https://github.com/The-Politico/module_react-stateface
```

Install dependencies:

```
$ yarn
```

Start development server:

```
$ yarn start
```

Build assets:

```
$ yarn build
```

Publish:

```
$ git commit -m 'build message'.
$ git push origin master
$ yarn publish
```
