// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginVue from "eslint-plugin-vue";

module.exports = {
    "env":{
      "browser":true,
      "es2021":true,
      "node":true
    },
    "extends":[
      "eslint:recommended",
      "plugin:vue/vue3-recommended",
      "plugin:@typescript-eslint/recommended",
      "@vue/typescript/recommended"
    ],
    "parserOptions":{
      "ecmaVersion":"lastest",
      "parser":"@typescript-eslint/parser",
      "sourceType":"module"
    },
    "rules":{
      "vue/html-self-closing":"off",
      "vue/max-attributes-per-line":"off",
      "vue/singleline-html-element-content-newline":"off",
      "vue/multi-word-component-names":"off"
    },
    globals:{
      defineProps:"readonly",
      defineOptions:"readonly",
    }
  }
  // export default [
  //   // {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  //   // pluginJs.configs.recommended,
  //   // ...tseslint.configs.recommended,
  //   // ...pluginVue.configs["flat/essential"],
  // ];