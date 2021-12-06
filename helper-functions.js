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

module.exports = {
  getMs
}