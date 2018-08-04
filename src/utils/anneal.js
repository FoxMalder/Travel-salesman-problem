function randomInt(arr) {
  return Math.floor(Math.random() * arr.length);
}

function mutate2opt(arr) {
  const mutateArr = [...arr];
  const i = randomInt(mutateArr);
  const j = randomInt(mutateArr);
  const temp = mutateArr[j];
  mutateArr[j] = mutateArr[i];
  mutateArr[i] = temp;

  return mutateArr;
}

function calcDistance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.hypot(dx, dy);
}

function calcPathLength(arr) {
  let cost = 0;
  for (let i = 1; i < arr.length; i += 1) {
    cost += calcDistance(arr[i - 1], arr[i]);
  }

  return cost;
}

function acceptanceProbability(temperature, current, nieghbor) {
  if (nieghbor < current) return 1;
  return Math.exp((nieghbor - current) / temperature);
}

export default function anneal(arr, temperature) {
  let t = temperature;
  let bestPath = [...arr];
  let bestPathLength = calcPathLength(bestPath);
  const bestPathLengthArr = [];
  let currentPath = [...arr];
  const tempArr = [];
  let currentPathLength = calcPathLength(currentPath);
  const tMin = 0.00001;
  const coolingRate = 0.997;
  let iterator = 0;
  while (t > tMin) {
    if (iterator % 100 === 0) tempArr.push({ temperature: t });
    const nieghborPath = mutate2opt(currentPath);
    const nieghborPathLength = calcPathLength(nieghborPath);
    let i = 100;
    while (i > 0) {
      if (Math.random() < acceptanceProbability(
        temperature,
        nieghborPathLength,
        currentPathLength,
      )) {
        currentPath = [...nieghborPath];
        currentPathLength = nieghborPathLength;
      }
      if (currentPathLength < bestPathLength) {
        bestPath = [...currentPath];
        bestPathLength = currentPathLength;
        bestPathLengthArr.push({
          solution: bestPathLength,
        });
      }
      i -= 1;
    }
    t *= coolingRate;
    iterator += 1;
    bestPathLength = Math.round(bestPathLength);
  }
  return [bestPath, bestPathLengthArr, bestPathLength, tempArr];
}
