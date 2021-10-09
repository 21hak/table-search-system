// printed-books/:book-id
import axios from "axios";
import { clamp } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ResultChart from "../components/ResultChart";

type ISelect = {
  column: string;
  agg: "NONE" | "MAX" | "MIN";
};

type IWhere = {
  left: string;
  sign: "=" | "<=";
  right: string | number;
};

type INlQueryResult = {
  data: IResultData;
  sql: {
    select: Array<["NONE" | "MAX" | "MIN", string]>;
    from: string[];
    where: Array<[string, "=" | "<=", string]>;
    groupby: string[];
    join_conditions: string[];
  };
};

export type IResultData = Array<{ [column: string]: string | number }>;

const fetchNlQueryResult = async (params: any): Promise<INlQueryResult> => {
  return (
    await axios.post("http://localhost:40010/secondPage", params, {
      headers: { "content-type": "application/json" },
    })
  ).data;
};

const buildSelectFromResult = (
  selects: Array<["NONE" | "MAX" | "MIN", string]>
) => {
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
  const [selects, setSelects] = useState<ISelect[]>([]);
  const [tables, setTables] = useState<string[]>([]);
  const [groupBy, setGroupBy] = useState<string[]>([]);
  const [wheres, setWheres] = useState<IWhere[]>([]);
  const [joinCondition, setJoinCondition] = useState<string[]>([]);
  const [data, setData] = useState<IResultData>([]);

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
  useEffect(() => {
    if (router.query.nlQuery) setnlQuery(router.query.nlQuery as string);
  }, [router.query]);

  useEffect(() => {
    if (nlQuery) {
      const params = {
        nlQuery: nlQuery,
      };
      // or:
      fetchNlQueryResult(params).then((rst) => {
        console.log(rst);
        setData(rst.data);
        setSelects(buildSelectFromResult(rst.sql.select));
        setTables(rst.sql.from);
        setJoinCondition(rst.sql.join_conditions);
        setWheres(buildWhereFromResult(rst.sql.where));
      });
    }
  }, [nlQuery]);

  return (
    <div className="flex flex-col justify-start w-full bg-gray-100 h-full p-3">
      <div className="flex flex-col mb-2">
        <div className="flex items-start">
          <span className="font-normal w-28 block">Tables</span>
          <div className="flex flex-wrap items-center">
            {tables.map((table) => (
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
            {selects.map((select, index) => (
              <span
                key={`${select.column}${index}}`}
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
                {select.column}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-start">
          <span className="font-normal w-28 block">Conditions</span>
          <div className="flex flex-wrap items-center">
            {wheres.map((where) => (
              <span
                key={`${where.left}${where.sign}${where.right}`}
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
                {`${where.left}${where.sign}${where.right}`}
              </span>
            ))}
          </div>
        </div>
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
      <ResultChart data={data} />
    </div>
  );
}
