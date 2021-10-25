// printed-books/:book-id
import axios from "axios";
import { clamp, groupBy } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import GraphContainer from "../components/Result/ResultGraph/GraphContainer";

import { matchColumn } from "../utils";
import ResultContainer from "../components/Result/ResultContainer/ResultContainer";
import QueryContext, { IQuery, ISelect } from "../context/query-context";
import ResultInterface from "../components/Result/ResultInterface/ResultInterface";
import ResultContext, {
  INlQueryResult,
  IResultData,
} from "../context/result-context";
import SearchInput from "../components/Result/SearchInput/SearchInput";

const fetchNlQueryResult = async (params: any): Promise<INlQueryResult> => {
  return (
    await axios.post("http://localhost:40011/secondPage", params, {
      headers: { "content-type": "application/json" },
    })
  ).data;
};

const fetchSQLResult = async (params: any): Promise<INlQueryResult> => {
  return (
    await axios.post("http://localhost:40011/secondPage", params, {
      headers: { "content-type": "application/json" },
    })
  ).data;
};

const buildSelectFromResult = (
  selects: Array<["NONE" | "MAX" | "MIN", string]>
): ISelect[] => {
  return selects.map((select) => ({
    column: select[1],
    agg: select[0],
  }));
};
const buildWhereFromResult = (wheres: Array<[string, "=" | "<=", string]>) => {
  return wheres.map((where) => ({
    left: where[0],
    sign: where[1],
    right: where[2],
  }));
};

export default function Result() {
  const router = useRouter();
  const [nlQuery, setnlQuery] = useState("");
  const [data, setData] = useState<IResultData>([]);
  const [modified, setModified] = useState(false);
  const [dbID, setDbID] = useState("");
  const [query, setQuery] = useState<IQuery>({
    select: [],
    from: [],
    where: [],
    groupby: [],
    joinCondition: [],
    orderby: [],
  });

  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    if (router.query.nlQuery) setnlQuery(router.query.nlQuery as string);
  }, [router.query]);

  useEffect(() => {
    if (modified) {
      const params = {
        sql: {
          select: query.select.map((select) => [select.agg, select.column]),
          from: query.from,
          where: query.where.map((where) => [
            where.left,
            where.sign,
            where.right,
          ]),
          groupby: query.groupby,
          join_conditions: query.joinCondition,
        },
        db_id: dbID,
      };
      fetchSQLResult(params).then((rst) => {
        setData(rst.data);
        setQuery({
          select: buildSelectFromResult(rst.sql.select),
          from: rst.sql.from,
          where: buildWhereFromResult(rst.sql.where),
          groupby: rst.sql.groupby,
          joinCondition: rst.sql.join_conditions,
          orderby: [],
        });
        setRecommendations(rst.recommendations);
        setModified(false);
      });
    }
  }, [modified]);

  useEffect(() => {
    if (nlQuery) {
      const params = {
        nlQuery: nlQuery,
      };
      // or:
      fetchNlQueryResult(params).then((rst) => {
        setDbID(rst.db_id);
        setData(rst.data);
        setQuery({
          select: buildSelectFromResult(rst.sql.select),
          from: rst.sql.from,
          where: buildWhereFromResult(rst.sql.where),
          groupby: rst.sql.groupby,
          joinCondition: rst.sql.join_conditions,
          orderby: [],
        });

        setRecommendations(rst.recommendations);
      });
    }
  }, [nlQuery]);

  return (
    <QueryContext.Provider
      value={{
        query,
        setQuery: (query) => {
          setQuery({ ...query });
          setModified(true);
        },
      }}>
      <ResultContainer>
        {/* <ResultChart data={dummyData.plain} sql={SQL} setData={setData} /> */}
        <ResultInterface />
        <ResultContext.Provider
          value={{
            data,
            setData,
            recommendations,
            setRecommendations,
          }}>
          <SearchInput />
          {data.length > 0 && <GraphContainer />}
        </ResultContext.Provider>
      </ResultContainer>
    </QueryContext.Provider>
  );
}
