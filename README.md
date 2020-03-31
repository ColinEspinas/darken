# darken

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c113e5acfef64430ae0db6917a78b612)](https://app.codacy.com/manual/ColinEspinas/darken?utm_source=github.com&utm_medium=referral&utm_content=ColinEspinas/darken&utm_campaign=Badge_Grade_Dashboard)
[![Size badge](https://img.shields.io/bundlephobia/min/darken)](https://bundlephobia.com/result?p=darken)
[![Npm badge](https://img.shields.io/npm/v/darken)](https://www.npmjs.com/package/darken)
[![Issue Badge](https://img.shields.io/github/issues/colinespinas/darken)](https://github.com/ColinEspinas/darken/issues)
[![Licence Badge](https://img.shields.io/github/license/colinespinas/darken)](https://github.com/ColinEspinas/darken/blob/master/LICENSE)

A **lightweight and cross-browser** library that allows you to easely **manage your dark mode** for your websites and applications. 

Written in plain vanilla javascript.

<!-- FEATURES -->
## Features

* Easy control over your dark mode
* Custom class on dark mode
* Switch CSS variables values on light/dark modes
* Switch between different stylesheets on light/dark modes
* Use prefers-color-scheme to get user preference
* Use timestamps to change modes at chosen times
* Save user preference to local storage

Check the [demo](https://colinespinas.github.io/darken/) to get a live exemple.

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Getting Started](#getting-started)
* [Usage](#usage)
* [Options](#options)
* [API](#api)
* [Testing](#testing)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## Getting Started

### ✈️ Using the CDN

Just use this snippet to include darken to your code:
```html
<script src="https://unpkg.com/darken"></script>
<script>
	const darkmode = new darken();
</script>
```

### 📦 Using NPM

Install darken with npm:
```sh
npm install darken
```

And import it in your code:
```javascript
import darken from 'darken';

const darkmode = new darken();
```

## Usage

Here is a basic usage of darken:
```html
<!-- index.html -->

<button id="darkmode-button">Toggle dark mode</button>

<script src="path/to/darken"></script>
<script>
	const darkmode = new darken({
		class: "darkmode-active",
		variables: {
			"--primary-color" : ["#000000", "#fafafa"],
			"--background-color" : ["#fafafa", "#000000"]
		},
		toggle: "#darkmode-button",
	});
</script>
```

You can either use a class and/or CSS variables to customize your styles.


## Options

```javascript
const defaultOptions = {
	container: null,
	default: "light",
	toggle: null,
	remember: "darken-mode",
	usePrefersColorScheme: true,
	timestamps: {},
	class: "darken",
	variables: {},
	stylesheets: {},
}
```

### container
*Type: `String`*, *Default: `null`*

Element selector to the container of darken. The dark mode will be applied only to the selected container.

If the value is left to `null`, the document element will be selected instead.

### default
*Type: `String`*, *Default: `"light"`*

Defines the default mode on page load.

### toggle
*Type: `String`*, *Default: `null`*

Element selector to the toggle button, the selected element will call the `toggle` method on click.

### remember
*Type: `String`*, *Default: `"darken-mode"`*

Name of the value stored in the browser local storage, this value contains the active mode ("dark" or "light").

If this option is set to `null` the active mode is not stored.

### usePrefersColorScheme
*Type: `Boolean`*, *Default: `true`*

If `true` the `prefers-color-scheme` media query will be used to determine the default mode.

If the `remember` option is active, this will only be used if no active mode is stored (in most case the first time a user comes to the app/website). If the `remember` option is not active then a listener will be added to the `prefers-color-scheme` media query for live update.

### stylesheets
*Type: `Object`*, *Default: `{}`*

Define the stylesheet path of each mode. This stylesheet `href` will be changed on mode switch dynamically. The stylesheet will be removed if no path is given for a mode.

Default stylesheet `id` is `darken-stylesheet` but can be changed.

```javascript
stylesheets: {
	id: "darkmode-stylesheet",
	dark: "dark.css",
	light: "light.css",
}
```

### timestamps
*Type: `Object`*, *Default: `{}`*

Define a timestamps mode switch to start light and dark modes at given times of the day.

There is 2 keys to the object, `dark` and `light`, the values of those keys are defining the times (using the format `<hours>:<minutes>`) at wich the corresponding mode will start being active.

If the `remember` option is active, this will only be used if no active mode is stored (in most case the first time a user comes to the app/website). 

If the `usePrefersColorScheme` option is active, this option will not be used.

```javascript
timestamps: {
	dark: "20:00",
	light: "6:00",
}
```

### class
*Type: `String`*, *Default: `"darken"`*

Class that will be added to the selected container when the dark Fmode is active. The class is removed of the selected container once the dark mode is disabled.

If no container is selected, the class will be added to the `body` element instead.

### variables
*Type: `Object`*, *Default: `{}`*

List of CSS variables that will change when the dark mode is active.

The keys of the object are the variables names, the value are arrays where the 1th index is the value the variable will take in lightmode and the 2nd index the value the variable will take in dark mode. This is the most compact way to use variables.

```javascript
variables: {
	"--name-of-the-variable": ["light mode value", "dark mode value"],
	"--background-color": ["white", "black"],
}
```

If you prefer, you can use an object based syntax. This syntax is more clear but less compact.

```javascript
variables: {
	"--name-of-the-variable": {
		light: "light mode value",
		dark: "dark mode value"
	},
	"--background-color": {
		light: "white", 
		dark: "black"
	},
}
```



## API

The `darken` class is the entry point to the library.

```javascript
const darkmode = new darken(options, callback);
```

See details about options [above](#options). The `options` are optional.

The `callback` method will be called at every mode switch with a `active` boolean parameter. The `callback` is optional.

```javascript
const darkmode = new darken(function(active) {
	if (active) console.log("Dark mode is active");
	else console.log("Dark mode is inactive");
});
```

### toggle()
*Return: `none`*

Toggles dark mode.

```javascript
darkmode.toggle();
```

### on()
*Return: `none`*

Enables dark mode.

```javascript
darkmode.on();
```

### off()
*Return: `none`*

Disables dark mode.

```javascript
darkmode.off();
```

<!-- TEST -->
## Testing

You can launch tests and generate a coverage report using the following npm command :
```sh
npm test
```
If you want to test while developing, another command triggers the watch mode (But it does not generate coverage report) :
```sh
npm run test:watch
```

<!-- CONTRIBUTING -->
## Contributing

Any help and contribution is always welcome, feel free to submit issues and/or contribute to the project.

1. Fork the Project
2. Create your Feature or Fix Branch (`git checkout -b feature/feature-name` or `git checkout -b fix/fix-name`)
3. Commit your Changes (`git commit -m 'Add some feature or fix'`)
4. Push to the Branch (`git push origin feature/feature-name` or `git push origin fix/fix-name`)
5. Open a Pull Request



<!-- LICENSE -->
## License

darken is distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact
[![Buy me a coffee badge](https://img.shields.io/badge/-Buy%20me%20a%20coffee-important?logo=buy%20me%20a%20coffee&logoColor=white)](https://www.buymeacoffee.com/ColinEspinas)
[![LinkedIn badge](https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555)](https://www.linkedin.com/in/colin-espinas-9739b8178/l)

Colin Espinas - [Website](https://colinespinas.com) - contact@colinespinas.com

Project link: [https://github.com/ColinEspinas/darken](https://github.com/ColinEspinas/darken)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [microbundler](https://github.com/developit/microbundle)
