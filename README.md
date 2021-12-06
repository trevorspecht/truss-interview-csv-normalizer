# truss-interview-csv-normalizer

This is a solution for the CSV Normalization problem

This is an npm project build with Node.js, including some npm packages as dependencies.

You can [download a .zip file](https://github.com/trevorspecht/truss-interview-csv-normalizer/archive/refs/heads/main.zip) of this project to your computer.

To run this project, you must [install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Once Node.js and npm are installed, you can run `npm install` from inside the local project directory to install the following dependencies:
- csv-parser
- json-2-csv
- luxon

Once the dependencies are installed, the command to run the project is as follows:

`node index.js input.csv output.csv`

`input.csv` and `output.csv` are examples of file paths to input and output csv files, respectively.

The project directory includes two csv files for testing: `sample.csv` and `sample-with-broken-utf8.csv`