module.exports = {
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [
      'node',
      'node-addons'
    ]
  },
  moduleFileExtensions: ["js", "ts", "vue"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\js$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!@directus/shared)"],
};
