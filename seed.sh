#!/usr/bin/env bash

function main {
    FORCE=$1;
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
    SNAKES_DIR="$DIR/backend/snakes";

    if [ "$FORCE" == "--force" ] || [ "$FORCE" == "-f" ]; then
        if [ -d "$SNAKES_DIR" ]; then
        echo "deleting $SNAKES_DIR";
        rm -rf ${SNAKES_DIR};
        fi
    fi

    if [ -d "$SNAKES_DIR" ]; then
        echo "directory $SNAKES_DIR already exists";
        exit 1;
    fi

    mkdir "$SNAKES_DIR";
    cd "$SNAKES_DIR";

    git clone https://github.com/andrzejdus/batman-snake batman1 && cd batman1 && yarn install &
    git clone https://github.com/andrzejdus/batman-snake batman2 && cd batman2 && yarn install &
    git clone https://github.com/andrzejdus/batman-snake batman3 && cd batman3 && yarn install &
    git clone https://github.com/andrzejdus/batman-snake batman4 && cd batman4 && yarn install &
}

main "$@"
