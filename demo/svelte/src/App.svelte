<script>
	import Paper, { Title, Content } from "@smui/paper";
	import Textfield from "@smui/textfield";
	import DiacriticRemover from '@marketto/diacritic-remover';

	const diacriticRemover = new DiacriticRemover();

	const text = {
		_diacriticText: '',
		_cleanText: ' ',
		get diacritic() {
			return this._diacriticText;
		},
		set diacritic(value) {
			this._diacriticText = value;
			this._cleanText = diacriticRemover.replace(value);
		},
		get clean() {
			return this._cleanText || ' ';
		},
		set clean(value) {}
	};
</script>

<main>
	<img
		class="svelte-logo"
		src="https://raw.githubusercontent.com/sveltejs/svelte/29052aba7d0b78316d3a52aef1d7ddd54fe6ca84/site/static/images/svelte-android-chrome-512.png"
		alt="Svelte logo"	
	/>
	<Paper>
		<Title>Diacritic Remover</Title>
		<Content class="content">
			<Textfield
				class="text-input text-diacritic"
				variant="outlined"
				label="Type here text with accents/diacritics"
				bind:value={text.diacritic}
			></Textfield>
			<Textfield
				class="text-input text-clean"
				variant="outlined"
				label="Diacritic-free Text"
				bind:value={text.clean}
				readonly
			></Textfield>
		</Content>
	</Paper>
</main>

<style lang="scss">
	main {
		text-align: center;
		display: flex;
		flex-direction: column;
		padding: 2em;
		width: 80vw;
		max-width: 36em;
		margin: auto;

		.svelte-logo {
			max-width: 12em;
			margin: auto;
		}
	}
	:global(.content) {
		display: flex;
		flex-direction: column;
	}
	:global(.text-input) {
		margin: 2em 1em;
	}
	:global([readonly]) {
		pointer-events: none;
		border-color: blue;
	}
</style>