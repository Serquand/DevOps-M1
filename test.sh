#!/bin/bash

RANDOM_NUMBER=$(( (RANDOM % 2) + 1 ))
if [ $RANDOM_NUMBER -eq 1 ]; then
    echo "Success"
    exit 0
else
    echo "Error"
    exit 1
fi
