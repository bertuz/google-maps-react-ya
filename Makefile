.PHONY: test build

dev:
	@yarn dev

test:
	@yarn lint && yarn flow

build: test
	@yarn build-lib
