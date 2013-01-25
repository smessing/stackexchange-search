#!/bin/bash

pushd client > /dev/null
gjslint -e lib,build -r . -
popd > /dev/null
