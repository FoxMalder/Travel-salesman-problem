export function randomPoint() {
  const x = parseInt(Math.random() * (790 - 10) + 10, 0);
  const y = parseInt(Math.random() * (590 - 10) + 10, 0);
  return { x, y };
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && parseFloat(n) !== 0;
}
