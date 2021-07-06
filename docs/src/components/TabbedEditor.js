import { define, emit } from '../../modules/sunup.js';

export default define({
	selector: 'tabbed-editor',
	template: ({ props, state }) => /*html*/`
		<root>
			<div class="tabs">
				<header class="tab-header">
					<ul class="tab-list">
						${ props.tabs.map((tab, index) => /*html*/`
							<li class="tab-name" @click="switchTab" tab-index="${index}">${tab.title}</li>
						`).join('') }
					</ul>
				</header>
			</div>
			<slot class="tab-body" name="${props.tabs[state.currentTab].name}">
				test
			</slot>
		</root>
	`,
	style: ({ props }) => /*css*/`
		
	`,
	props: {
		currentTab: { default: 1 },
		tabs: { default : [{ name: 'tab', title: 'My tab' }] },
	},
	state: {
		currentTab: null,
	},
	methods: {
		switchTab({ props, state }, target) {
			state.currentTab = target.getAttribute('tab-index');
		},
		getCurrentTabName({ props, state }) {
			return props.tabs[state.currentTab].name;
		}
	},
	watch: {
		state: {
			currentTab({ state, props, root, methods }) {
				root.querySelector('.tab-body').setAttribute('name', methods.getCurrentTabName({state, props}));
			}
		},
		props: {
			tabs({ props }) { console.log(props.tabs); }
		}
	},
	connected: ({props, state}) => {
		console.log(props.currentTab)
	},
});