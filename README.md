# darken

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c113e5acfef64430ae0db6917a78b612)](https://app.codacy.com/manual/ColinEspinas/darken?utm_source=github.com&utm_medium=referral&utm_content=ColinEspinas/darken&utm_campaign=Badge_Grade_Dashboard)
[![Issue Badge](https://img.shields.io/github/issues/colinespinas/darken)](https://github.com/ColinEspinas/darken/issues)
[![Licence Badge](https://img.shields.io/github/license/colinespinas/darken)](https://github.com/ColinEspinas/darken/blob/master/LICENSE)
[![Demo badge](https://img.shields.io/badge/-Demo%20Available-brightgreen)]()

🌑 Darkmode made easy

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Getting Started](#getting-started)
* [Usage](#usage)
	* [Basic](#basic)
	* [Options](#options)
	* [API](#api)
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

### Basic

Here is a basic usage of darken:
```html
<!-- index.html -->

<button id="darkmode-button">Toggle darkmode</button>

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
	class: "darken",
	variables: {},
}
```

### container
*Type: `String`*, *Default: `null`*

Element selector to the container of darken. The darkmode will be applied only to the selected container.

If the value is left to ``null`, the document element will be selected instead.

### default
*Type: `String`*, *Default: `"light"`*

Defines the default mode on page load.

### toggle
*Type: `String`*, *Default: `null`*

Element selector to the toggle button, the selected element will call the `toggle` method on click.

### class
*Type: `String`*, *Default: `"darken"`*

Class that will be added to the selected container when the darkmode is active. The class is removed of the selected container once the darkmode is disabled.

If no container is selected, the class will be added to the `body` element instead.

### variables
*Type: `Object`*, *Default: `{}`*

List of CSS variables that will change when the darkmode is active.

The keys of the object are the variables names, the value are arrays where the 1th index is the value the variable will take in lightmode and the 2nd index the value the variable will take in darkmode.

```javascript
variables: {
	"--name-of-the-variable": ["lightmode value", "darkmode value"],
	"--background-color": ["white", "black"],
}
```


## API

The `darken` class is the entry point to the library.

```javascript
const darkmode = new darken(options);
```

### toggle()
*Return: `none`*

Toggles darkmode.

```javascript
darkmode.toggle();
```

### on()
*Return: `none`*

Enables darkmode.

```javascript
darkmode.on();
```

### off()
*Return: `none`*

Disables darkmode.

```javascript
darkmode.off();
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

Colin Espinas - [Website](https://colinespinas.com) - contact@colinespinas.com

Project link: [https://github.com/ColinEspinas/darken](https://github.com/ColinEspinas/darken)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [microbundler](https://github.com/developit/microbundle)