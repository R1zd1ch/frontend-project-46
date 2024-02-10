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

test-coverage:
	npm test -- --coverage --coverageProvider=v8