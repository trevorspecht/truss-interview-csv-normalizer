'use strict'

const { csvHandler } = require('./csv-handler')

const inputFile = process.argv[2]
const outputFile = process.argv[3]

csvHandler(inputFile, outputFile)