// Darken class
export default class Darken {

  constructor(options, callback) {
    // If no options are passed
    if (typeof options === "function") {
      callback = options;
      options = {};
    }

    // Default Options
    options = Object.assign({
      container: null,
      default: "light",
      toggle: null,
      remember: "darken-mode",
      usePrefersColorScheme: true,
      class: "darken",
      stylesheets: {},
      timestamps: {},
      variables: {},
    }, options);

    this.dark = false;
    const now = new Date();

    // Get preference from local storage
    if (options.remember) {
      if (localStorage.getItem(options.remember)) {
        options.default = localStorage.getItem(options.remember);
      }
      // If no preference is found in storage
      else if (options.usePrefersColorScheme) {
        // Use prefers-color-scheme media query
        options.default = this.#checkMatchMedia() || options.default;
      }
      else if (Object.keys(options.timestamps).length > 0 && options.timestamps.dark && options.timestamps.light) {
        // Use timestamps
        options.default = this.#checkTimestamps(options, now);
      }
    }
    else if (options.usePrefersColorScheme) {
      // Use prefers-color-scheme media query
      options.default = this.#checkMatchMedia() || options.default;
      // Add listeners on prefers-color-scheme media query
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (e.matches) this.on();
      });
      window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
        if (e.matches) this.off();
      });
    }
    else if (Object.keys(options.timestamps).length > 0 && options.timestamps.dark && options.timestamps.light) {
      // Use timestamps
      options.default = this.#checkTimestamps(options, now);
    }

    // Add click listener on toggle element if possible
    if (options.toggle) {
      document.querySelector(options.toggle).addEventListener("click", this.#handleClick.bind(this));
    }

    // Listen to darken-dark events and apply dark mode on event
    document.addEventListener("darken-dark", this.#handleDarkenEvent(options, callback, "add"), false);

    // Listen to darken-light events and apply light mode on event
    document.addEventListener("darken-light", this.#handleDarkenEvent(options, callback, "remove"), false);

    // Get default mode and turn dark mode on/off
    if (options.default === "light") {
      this.off();
    }
    else if (options.default === "dark") {
      this.on();
    }
  }

  // Handle darken events
  #handleDarkenEvent(options, callback, action) {
    //Returning the function, to pass arguments but not execute the business logic
    return () => {
      if (options.container) document.querySelector(options.container).classList[action](options.class);
      else document.body.classList[action](options.class);
      const element = (options.container) ? document.querySelector(options.container) : document.documentElement;
      // Loop through CSS variables
      for (const [key, value] of Object.entries(options.variables)) {
        // Set CSS variable on light value
        if (value && typeof value === "object") {
          // If using array syntax
          if (Array.isArray(value)) element.style.setProperty(key, this.dark ? value[1] : value[0]);
          // If using object syntax
          else element.style.setProperty(key, value[this.dark ? "dark" : "light"]);
        }
      }
      // Set color-scheme to :root
      document.documentElement.style.setProperty("color-scheme", this.dark ? "dark" : "light");
      // Set stylesheet
      this.#changeStylesheet(options.stylesheets.id, options.stylesheets[this.dark ? "dark" : "light"]);
      // Set active mode in local storage
      if (options.remember) {
        localStorage.setItem(options.remember, this.dark ? "dark" : "light");
      }
      // Call callback giving the active mode as parameter
      if (typeof callback === "function") callback(this.dark);
    }
  }

  // Handle click on toggle button
  #handleClick(e) {
    e.preventDefault();
    this.toggle();
  }

  // Checks match media and return corresponding default
  #checkMatchMedia() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
    return undefined;
  }

  // Normalize timestamps object to Date objects
  #normalizeTimestamps(timestamps) {
    for (let [key, value] of Object.entries(timestamps)) {
      let date = new Date();
      const time = value.split(":");
      date.setHours(time[0], time[1], 0, 0);
      timestamps[key] = date;
    }
  }

  // Change stylesheet with given id or "darken-stylesheet"
  #changeStylesheet(id, path) {
    let stylesheet = document.head.querySelector("#" + id || "#darken-stylesheet");
    if (stylesheet) {
      if (path) stylesheet.href = path;
      else document.head.removeChild(stylesheet);
    }
    else {
      if (path) {
        stylesheet = document.createElement("link");
        stylesheet.id = id || "darken-stylesheet";
        stylesheet.rel = "stylesheet";
        stylesheet.type = "text/css";
        stylesheet.href = path;
        document.head.appendChild(stylesheet);
      }
    }
  }

  // Checks timestamps and return corresponding default
  #checkTimestamps(options, date) {
    this.#normalizeTimestamps(options.timestamps);
    if (
      (options.timestamps.dark < date && date > options.timestamps.light) 
      || (options.timestamps.dark > date && date < options.timestamps.light)
    ) return "dark";
    return "light";
  }

  // Toggle dark mode
  toggle() {
    this.dark = !this.dark;
    if (this.dark) document.dispatchEvent(new Event("darken-dark"));
    else document.dispatchEvent(new Event("darken-light"));
  }

  // Set dark mode to active
  on() {
    this.dark = true;
    document.dispatchEvent(new Event("darken-dark"));
  }

  // Set dark mode to inactive
  off() {
    this.dark = false;
    document.dispatchEvent(new Event("darken-light"));
  }
}