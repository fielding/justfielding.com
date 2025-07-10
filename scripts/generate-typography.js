import Typography from 'typography';

const typography = new Typography({
	baseFontSize: '20px',
	baseLineHeight: 1.45,
	scaleRatio: 4,
	googleFonts: [
		{
			name: 'Titillium+Web',
			styles: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
		},
		{
			name: 'Inconsolata',
			styles: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
		}
	],
	headerFontFamily: ['Titillium Web', 'sans-serif'],
	bodyFontFamily: ['Inconsolata', 'monospace'],
	bodyColor: '#1b1a19',
	includeNormalize: true,
	overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => {
		return {
			'@media only screen and (max-width:480px)': {
				html: {
					fontSize: '16px'
				}
			}
		};
	}
});

// node scripts/generate-tyopography.js > src/app.css
console.log(typography.toString());
