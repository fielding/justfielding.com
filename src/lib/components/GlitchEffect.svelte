<div>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="svg-filters">
		<defs>
			<filter id="filter-glitch">
				<feTurbulence type="fractalNoise" baseFrequency="0.00001" numOctaves="1" result="warp" />
				<feOffset dx="-90" dy="-90" result="warpOffset" />
				<feDisplacementMap
					xChannelSelector="R"
					yChannelSelector="G"
					scale="30"
					in="SourceGraphic"
					in2="warpOffset"
				/>
			</filter>
		</defs>
	</svg>
</div>

<style>
	:global(.svg-filters) {
		position: absolute;
		visibility: hidden;
		width: 1px;
		height: 1px;
	}
	/* Transparent outline gives the SVG displacement filter bleed-room so the
	   glitch effect isn't clipped at the glyph edge. !important locks it against
	   focus-visible overrides. */
	:global(.glitched) {
		-webkit-transition: background-color 0.1s ease-out;
		-moz-transition: background-color 0.1s ease-out;
		transition: background-color 0.1s ease-out;
		transform: translateZ(0);
		outline: 90px solid transparent !important;
	}
	:global(.glitched:focus-visible) {
		text-decoration: underline;
		text-decoration-color: var(--accent);
		text-decoration-thickness: 2px;
		text-underline-offset: 3px;
	}
</style>
