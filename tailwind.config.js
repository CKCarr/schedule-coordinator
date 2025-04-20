import withMT from "@material-tailwind/react/utils/withMT";

const config = ({
  content: [
    "./index.html",
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/configs/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
    colors: {
      primary: "#0d47a1",
      secondary: "#c62828",
      accent: "#cfd8dc",
      neutral: "#374151",
      "base-100": "#ffffff",
      info: "#3abff8",
      success: "#36d399",
      warning: "#fbbd23",
      error: "#f87272",
    },
    extend: {},
  },
  plugins: [],
});

export default withMT(config);
