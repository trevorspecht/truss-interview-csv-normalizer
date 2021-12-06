'use strict';

const csvParser = require('csv-parser')
const converter = require('json-2-csv')
const { DateTime } = require('luxon')
const fs = require('fs');

const helper = require('./helper-functions')

/**
 * @function csvHandler
 * @param {string} inputFile - file path to input csv
 * @param {string} outputFile - file path to output csv
 */
const csvHandler = (inputFile, outputFile) => {
  let fooDur, barDur
  let uniCheck
  let results = []

  console.log('reading input file: ', inputFile)

  fs.createReadStream(inputFile)
  .on('error', (err) => {
    return console.log('error reading input file.', err.message);
  })
  .pipe(csvParser({
    /**
     * @function mapValues
     * @param {string} header - csv column header
     * @param {number} index - csv column index
     * @param {string} value - csv content
     * @returns processed values (content) of each column for a csv row
     */
    mapValues: ({ header, index, value}) => {
      if (header === 'Timestamp') {
        // check for Unicode replacement character that would indicate invalid formatting
        uniCheck = helper.uniCop(value)
        if (uniCheck === 0) {
          const isodate = new Date(value).toISOString()
          return DateTime.fromISO(isodate).plus({ hours: 3 }).setZone('America/New_York').toString()
        }
      }
      if (header === 'Address') {
        return value.normalize()
      }
      if (header === 'ZIP') {
        const padded = value.padStart(5, '0')
        return padded
      }
      if (header === 'FullName') {
        return value.toUpperCase().normalize()
      }
      if (header === 'FooDuration') {
        if (uniCheck === 0) {
          uniCheck = helper.uniCop(value)
          if (uniCheck === 0)
            return fooDur = helper.getMs(value)
        }
      }
      if (header === 'BarDuration') {
        if (uniCheck === 0) {
          uniCheck = helper.uniCop(value)
          if (uniCheck === 0)
            return barDur = helper.getMs(value)
        }
      }
      if (header === 'TotalDuration') {
        let sum = fooDur + barDur
        return sum
      }
      if (header === 'Notes') {
        // Best I can tell, invalid Unicode has already been replaced by the Unicode replacement character.
        // JavaScript strings are always UTF-16 code sequences that get rendered as characters.
        // Per instructions, not normalizing the Notes field.
        return value
      }
    }
  }))
  .on('data', (row) => {
    if (uniCheck === 0) {
      results.push(row);
    } else if (uniCheck === 1) {
      console.log(`invalid unicode found, dropping row from output, row: ${results.length + 2}, name: ${row.FullName}`)
    }
  })
  .on('end', () => {
    converter.json2csv(results, (err, data) => {
      console.log('writing to output file: ', outputFile)
      if (err)
        console.log('error writing to output file', err)
      else 
        fs.writeFileSync(outputFile, data, 'utf8')
    })
  })
}

module.exports = {
  csvHandler
}