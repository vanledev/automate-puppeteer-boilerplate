Start using app:
- `npm start`

3 kinds of logging: (import debug from atomic-func)
- debug.dev: only when environment variable DEBUG is set to "dev"
    - set environment variable in powershell to view all dev console logs: $env:DEBUG="dev" (package "debug" only works with variables set by command line, not with variables in .env)
- debug.err: log to the console for everyone and write to output/log.txt
- debug.clearLog: clear file output/log.txt

Fail fast, success late:


When fetch:
- use fetchOrAbort: to abort request if we dont receive any response after certain time

Naming convention:
- products instead of productList

Modules:
- main/index: Only call main 
- main/main: main function, decomposing the rest of the code into submodules

 
