timeout.unref()
---
When called, the active Timeout object will not require the Node.js event loop to remain active. If there is no other activity keeping the event loop running, the process may exit before the Timeout object's callback is invoked.

Note: Calling timeout.unref() creates an internal timer that will wake the Node.js event loop.
