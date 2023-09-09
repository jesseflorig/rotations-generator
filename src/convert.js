const fs = require('fs')
const csv2json = require('csv2json')

// recieves filename without extension and converts from csv to json
const convert = (filename) => {
  fs.createReadStream(`src/data/${filename}.csv`)
    .pipe(csv2json({}))
    .pipe(fs.createWriteStream(`src/data/${filename}.json`))
}

//process files
convert("members")
convert("vendors")
convert("pairs")
