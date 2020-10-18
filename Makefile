.PHONY: test build

watch:
	@yarn watch

dev:
	@yarn dev

test:
	@yarn lint && yarn flow && jest

build: test
	@yarn build-lib && yarn copy-flow-sources && yarn copy-typescript-definitions
