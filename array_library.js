const take = (arr, n) => {
  const newArr = [];
  let amount = n;
  if (n > arr.length) {
    amount = arr.length;
  }
  for (let i = 0; i < amount; i++) {
    newArr[i] = arr[i];
  }
  return newArr;
};

const skip = (arr, n) => {
  const newArr = [];
  if (n > arr.length) {
    return newArr;
  }
  for (let i = n, j = 0; i < arr.length; i++, j++) {
    newArr[j] = arr[i];
  }
  return newArr;
};

const map = (arr, callback) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = callback(arr[i], i, arr);
  }
  return newArr;
};

const reduce = (arr, callback, initialValue) => {
  let initial = initialValue;
  let i = 0;
  if (typeof initial === 'undefined') {
    initial = arr[0];
    i = 1;
  }
  for (i; i < arr.length; i++) {
    let current = arr[i];
    initial = callback(initial, current);
  }
  return initial;
};

const filter = (arr, callback) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let boolean = callback(arr[i], i, arr);
    if (boolean) {
      newArr[newArr.length] = arr[i];
    }
  }
  return newArr;
};

const foreach = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    // eslint-disable-next-line no-prototype-builtins
    if (arr.hasOwnProperty(i)) {
      callback(arr[i], i, arr);
    }
  }
};

function createMethod(method) {
  return function () {
    const firstArgument = this._isChainable ? this._currentValue : arguments[0];
    const secondArgument = this._isChainable ? arguments[0] : arguments[1];
    const thirdArgument = this._isChainable ? arguments[1] : arguments[2];
    const result = method.call(
      this,
      firstArgument,
      secondArgument,
      thirdArgument
    );
    if (this._isChainable && result) {
      this._currentValue = result;
    }
    return this._isChainable ? this : result;
  };
}

class ArrayLib {
  constructor(currentValue) {
    this._isChainable = false;
    this._currentValue = currentValue;
  }
  value() {
    return this._currentValue;
  }
  take(...args) {
    return createMethod(take).call(this, ...args);
  }
  skip(...args) {
    return createMethod(skip).call(this, ...args);
  }
  map(...args) {
    return createMethod(map).call(this, ...args);
  }
  reduce(...args) {
    return createMethod(reduce).call(this, ...args);
  }
  filter(...args) {
    return createMethod(filter).call(this, ...args);
  }
  foreach(...args) {
    return createMethod(foreach).call(this, ...args);
  }
  chain(obj) {
    const wrappedObj = new ArrayLib(obj);
    wrappedObj._isChainable = true;
    return wrappedObj;
  }
}

// eslint-disable-next-line no-unused-vars
var arrLib = new ArrayLib();
