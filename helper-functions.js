'use strict'

/**
 * @function getMs
 * @param {string} duration - hh:mm:ss.ms format
 * @returns {number} total milliseconds
 */
 const getMs = (duration) => {
  let parsed = duration.split(':')
  parsed[2] = parsed[2].split('.')
  parsed = parsed.flat().map(n => Number(n))
  const ms = parsed[3] + (parsed[2] * 1000) + (parsed[1] * 60000) + (parsed[0] * 3600000)
  return ms
}

/**
 * @function uniCop
 * @param {string} string - string to check for invalid Unicode characters
 * @returns {number} - 1 if unicode replacement character is found, otherwise 0
 */
const uniCop = (string) => {

  for (let codePoint of string) {
    if (codePoint.codePointAt(0).toString(16) === 'fffd') {
      return 1
    }
  }
  return 0
}

module.exports = {
  getMs,
  uniCop
}