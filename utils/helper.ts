export const buildSelectFromResult = (
  selects: Array<["NONE" | "MAX" | "MIN", string]>
): ISelect[] => {
  return selects.map((select) => ({
    column: select[1],
    agg: select[0],
  }));
};
export const buildWhereFromResult = (
  wheres: Array<[string, "=" | "<=", string]>
) => {
  return wheres.map((where) => ({
    left: where[0],
    sign: where[1],
    right: where[2],
  }));
};
