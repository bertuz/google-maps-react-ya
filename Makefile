.PHONY: test build

install:
	@yarn --peer

watch:
	@yarn watch

dev:
	@yarn dev

test: install
	@yarn lint && yarn flow && yarn jest

build: test
	@yarn build-lib && yarn copy-flow-sources && yarn copy-typescript-definitions
