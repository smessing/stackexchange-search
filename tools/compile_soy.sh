#!/bin/bash

find . -name '*.soy' | xargs java -jar lib/soy/SoyToJsSrcCompiler.jar \
  --shouldGenerateJsdoc \
  --shouldProvideRequireSoyNamespaces \
  --outputPathFormat build/{INPUT_FILE_NAME_NO_EXT}.soy.js \
