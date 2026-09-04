/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0e14",
        bg2: "#11151f",
        card: "#161b26",
        border: "#232a3a",
        accent: "#7c5cff",
        accent2: "#00e5c7",
        gold: "#ffb020",
        muted: "#8b93a7",
        played: "#00e5c7",
        planned: "#ffb020",
        dropped: "#ff5470"
      },
      borderRadius: {
        xl2: "18px"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        fadeUp: "fadeUp .5s ease backwards"
      }
    }
  },
  plugins: []
};
