How to compile C code to a WASM module using emscripten

1. Emscripten installation
    cf. https://emscripten.org/docs/getting_started/downloads.html

    # Get the emsdk repo
    git clone https://github.com/emscripten-core/emsdk.git

    # Enter that directory
    cd emsdk

    # Fetch the latest version of the emsdk (not needed the first time you clone)
    git pull

    # Download and install the latest SDK tools.
    ./emsdk install latest

    # Make the "latest" SDK "active" for the current user. (writes ~/.emscripten file)
    ./emsdk activate latest

    # Activate PATH and other environment variables in the current terminal
    source ./emsdk_env.sh

2. Compilation
    `emcc engine.c -o engine.js -Os -s WASM=1 -Wall -s MODULARIZE=1`
