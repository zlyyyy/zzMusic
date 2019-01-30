// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true,
	},
	extends: [
		// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
		// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
		'plugin:vue/essential', 
		// https://github.com/standard/standard/blob/master/docs/RULES-en.md
		'standard'
	],
	// required to lint *.vue files
	plugins: [
		'vue'
	],
	// add your custom rules here
	rules: {
		// allow async-await
		'generator-star-spacing': 'off',
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-tabs': 0,//不允许使用 tab 字符，包括在注释内
		'indent': 0,//强制使用一致的缩进风格。默认是 4个空格
		'eol-last': 0,//文件以单一的换行符结束
		// "space-before-blocks": [0, "always"],//不以新行开始的块 前面要不要有空格
		"space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
		"space-in-parens": [0, "never"],//小括号里面要不要有空格
		"eqeqeq": "off",//必须使用全等，off关闭
		'no-unneeded-ternary': 0,// 允许三目运算中使用布尔值
		"no-unused-expressions": 0,//短路求值和三目运算都允许
		"vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],//iView将标签渲染为原生html标签时，由于这些标签是自闭合的，所以有end标签会报错。
		"no-useless-escape": "off" //不允许在字符串和正则表达式中使用无意义的换行符
	}
}
