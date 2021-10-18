export function matchColumn(column: string, value: string) {
  return column.toLowerCase().indexOf(value.toLowerCase()) !== -1;
}
