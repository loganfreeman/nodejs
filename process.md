process.execPath
---
The `process.execPath` property returns the absolute pathname of the executable that started the Node.js process.

process.nextTick(callback[, ...args])
---
The `process.nextTick()` method adds the callback to the "next tick queue". Once the current turn of the event loop turn runs to completion, all callbacks currently in the next tick queue will be called.

This is not a simple alias to `setTimeout(fn, 0)`. It is much more efficient. It runs before any additional I/O events (including timers) fire in subsequent ticks of the event loop.

process.kill(pid[, signal])
---
The `process.kill()` method sends the signal to the process identified by pid.

Note:Even though the name of this function is process.kill(), it is really just a signal sender, like the kill system call. The signal sent may do something other than kill the target process.

This method will throw an error if the target pid does not exist. As a special case, a signal of 0 can be used to test for the existence of a process. 


process.stdin
---
The `process.stdin` property returns a Readable stream equivalent to or associated with `stdin` (fd 0).

child_process.spawn(command[, args][, options])#
---
The `child_process.spawn()` method spawns a new process using the given command, with command line arguments in args. If omitted, args defaults to an empty array.

A third argument may be used to specify additional options, with these defaults:
```
{
  cwd: undefined,
  env: process.env
}
```
Use `cwd` to specify the working directory from which the process is spawned. If not given, the default is to inherit the current working directory.

Use `env` to specify environment variables that will be visible to the new process, the default is `process.env`.
