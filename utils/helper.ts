import { IQuery, ISelect, IWhere } from "context/query-context";
import _ from "lodash";
import { IWhereOperatorType } from "types";

/**
 *
 * @param wheres IWhere 구조의 조건절
 * @returns 서버에 보낼 Where 조건절
 */
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

/**
 *
 * @param selects 서버에서 반환하는 column, aggregation 데이터
 * @returns 상태값 관리에 사용될 column, aggregation 데이터
 */
export const buildSelectFromResult = (
  selects: Array<["NONE" | "MAX" | "MIN", string]>
): ISelect[] => {
  return selects.map((select) => ({
    column: select[1],
    agg: select[0],
  }));
};

/**
 *
 * @param wheres 서버에서 반환하는 where 조건절 데이터
 * @returns 상태값 관리에 사용될 where 조건절 데이터
 */
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

/**
 *
 * @param query
 * @returns 쿼리에 사용된 모든 테이블을 반환
 */
export const getTablesFromQuery = (query: IQuery) => {
  const tables = [
    ...query.select.map((q) => q.column.split(".")[0]),
    ...query.groupby.map((g) => g.split(".")[0]),
    ...query.where.map((w) => w.left.split(".")[0]),
    ...query.joinCondition.map((j) => j.split("=")[0].split(".")[0]),
  ].filter((t) => !!t);
  return _.uniq(tables);
};
