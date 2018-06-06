BIN = $(GOPATH)/bin
BUILD_DIR = build
APP = $(shell find frontend -type f)
APP_NAME = $(shell pwd | xargs basename)
SERVER_BIN = $(BUILD_DIR)/$(APP_NAME)
SERVER_SOURCES = $(shell find server -name "*.go")
IMPORT_PATH = $(shell pwd | sed "s|^$(GOPATH)/src/||g")
GIT_HASH = $(shell git rev-parse HEAD)
LDFLAGS = -w -X main.commitHash=$(GIT_HASH)
YARN := $(shell command -v yarn 2>/dev/null)
DEP := $(shell command -v dep 2>/dev/null)

build: build_client $(SERVER_BIN)

build_client:
ifdef YARN
	@yarn build
else
	@npm run build
endif

$(SERVER_BIN): $(SERVER_SOURCES)
	mkdir -p $(BUILD_DIR)
	go build -ldflags '$(LDFLAGS)' -o $@ $(IMPORT_PATH)/server

serve_api: $(SERVER_BIN)
	@ENV=development ./$(SERVER_BIN)

serve_client:
ifdef YARN
	@yarn build
else
	@npm run build
endif

clean:
	@if [ -d build ]; then rm -r build; fi

install:
ifdef YARN
	@yarn
else
	@npm run build
endif
ifdef DEP
	dep ensure
else
	$(warning "Skipping installation of Go dependencies: dep is not installed")
endif
