export default function raisePercent(originSalary: number, newSalary: number) {
  return Math.floor((newSalary / originSalary) * 100);
}
