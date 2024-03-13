/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			poppins: ['Poppins', 'sans-serif']
		},
		colors: {
			case: {
				gray: 'F0F0F0',
				red: 'FF9B9B',
				green: 'BEF388',
				blue: 'B4F6FF',
				orange: 'FFC37C',
				pruple: 'CF93FF',
				darkblue: 'AEB9FF',
				pink: 'FF8CFA'
			},
			background: '#FFFCE0',
			popup: '#F0F0F0'
		},
		extend: {}
	},
	plugins: []
};
