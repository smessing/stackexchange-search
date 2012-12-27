#!/bin/bash

# add individual soy templates here, do NOT include file extension.
FILES=('view/context/searchcontexttemplate')

for file in "${FILES[@]}"
do
  java -jar lib/soy/SoyToJsSrcCompiler.jar --shouldGenerateJsdoc --outputPathFormat ${file}.js --srcs ${file}.soy
done
