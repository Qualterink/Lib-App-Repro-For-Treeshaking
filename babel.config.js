const buildPresets = [["@babel/preset-env"], "@babel/preset-typescript"];
const optionalPlugins =
  process.env.NODE_ENV === "production"
    ? [["transform-remove-console", { exclude: ["error", "warn", "info"] }]]
    : ["@babel/transform-runtime"];

module.exports = {
  presets: buildPresets,
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    ...optionalPlugins
  ]
};
