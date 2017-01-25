- [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

Strict mode applies to entire scripts or to individual functions. 
It doesn't apply to block statements enclosed in {} braces; attempting to apply it to such contexts does nothing. 
eval code, Function code, event handler attributes, strings passed to `WindowTimers.setTimeout()`, and the like are entire scripts, and invoking strict mode in them works as expected.
