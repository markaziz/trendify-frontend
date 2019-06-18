export function getRandomNumber(minNum, maxNum) {
  const min = Math.ceil(minNum);
  const max = Math.floor(maxNum);
  const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
}

export function getRandomItemsFromArray(arr, numOfItems) {
  const randomItems = [];
  const arrCopy = [...arr];
  for (let index = 0; index < numOfItems; index++) {
    const randNum = getRandomNumber(0, arrCopy.length - 1);
    randomItems.push(arrCopy[randNum]);

    // Remove item from list
    arrCopy.splice(randNum, 1);
  }
  return randomItems;
}