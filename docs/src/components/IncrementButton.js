import { define, emit } from '../../modules/sunup.js';

export default define({
	selector: 'increment-button',
	extends: HTMLButtonElement,
	noShadow: true,
	template: ({ props }) => /*html*/`
		<root class="button" @click="increment">
			<span id="counter-text" @color="changeColor">Counting: ${props.count}</span>
		</root>
	`,
	style: ({ props }) => /*css*/`
	`,
	props: {
		count: { default: 10 },
		color: { default: 'green' },
	},
	state: {
		count: null,
	},
	methods: {
		increment({ state }, target) { target.querySelector('#counter-text').textContent = `Counting: ${++state.count}`; },
		changeColor({ props }, target) { target.style.color = props.color; }
	},
	watch: {
		state: {
			count() { emit('update'); }
		},
		props: {
			color(component) { emit('color', { component }); }
		}
	},
	connected: (component) => {
		// console.log(component.props);
	},
	persist: "increment"
}, {extends: 'button'});