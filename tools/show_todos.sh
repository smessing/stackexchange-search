#!/bin/bash

grep -Rn --exclude-dir lib --exclude tools/show_todos.sh 'TODO(sam)' *
