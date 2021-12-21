import React from "react";

export type IResultData = Array<{ [column: string]: string | number }>;
export type IResultSQL = {
  select: Array<["NONE" | "MAX" | "MIN", string]>;
  from: string[];
  where: Array<[string, string, any]>;
  groupby: string[];
  join_conditions: string[];
};

export type INlQueryResult = {
  data: IResultData;
  sql: IResultSQL;
  db_id: string;
  recommendations: string[];
  raw_sql: string;
};
interface IResultContext {
  data: IResultData;
  setData: (query: IResultData) => void;
  recommendations: string[];
  setRecommendations: (recommendations: string[]) => void;
  tableRecommendations: string[];
  setTableRecommendations: (recommendations: string[]) => void;
}

/**
 * Context for controll queried data
 */
const ResultContext = React.createContext<IResultContext>({
  data: [],
  setData: () => {},
  recommendations: [],
  setRecommendations: () => {},
  tableRecommendations: [],
  setTableRecommendations: () => {},
});
export default ResultContext;
