export const random = (max: number) => {
  return Math.floor(Math.random() * max);
}

export const swapItemInArray = (arr: any[], index1: number, index2: number) => {
  const toSwap1 = arr[index1];
  const toSwap2 = arr[index2];
  arr[index2] = toSwap1;
  arr[index1] = toSwap2;
  return arr;
}