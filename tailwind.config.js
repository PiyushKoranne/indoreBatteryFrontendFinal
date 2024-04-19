/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
	screens:{
		'320': '320px',
		'375': '375px',
		'420': '420px',
		'480': '480px',
		'560': '560px',
		'650': '650px',
		'768': '768px',
		'850': '850px',
		'980': '980px',
		'1024': '1024px',
		'1200': '1200px',
		'1368': '1368px',
		'1440': '1440px',
		'1500': '1500px',
		'1679': '1679px',
		'1749': '1749px',
		'1919': '1919px',
	}
  },
  plugins: [],
}

