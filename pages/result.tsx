// printed-books/:book-id
import axios from "axios";
import { clamp, groupBy } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ResultChart, { dummyData } from "../components/ResultChart";
import Autocomplete from "react-autocomplete";
import { matchColumn } from "../utils";

export type ISelect = {
  column: string;
  agg: "NONE" | "MAX" | "MIN";
};

export type IWhere = {
  left: string;
  sign: "=" | "<=";
  right: string | number;
};

export type IResultData = Array<{ [column: string]: string | number }>;
export type IResultSQL = {
  select: Array<["NONE" | "MAX" | "MIN", string]>;
  from: string[];
  where: Array<[string, "=" | "<=", string]>;
  groupby: string[];
  join_conditions: string[];
  orderby: string[];
};
export type ISQL = {
  select: Array<ISelect>;
  from: string[];
  where: Array<IWhere>;
  groupby: string[];
  joinCondition: string[];
  orderby: string[];
};
export type INlQueryResult = {
  data: IResultData;
  sql: IResultSQL;
  db_id: string;
  recommendations: string[];
};

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
  const [SQL, setSQL] = useState<ISQL>({
    select: [],
    from: [],
    where: [],
    groupby: [],
    joinCondition: [],
    orderby: [],
  });
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState<string[]>([]);
  // const [selects, setSelects] = useState<ISelect[]>([]);
  // const [tables, setTables] = useState<string[]>([]);
  // const [groupBys, setGroupBys] = useState<string[]>([]);
  // const [wheres, setWheres] = useState<IWhere[]>([]);
  // const [joinConditions, setJoinConditions] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSelect = (data: any) => {
    SQL.select.push({ column: data, agg: "NONE" });
    setSQL({ ...SQL, select: SQL.select });
    setModified(true);
  };
  const onClear = () => {
    router.push({ pathname: "/" });
  };

  const onRemoveGroupby = (index: number) => {
    SQL.groupby.splice(index, 1);
    if (SQL.groupby.length === 0) {
      SQL.select.forEach((s) => (s.agg = "NONE"));
    }
    setSQL({ ...SQL, select: SQL.select, groupby: SQL.groupby });
    setModified(true);
  };

  useEffect(() => {
    if (router.query.nlQuery) setnlQuery(router.query.nlQuery as string);
  }, [router.query]);

  useEffect(() => {
    if (modified) {
      const params = {
        sql: {
          select: SQL.select.map((select) => [select.agg, select.column]),
          from: SQL.from,
          where: SQL.where.map((where) => [
            where.left,
            where.sign,
            where.right,
          ]),
          groupby: SQL.groupby,
          join_conditions: SQL.joinCondition,
        },
        db_id: dbID,
      };
      fetchSQLResult(params).then((rst) => {
        setData(rst.data);
        setSQL({
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
        setSQL({
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
    <div className="flex flex-col justify-start w-full bg-gray-100 h-full p-3">
      <div className="flex flex-col mb-2">
        <div className="flex items-start">
          <span className="font-normal w-28 block">Tables</span>
          <div className="flex flex-wrap items-center">
            {SQL.from.map((table) => (
              <span
                key={table}
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
                {table}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-start">
          <span className="font-normal w-28 block">Outputs</span>
          <div className="flex flex-wrap items-center">
            {SQL.select.map((select, index) => (
              <span
                onClick={() => {
                  SQL.select.splice(index, 1);
                  setSQL({ ...SQL, select: SQL.select });
                  setModified(true);
                }}
                key={`${select.column}${index}}`}
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1 cursor-pointer">
                {`${select.column} ${
                  select.agg !== "NONE" ? `(${select.agg})` : ""
                }`}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-start">
          <span className="font-normal w-28 block">Conditions</span>
          <div className="flex flex-wrap items-center">
            {SQL.where.map((where, index) => (
              <span
                onClick={() => {
                  SQL.where.splice(index, 1);
                  setSQL({ ...SQL, where: SQL.where });
                  setModified(true);
                }}
                key={`${where.left}${where.sign}${where.right}`}
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
                {`${where.left}${where.sign}${where.right}`}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-start">
          <span className="font-normal w-28 block">GroupBy</span>
          <div className="flex flex-wrap items-center">
            {SQL.groupby.map((groupBy, index) => (
              <span
                // onClick={() => {
                //   SQL.groupby.splice(index, 1);
                //   setSQL({ ...SQL, groupby: SQL.groupby });
                //   setModified(true);
                // }}
                onClick={() => {
                  onRemoveGroupby(index);
                }}
                key={groupBy}
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1 cursor-pointer">
                {groupBy}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-2">
        <button
          className="pr-4 pl-4 rounded  border border-gray-600"
          onClick={onClear}>
          Clear
        </button>
      </div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border border-gray-400 w-full p-1"
          placeholder="Search to Add Fields"
          {...register("query", {
            validate: (value) => value !== "",
          })}
        />
      </form> */}
      <div className="flex border border-gray-500 rounded w-full bg-white">
        <Autocomplete
          {...register("query", {
            validate: (value) => value !== "",
          })}
          value={input}
          inputProps={{
            id: "states-autocomplete",
            className: "focus:outline-none p-1 rounded-l w-full",
          }}
          wrapperStyle={{
            position: "relative",
            display: "inline-block",
            flexGrow: 1,
            zIndex: 1,
          }}
          items={recommendations}
          getItemValue={(item: any) => item}
          shouldItemRender={matchColumn}
          // sortItems={sortStates}
          onChange={(event, value) => setInput(value)}
          onSelect={onSelect}
          renderMenu={(children) => (
            <div className="absolute box-border border border-gray-300 bg-indigo-50">
              {children}
            </div>
          )}
          renderItem={(item: any, isHighlighted: boolean) => (
            <div
              className={`p-1 cursor-pointer ${
                isHighlighted ? "text-white bg-blue-600" : ""
              }`}
              key={item}>
              {item}
            </div>
          )}
        />
        <button className="bg-blue-600 text-white m-0.5 pr-1 pl-1 rounded">
          Enter
        </button>
      </div>

      {/* <ResultChart data={dummyData.plain} sql={SQL} setData={setData} /> */}
      {data.length > 0 && (
        <ResultChart data={data} sql={SQL} setData={setData} />
      )}
    </div>
  );
}
