#!/usr/bin/env bash
rm -rf public
webpack --config webpack.production.config.js
aws s3 sync ./public s3://ss.adamfowler.net