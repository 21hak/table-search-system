import { IWhere } from "context/query-context";
import { IWhereOperatorType } from "types";

export const buildWherePayload = (wheres: Array<IWhere>) => {
  return wheres.map((where) => {
    const column = where.left;
    const operator = where.operator;
    const value = where.right;
    let o: string;
    let v: any;

    switch (operator) {
      case "starts with":
        o = "LIKE";
        v = `\'${value}%\'`;
        break;
      case "ends with":
        o = "LIKE";
        v = `\'%${value}\'`;
        break;
      case "contains":
        o = "LIKE";
        v = `\'%${value}%\'`;
        break;
      default:
        o = operator;
        v = value;
    }
    return [column, o, v];
  });
};

export const buildSelectFromResult = (
  selects: Array<["NONE" | "MAX" | "MIN", string]>
): ISelect[] => {
  return selects.map((select) => ({
    column: select[1],
    agg: select[0],
  }));
};
export const buildWhereFromResult = (
  wheres: Array<[string, string, any]>
): Array<IWhere> => {
  return wheres.map((where) => {
    const operator = where[1];
    const value = where[2];
    let o = operator as IWhereOperatorType;
    let v = value;
    switch (operator.toLowerCase()) {
      case "like":
        if (value.startsWith("'%") && value.endsWith("%'")) {
          o = "contains";
          v = v.slice(0, -2);
          v = v.slice(2);
        } else if (value.startsWith("'%")) {
          o = "ends with";
          v = v.slice(2);
        } else if (value.endsWith("%'")) {
          o = "starts with";
          v = v.slice(0, -2);
        }
      default:
    }
    return {
      left: where[0],
      operator: o,
      right: v,
    };
  });
};
