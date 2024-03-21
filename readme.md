# Start using app:
- `npm start`

# Logging
## Log file location
*output/log.txt*
## Function to log to console

import debug from *atomic-func* and write those functions in the code
- `debug.dev`: This command will log to console if the environment variable DEBUG = "dev"
    - How to set environment variable
        - open PowerShell
        - type `$env:DEBUG="dev"`
        - package "debug" doens't work with variables in *.env* file
- `debug.err`: This will always log to the console and write to log file
- `debug.clearLog`: This will clear log file


# Fail fast, success later


# When fetch
use `fetchOrAbort`: to abort request if we dont receive any response after a certain time

# Naming convention
- products instead of productList

# Modules
- main/index: main function. Start here.
- main/sub: submodules

 
