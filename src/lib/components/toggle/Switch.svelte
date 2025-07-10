<script lang="ts">
	export let on: boolean;
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="160" height="219" viewBox="0 0 160 219">
	<g fill="none" fill-rule="evenodd">
		<g id="switch" class="clickable" transform="translate(8 69)" on:click>
			<circle cx="44" cy="20" r="4" fill="#BE2446" fill-rule="nonzero" />
			<polygon
				id="lightshadow"
				fill="#BE2446"
				fill-opacity=".2"
				fill-rule="nonzero"
				points="30 72 58 72 58 81 30 81"
			/>
			<polygon id="darkshadow" fill="#BE2446" fill-opacity=".25" points="30 72 58 72 58 75 30 75" />
			<polygon stroke="#BE2446" stroke-width="3" points="29 43 59 43 59 107 29 107" />
			<polygon id="pole" stroke="#BE2446" stroke-width="6" points="31 46 57 46 57 69 31 69" />
			<circle cx="44" cy="128" r="4" fill="#BE2446" fill-rule="nonzero" />
			<polygon stroke="#BE2446" stroke-width="3" points="0 0 88 0 88 148 0 148" />
		</g>
	</g>
</svg>

<style>
	.clickable {
		cursor: pointer;
	}
	svg {
		height: 71px;
		width: auto;
		margin-right: -23px;
	}
</style>
