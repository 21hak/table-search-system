import React from "react";

export type IWhere = {
  left: string;
  sign: "=" | "<=";
  right: string | number;
};

export type ISelect = {
  column: string;
  agg: "NONE" | "MAX" | "MIN";
};

export type IQuery = {
  select: Array<ISelect>;
  from: string[];
  where: Array<IWhere>;
  groupby: string[];
  joinCondition: string[];
  orderby: string[];
};
interface IQueryContext {
  query: IQuery;
  setQuery: (query: IQuery) => void;
  // modified: boolean;
  // setModified: (modified: boolean) => void;
}
const QueryContext = React.createContext<IQueryContext>({} as IQueryContext);
export default QueryContext;
