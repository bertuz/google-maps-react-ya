.PHONY: test build

watch:
	@yarn watch

dev:
	@yarn dev

test:
	@yarn lint && yarn flow

build: test
	@yarn build-lib && yarn copy-flow-sources
