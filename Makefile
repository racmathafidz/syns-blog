export ROOT_DIR=${PWD}
export PREPARE_SYNTAX=docker run --rm -ti -v $(ROOT_DIR):/app -w /app -p 3000:3000 node:20-alpine

help:
	@echo "\nCommands:"
	@echo "\t help \t\t\t show help"
	@echo "\t pull-image \t\t pull image docker"
	@echo "\t install \t\t install node_modules"
	@echo "\t start \t\t\t start development on port 3002"
	@echo "\t build-project \t\t\t build development project"
	@echo "\t add name=<package> \t add package"
	@echo "\t remove name=<package> \t remove package"

pull-image:
	@docker pull node:20-alpine

install:
	@${PREPARE_SYNTAX} npm install

start:
	@${PREPARE_SYNTAX} npm run dev

build-project:
	@${PREPARE_SYNTAX} npm run build

add:
	@${PREPARE_SYNTAX} npm install ${name}

remove:
	@${PREPARE_SYNTAX} npm uninstall ${name}