install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	bin/gendiff.js

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix