#!/bin/bash

set -e

export NODE_PATH=`pwd`

if [ -z $1 ]; then
  cross-env NODE_ENV=test nyc mochapack -u bdd-lazy-var/global --webpack-config build/webpack.config.dev.js --require test/mocha.js --include $PWD/test/global.js --recursive test/javascript/
else
  cross-env NODE_ENV=test mochapack -u bdd-lazy-var/global --webpack-config build/webpack.config.dev.js --require test/mocha.js --include test/javascript/global.js --recursive $@
fi
