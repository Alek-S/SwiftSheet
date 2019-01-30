/**
 * default themes for use with styled-components
 * passed in with theme provider
 */
const theme = {
	color: {
		background: '#fafafa',
		border: '#d9d9d9',
		text: '#404040',
		lightText: '#848484',
		red: '#ED5050',
		green: '#D8E13F',
		blue: '#46C8F5',
		darkBlue: '#2E8AA8',
	},
	gradient: {
		light: `linear-gradient(to bottom, #ffffff 0%, #f6f6f6 47%, #ededed 100%)`,
		red: 'linear-gradient(to bottom, #f07878 0%, #ED5050 100%)',
		lightRed: 'linear-gradient(to bottom, #f39191 0%, #ef6262 100%)',
	},
	font: {
		header: `'Poiret One', cursive`,
		main: `'Quicksand', sans-serif`,
	},
};

export default theme;
