module.exports = {
  "stories": [
    "../packages/**/*.stories.js",
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-storysource" // 新增
  ]
}