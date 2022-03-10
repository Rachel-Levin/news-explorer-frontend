// Implement the array functions: map, filter, find, findIndex, every and some

const arr = [1, 2, 3];

const toSquared = (num) => { return num * num };

const map = (arr, func) => {
  const result = [];
  arr.forEach(i => result.push(func(i)))
  return result;
}


const var1 = map(arr, toSquared);
console.log(var1);