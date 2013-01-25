#!/bin/bash

find . -name '*.soy' | xargs java -jar client/lib/soy/SoyToJsSrcCompiler.jar \
  --shouldGenerateJsdoc \
  --shouldProvideRequireSoyNamespaces \
  --outputPathFormat client/build/{INPUT_FILE_NAME_NO_EXT}.soy.js \
