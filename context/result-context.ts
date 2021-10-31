import React from "react";

export type IResultData = Array<{ [column: string]: string | number }>;
export type IResultSQL = {
  select: Array<["NONE" | "MAX" | "MIN", string]>;
  from: string[];
  where: Array<[string, "=" | "<=", string]>;
  groupby: string[];
  join_conditions: string[];
  orderby: string[];
};

export type INlQueryResult = {
  data: IResultData;
  sql: IResultSQL;
  db_id: string;
  recommendations: string[];
};
interface IResultContext {
  data: IResultData;
  setData: (query: IResultData) => void;
  recommendations: string[];
  setRecommendations: (recommendations: string[]) => void;
}
const ResultContext = React.createContext<IResultContext>({
  data: [],
  setData: () => {},
  recommendations: [],
  setRecommendations: () => {},
});
export default ResultContext;