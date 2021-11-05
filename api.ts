import axios from "axios";
import { INlQueryResult } from "context/result-context";

export const fetchNlQueryResult = async (
  params: any
): Promise<INlQueryResult> => {
  return (await axios.get("http://localhost:40010/nlquery")).data;
};

export const fetchSQLResult = async (params: any): Promise<INlQueryResult> => {
  return (
    await axios.post("http://localhost:40010/sql", params, {
      headers: { "content-type": "application/json" },
    })
  ).data;
};
