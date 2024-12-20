#!/bin/sh

if [ $# -lt 1 ]; then
  printf "Usage: $(basename $0) DISTRO(mac|linux)"
  exit 1
fi

DIST="$1"

npm ci --legacy-peer-deps

npm run build:graphql-docs
npm run build:bruno-query
npm run build:bruno-common

npm run sandbox:bundle-libraries --workspace=packages/bruno-js

npm run build:web
npm run build:electron:$DIST
