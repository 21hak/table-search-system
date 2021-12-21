import axios from "axios";
import { INlQueryResult } from "context/result-context";
import nlQueryData from "test/nlQueryData.json";
import sqlQueryData from "test/sqlQueryData.json";

export const fetchNlQueryResult = async (
  params: any
): Promise<INlQueryResult> => {
  const env = process.env.NODE_ENV;
  if (env == "development") {
    // @ts-ignore
    return nlQueryData;
  } else {
    return (await axios.get("http://localhost:40010/nlquery")).data;
  }
};

export const fetchSQLResult = async (params: any): Promise<INlQueryResult> => {
  const env = process.env.NODE_ENV;
  if (env == "development") {
    // @ts-ignore
    return sqlQueryData;
  } else {
    return (
      await axios.post("http://localhost:40010/sql", params, {
        headers: { "content-type": "application/json" },
      })
    ).data;
  }
};
