#!/bin/sh

ls -la packages/bruno-electron/out
jq -r '"VERSION=v\(.version)"' packages/bruno-electron/package.json >> "$GITHUB_ENV"
