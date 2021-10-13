// printed-books/:book-id
import axios from "axios";
import { clamp, groupBy } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ResultChart, { dummyData } from "../components/ResultChart";

type ISelect = {
  column: string;
  agg: "NONE" | "MAX" | "MIN";
};

type IWhere = {
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
};
export type ISQL = {
  select: Array<ISelect>;
  from: string[];
  where: Array<IWhere>;
  groupby: string[];
  joinCondition: string[];
};
export type INlQueryResult = {
  data: IResultData;
  sql: IResultSQL;
  db_id: string;
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
  });
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

  const onSubmit = (data: any) => {
    router.push({
      pathname: "/result",
      query: { nlQuery: data.query },
    });
  };
  const onClear = () => {
    router.push({ pathname: "/" });
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
          where: SQL.where.map(
            (where) =>
              `${where.left}
            ${where.sign}
            ${where.right}}`
          ),
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
        });
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
        });
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
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
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
                onClick={() => {
                  SQL.groupby.splice(index, 1);
                  setSQL({ ...SQL, groupby: SQL.groupby });
                  setModified(true);
                }}
                key={groupBy}
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border border-gray-400 w-full p-1"
          placeholder="Modify Your Query"
          {...register("query", {
            validate: (value) => value !== "",
          })}
        />
      </form>
      {/* <ResultChart data={dummyData.groupBy} sql={SQL} /> */}
      <ResultChart data={data} sql={SQL} />
    </div>
  );
}
