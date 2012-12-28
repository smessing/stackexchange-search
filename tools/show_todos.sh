#!/bin/bash

SEARCH_STRING='TODO('$1')'

echo 'search for todos for: '$1
grep -Rn --exclude-dir lib --exclude tools/show_todos.sh ${SEARCH_STRING} *
