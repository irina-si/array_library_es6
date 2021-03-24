function filterFunc(value) {
  return value >= 2;
}

console.log(arrLib.chain([1, 3, 5]).take(3).filter(filterFunc).value());
console.log(arrLib.filter([1, 3, 5], filterFunc));
console.log(arrLib.take([1, 3, 5], 2));
