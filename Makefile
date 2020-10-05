.PHONY: test build

test:
	@yarn lint && yarn flow

build: test
	@yarn build
