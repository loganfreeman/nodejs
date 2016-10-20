const timeLimit = require('time-limit-promise');
const fetch     = require('node-fetch');

var fetchPromise = fetch('https://github.com/inikulin');

timeLimit(fetchPromise, 50).then(res => {
    // If `fetchPromise` will be fulfilled within 50ms
    // time limited promise will be fullfilled as well.
    // Otherwise, it will be resolved with the `undefined` value.
});

timeLimit(fetchPromise, 50, { resolveWith: 'no content' }).then(res => {
    // Same as above, but on timeout it will
    // be resolved with the `no-content` value.
    console.log(res); // > no-content
});


timeLimit(fetchPromise, 50, { rejectWith: new Error('timeout') }).catch(err => {
    // Same as above, but on timeout it will
    // be rejected with the provided error.
    console.log(err.message); // > timeout
});
