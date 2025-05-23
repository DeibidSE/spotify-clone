// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
	{
		rules: {
			'@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
			'@stylistic/max-statements-per-line': ['error', { max: 2 }],
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
)
