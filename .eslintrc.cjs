module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended", // 继承Eslint中推荐的（打钩的）规则项
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",  // 此项是用来配置vue.js风格
        "./.eslintrc-auto-import.json"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "ignorePatterns": ["vite.config.ts", 'src/components/common/**/*.vue'], // 忽略
    "rules": {
        // JavaScript
        'no-console': 0, // 不允许使用 console.log 等
        "no-var": 0, // 禁用var，用let和const代替

        'no-undef': 1, // 不允许使用未定义的变量
        'no-unused-vars': 1, // 不允许存在未使用的变量
        "no-debugger": 1, // 禁止使用debugger
        "no-else-return": 1, // 如果if语句里面有return,后面不能跟else语句
        "no-empty": 1, // 块语句中的内容不能为空
        "no-extra-parens": 1, // 禁止非必要的括号
        "no-lone-blocks": 1, // 禁止不必要的嵌套块
        "no-return-assign": 1, // return 语句中不能有赋值表达式
        "no-shadow": 1, // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
        "no-unneeded-ternary": 1, // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
        "no-unreachable": 1, // 不能有无法执行的代码
        "no-unused-expressions": 1, // 禁止无用的表达式
        "complexity": [1, 10], // 圈复杂度
        "max-depth": [1, 4], // 嵌套块深度
        "max-nested-callbacks": [1, 2], // 回调嵌套深度
        "max-params": [1, 4], // 函数最多只能有4个参数
        "max-statements": [1, 10], // 函数内最多有几个声明
        "semi": [1, "always"], // 语句强制分号结尾

        "eqeqeq": 2, // 必须使用全等
        "block-scoped-var": 2, // 块语句中使用var
        "no-dupe-keys": 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-dupe-args": 2, // 函数参数不能重复
        "no-duplicate-case": 2, // switch中的case标签不能重复
        "no-eq-null": 2, // 禁止对null使用==或!=运算符
        "no-ex-assign": 2, // 禁止给catch语句中的异常参数赋值
        "no-extra-semi": 2, // 禁止多余的冒号
        "no-func-assign": 2, // 禁止重复的函数声明
        "no-invalid-regexp": 2, // 禁止无效的正则表达式
        "no-label-var": 2, // label名不能与var声明的变量名相同
        "no-lonely-if": 2, // 禁止else语句内只有if语句
        "no-redeclare": 2, // 禁止重复声明变量
        "no-self-compare": 2, // 不能比较自身
        "no-spaced-func": 2, // 函数调用时 函数名与()之间不能有空格
        "use-isnan": 2, // 禁止比较时使用NaN，只能用isNaN()
        "no-inner-declarations": [2, "functions"], // 禁止在块语句中使用声明（变量或函数）
        "comma-style": [2, "last"], // 逗号风格，换行时在行首还是行尾


        // Vue
        'vue/html-self-closing': 0, // 关闭自闭合标签要求
        'vue/no-v-html': 0, // 允许使用 v-html 指令
        "vue/no-deprecated-destroyed-lifecycle": 1, // 此规则报告已弃用和生命周期挂钩的使用情况。（在 Vue.js 3.0.0+ 中）
        "vue/no-deprecated-slot-attribute": 1, // 使用了弃用的slot
        "vue/no-deprecated-slot-scope-attribute": 1, // 使用了弃用的slot-scope
        "vue/no-ref-as-operand": 1, // 此规则报告错误地将 ref 用作操作数的情况
        "vue/no-side-effects-in-computed-properties": 1, // 此规则旨在防止代码在计算属性和函数中产生副作用
        "vue/valid-v-if": 2, // 此规则检查每个指令是否有效



        // TypeScript
        '@typescript-eslint/explicit-module-boundary-types': 0, // 允许不显式指定导出函数的返回类型
        '@typescript-eslint/no-explicit-any': 0, // 允许使用 any 类型
        '@typescript-eslint/no-unused-vars': 1, // 不允许存在未使用的 TypeScript 变量
    }
};
