import { define, emit } from '../../modules/sunup.js';
import darken from '../../modules/darken.js';

import TabbedEditor from './TabbedEditor.js';

export default define({
	selector: 'sunup-app',
	noShadow: true,
	template: ({ state }) => /*html*/`
		<div class="container">
			<header>
				<h1>darken</h1>
				<button id="dm-toggle" @click="toggleDarkmode">Toggle darkmode</button>
			</header>
			<p>This is a demo for darken a javascript library that makes dark-mode easy, check it on <a href="https://github.com/ColinEspinas/darken">Github</a> or <a href="https://www.npmjs.com/package/darken">NPM</a></p>
			<tabbed-editor :tabs='[{ "name": "html", "title": "index.html" }, { "name": "css", "title": "style.css" }]'>
				<div slot="html">
				index.html
				</div>
				<div slot="css">style.css</div>
			</tabbed-editor>
		</div>
	`,
	state: {
		title: "Hello, World!",
		name: "You",
		darkmode: new darken({
			variables: {
				"--primary-color": ["#ffffff", "#000000"],
				"--secondary-color": ["#000000", "#ffffff"],
			}
		}),
	},
	methods: {
		setTitle({ state }) { state.title = `Hello, ${ state.name }!`; },
		toggleDarkmode({ state }) { state.darkmode.toggle(); },
	},
	watch: {
		state: {
			title({ root, state }) { 
				root.querySelector("#title").textContent = state.title;
			},
		}
	}
});