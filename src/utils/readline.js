const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')
const readStream = fs.createReadStream(fileName)

const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0
let sum = 0

rl.on('line', (lineDate) => {
    if(!lineDate) {
        return
    }
    sum++
    const arr = lineDate.split(' -- ')
    if(arr[2] && arr[2].indexOf('Chrome') > 0){
        chromeNum++
    }
})

rl.on('close', () => {
    console.log('chrome占比' + chromeNum/sum)
})