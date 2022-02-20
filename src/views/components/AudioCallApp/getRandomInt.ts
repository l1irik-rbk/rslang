export function getArrayRandomInt(count: number, min: number, max: number, add: number | void): number[] {
  if (max - min <= count) max = min + count;

  const nums = new Set<number>();
  if (add !== undefined) nums.add(add);

  while (nums.size !== count) {
    nums.add(Math.floor(Math.random() * max) + min);
  }
  const arrayRes: number[] = [...nums];

  if (add !== undefined) {
    const rand = Math.floor(Math.random() * arrayRes.length);
    arrayRes[0] = arrayRes[rand];
    arrayRes[rand] = add;
  }
  return arrayRes;
}
