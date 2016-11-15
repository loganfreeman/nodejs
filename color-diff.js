TerminalAdapter.prototype._colorDiffAdded = chalk.black.bgGreen;
TerminalAdapter.prototype._colorDiffRemoved = chalk.bgRed;
TerminalAdapter.prototype._colorLines = function colorLines(name, str) {
  return str.split('\n').map(function (line) {
    return this['_colorDiff' + name](line);
  }, this).join('\n');
};
/**
 * Shows a color-based diff of two strings
 *
 * @param {string} actual
 * @param {string} expected
 */
TerminalAdapter.prototype.diff = function _diff(actual, expected) {
  var msg = diff.diffLines(actual, expected).map(function (str) {
    if (str.added) {
      return this._colorLines('Added', str.value);
    }

    if (str.removed) {
      return this._colorLines('Removed', str.value);
    }

    return str.value;
  }, this).join('');

  // legend
  msg = '\n' +
    this._colorDiffRemoved('removed') +
    ' ' +
    this._colorDiffAdded('added') +
    '\n\n' +
    msg +
    '\n';

  console.log(msg);
  return msg;
};
