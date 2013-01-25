#!/bin/bash

SEARCH_STRING='TODO('$1')'

echo 'searching for todos for '$1'...'
grep -Rn --exclude-dir client/lib --exclude client/tools/show_todos.sh ${SEARCH_STRING} *
echo '...done'
