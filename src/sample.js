// Test harness for rotating arrays
import {rotateArrayLeft, rotateArrayRight} from './utils.js'

const testArr = [0,1,2,3,4,5,6,7,8,9]

console.log('testing Left')
for(let idx = 0; idx < testArr.length; idx++){
  const newArr = rotateArrayLeft(testArr, idx)
  console.log(newArr.toString())
}

console.log('testing Right')
for(let idx = 0; idx < testArr.length; idx++){
  const newArr = rotateArrayRight(testArr, idx)
  console.log(newArr.toString())
}
