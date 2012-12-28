#!/bin/bash

# add individual soy templates here, do NOT include file extension.
FILES_NO_EXT=('view/context/templates/searchcontext')

for file in "${FILES_NO_EXT[@]}"
do
  java -jar lib/soy/SoyToJsSrcCompiler.jar \
    --shouldGenerateJsdoc \
    --shouldProvideRequireSoyNamespaces \
    --outputPathFormat build/{INPUT_FILE_NAME_NO_EXT}.soy.js \
    --srcs ${file}.soy
done
