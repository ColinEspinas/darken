
// Darken class
export default class darken {
	constructor(options) {

		// Default Options
		options = Object.assign({
			container: null,
			default: "light",
			toggle: null,
			remember: "darken-mode",
			class: "darken",
			variables: {},
		}, options);

		this.dark = false;

		// Get preference from local storage
		if (options.remember && localStorage.getItem(options.remember)) {
			options.default = localStorage.getItem(options.remember);
		}

		// Add click listener on toggle element if possible
		if (options.toggle) {
			document.querySelector(options.toggle).addEventListener('click', e => {
				e.preventDefault();
				// Toggles dark mode
				this.toggle();
			});
		}

		// Listen to darken-dark events and apply dark mode on event
		document.addEventListener('darken-dark', () => {
			// Adding dark mode class to container or body
			if (options.container) document.querySelector(options.container).classList.add(options.class);
			else document.body.classList.add(options.class);

			// Changing css variables on container or document
			const element = (options.container) ? document.querySelector(options.container) : document.documentElement;
			// Loop through CSS variables
			for (let [key, value] of Object.entries(options.variables)) {
				// Set CSS variable on dark value
				element.style.setProperty(key, value[1]);
			}
			// Set active mode in local storage
			if (options.remember) {
				localStorage.setItem(options.remember, this.dark ? "dark" : "light");
			}
		}, false);

		// Listen to darken-light events and apply light mode on event
		document.addEventListener('darken-light', () => {
			// Removing dark mode class to container or body
			if (options.container) document.querySelector(options.container).classList.remove(options.class);
			else document.body.classList.remove(options.class);

			// Changing css variables on container or document
			const element = (options.container) ? document.querySelector(options.container) : document.documentElement;
			// Loop through CSS variables
			for (let [key, value] of Object.entries(options.variables)) {
				// Set CSS variable on light value
				element.style.setProperty(key, value[0]);
			}
			// Set active mode in local storage
			if (options.remember) {
				localStorage.setItem(options.remember, this.dark ? "dark" : "light");
			}
		}, false);

		// Get default mode and turn dark mode on/off
		if (options.default === "light") {
			this.off();
		}
		else if (options.default === "dark") {
			this.on();
		}
	}

	// Toggle dark mode
	toggle() {
		this.dark = !this.dark;
		if (this.dark) document.dispatchEvent(new Event('darken-dark'));
		else document.dispatchEvent(new Event('darken-light'));
	}

	// Set dark mode to active
	on() {
		this.dark = true;
		document.dispatchEvent(new Event('darken-dark'));
	}

	// Set dark mode to inactive
	off() {
		this.dark = false;
		document.dispatchEvent(new Event('darken-light'));
	}
}