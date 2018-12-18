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
		"eqeqeq": "off"//必须使用全等，off关闭
	}
}
