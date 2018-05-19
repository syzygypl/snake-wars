#!/usr/bin/env bash

function main {
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
    SNAKES_DIR="$DIR/backend/snakes";

    cd $SNAKES_DIR/batman1 && yarn build && yarn start &
    cd $SNAKES_DIR/batman2 && yarn build && yarn start &
    cd $SNAKES_DIR/batman3 && yarn build && yarn start &
    cd $SNAKES_DIR/batman4 && yarn build && yarn start &
}

main "$@"
