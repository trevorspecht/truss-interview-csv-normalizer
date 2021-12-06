'use strict';

const csvParser = require('csv-parser')
const converter = require('json-2-csv')
const { DateTime } = require('luxon')
const fs = require('fs');


/**
 * @function csvHandler
 * @param {string} inputFile - file path to input csv
 * @param {string} outputFile - file path to output csv
 */
const csvHandler = (inputFile, outputFile) => {
  let fooDur, barDur
  let results = []

  fs.createReadStream(inputFile)
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
        const isodate = new Date(value).toISOString()
        return DateTime.fromISO(isodate).plus({ hours: 3 }).setZone('America/New_York').toString()
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
        return fooDur
      }
      if (header === 'BarDuration') {
        return barDur
      }
      if (header === 'TotalDuration') {
        return fooDur + barDur
      }
      if (header === 'Notes') {
        return value
      }
    }
  }))
  .on('error', () => {
      console.log('error reading csv file.');
  })
  .on('data', (row) => {
      results.push(row);
  })
  .on('end', () => {
    console.log(results)
    converter.json2csv(results, (err, data) => {
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