export default function raisePercent(newSalary: number, originSalary: number) {
  return Math.ceil((newSalary / originSalary) * 100) - 100;
}
