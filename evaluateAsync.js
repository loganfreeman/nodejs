  /**
   * Evaluate an expression in the context of the current page. Expression must
   * evaluate to a Promise. Returns a promise that resolves on asyncExpression's
   * resolved value.
   * @param {string} asyncExpression
   * @return {!Promise<*>}
   */
  evaluateAsync(asyncExpression) {
    return new Promise((resolve, reject) => {
      // If this gets to 60s and it hasn't been resolved, reject the Promise.
      const asyncTimeout = setTimeout(
        (_ => reject(new Error('The asynchronous expression exceeded the allotted time of 60s'))),
        60000
      );
      this.sendCommand('Runtime.evaluate', {
        expression: asyncExpression,
        includeCommandLineAPI: true,
        awaitPromise: true,
        returnByValue: true
      }).then(result => {
        clearTimeout(asyncTimeout);
        resolve(result.result.value);
      }).catch(reject);
    });
  }
