module.exports = {
	extends: ["eslint-config-codely/typescript"],
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: ["./tsconfig.json"],
			},
			rules: {
				"@typescript-eslint/no-floating-promises": "warn",
			},
		},
	],
};
