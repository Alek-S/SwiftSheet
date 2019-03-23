/**
 * default themes for use with styled-components
 * passed in with theme provider
 */
const theme = {
	boxShadow: `0px 5px 40px -5px rgba(0,0,0,0.3)`,
	boxShadowDark: `0px 5px 40px -2px rgba(0,0,0,0.5)`,
	color: {
		background: '#fafafa',
		backgroundDark: '#EAEAEA',
		backgroundDarkest: '#BCBCBC',
		border: '#d9d9d9',
		text: '#404040',
		lightText: '#848484',
		red: '#ED5050',
		lightRed: '#FF8D8D',
		green: '#D8E13F',
		blue: '#46C8F5',
		lightBlue: '#97E4FF',
		darkBlue: '#2E8AA8',
	},
	gradient: {
		light: `linear-gradient(to bottom, #ffffff 0%, #f6f6f6 47%, #ededed 100%)`,
		red: 'linear-gradient(to bottom, #f07878 0%, #ED5050 100%)',
		lightRed: 'linear-gradient(to bottom, #f39191 0%, #ef6262 100%)',
		blue: 'linear-gradient(to bottom, #D8E13F 0%, #BFC644 100%)',
		greenBlue: ' linear-gradient(160deg, #57DACB 0%, #55A2ED 100%)',
	},
	font: {
		header: `'Poiret One', cursive`,
		main: `'Quicksand', sans-serif`,
	},
};

export default theme;
