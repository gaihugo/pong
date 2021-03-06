import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    file: "public/dist/bundle.js",
    format: "cjs",
  },
  plugins: [resolve()],
};
