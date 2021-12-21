import React from "react";
import { IWhereOperatorType } from "types";

export type IWhere = {
  left: string;
  operator: IWhereOperatorType;
  right: string | number;
};

export type ISelect = {
  column: string;
  agg: "NONE" | "MAX" | "MIN" | "SUM";
};

export type IQuery = {
  select: Array<ISelect>;
  from: string[];
  where: Array<IWhere>;
  groupby: string[];
  joinCondition: string[];
};
interface IQueryContext {
  query: IQuery;
  setQuery: (query: IQuery) => void;
  nlQuery: string;
  setNlQuery: (nlQuery: string) => void;
  rawQuery: string;
  setRawQuery: (rawQuery: string) => void;
  postSQL: (params: IQuery) => Promise<void>;
  getNlQuery: (params: any) => void;
}

/**
 * Context for control Queries
 */
const QueryContext = React.createContext<IQueryContext>({} as IQueryContext);
export default QueryContext;
