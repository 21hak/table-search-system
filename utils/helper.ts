import { IQuery, IWhere } from "context/query-context";
import _ from "lodash";
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

export const getTablesFromQuery = (query: IQuery) => {
  const tables = [
    ...query.select.map((q) => q.column.split(".")[0]),
    ...query.groupby.map((g) => g.split(".")[0]),
    ...query.where.map((w) => w.left.split(".")[0]),
    ...query.joinCondition.map((j) => j.split("=")[0].split(".")[0]),
  ].filter((t) => !!t);
  return _.uniq(tables);
};
