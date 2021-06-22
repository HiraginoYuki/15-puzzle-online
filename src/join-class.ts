export function joinClass(...classNames: any[]) {
  return classNames
    .filter(str => typeof str === "string")
    .map(str => str.trim())
    .filter(str => str.length)
    .join(" ");
}
