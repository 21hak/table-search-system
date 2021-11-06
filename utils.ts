export function matchColumn(column: string, value: string) {
  return value && column.toLowerCase().indexOf(value.toLowerCase()) !== -1;
}
