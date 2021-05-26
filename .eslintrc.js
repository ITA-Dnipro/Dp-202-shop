module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
		'airbnb-typescript-prettier',
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
		project: './tsconfig.json',
		createDefaultProgram: true,
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts'],
			},
		},
	},
	rules: {
		'import/prefer-default-export': 0,
		'@typescript-eslint/no-var-requires': 0,
		camelcase: 'off',
		'no-param-reassign': 'warn',
		'no-restricted-syntax': 'warn',
		'consistent-return': 'warn',
		eqeqeq: ['error', 'always'],
		'prefer-destructuring': [
			'error',
			{
				VariableDeclarator: {
					array: false,
					object: false,
				},
			},
		],
		'array-callback-return': 'warn',
		'no-prototype-builtins': 'off',
		'no-empty-function': 'warn',
		'no-plusplus': 'off',
		'prefer-spread': 'warn',
		'import/no-cycle': 'off',
		'class-methods-use-this': 'off',
		'prefer-const': 'off',
		'no-await-in-loop': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		' @typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-use-before-define': 'warn',
	},
};
