export function reverseDate(str: string) {
  const newStr = str.split(".");
  return newStr[2] + '.' + newStr[1] + '.' + newStr[0];
}