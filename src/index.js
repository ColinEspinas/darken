
// Darken class
export default class darken {
	constructor(options) {

		// Default Options
		options = Object.assign({
			container: null,
			default: "light",
			toggle: null,
			class: "darken",
			variables: {},
		}, options);

		// Add click listener on toggle element if possible
		if (options.toggle) {
			document.querySelector(options.toggle).addEventListener('click', e => {
				e.preventDefault();

				// Toggles darkmode
				this.toggle();
			});
		}

		document.addEventListener('darken-dark', function () {
			// Adding darkmode class to container or body
			if (options.container) document.querySelector(options.container).classList.add(options.class);
			else document.body.classList.add(options.class);

			// Changing css variables on container or document
			const element = (options.container) ? document.querySelector(options.container) : document.documentElement;
			// Loop through CSS variables
			for (let [key, value] of Object.entries(options.variables)) {
				// Set CSS variable on dark value
				element.style.setProperty(key, value[1]);
			}
		}, false);

		document.addEventListener('darken-light', function () {
			// Removing darkmode class to container or body
			if (options.container) document.querySelector(options.container).classList.remove(options.class);
			else document.body.classList.remove(options.class);

			// Changing css variables on container or document
			const element = (options.container) ? document.querySelector(options.container) : document.documentElement;
			// Loop through CSS variables
			for (let [key, value] of Object.entries(options.variables)) {
				// Set CSS variable on light value
				element.style.setProperty(key, value[0]);
			}
		}, false);

		if (options.default === "light") {
			this.off();
		}
		else if (options.default === "dark") {
			this.on();
		}
	}

	toggle() {
		this.dark = !this.dark;
		if (this.dark) document.dispatchEvent(new Event('darken-dark'));
		else document.dispatchEvent(new Event('darken-light'));
	}

	on() {
		this.dark = true;
		document.dispatchEvent(new Event('darken-dark'));
	}

	off() {
		this.dark = false;
		document.dispatchEvent(new Event('darken-light'));
	}
}