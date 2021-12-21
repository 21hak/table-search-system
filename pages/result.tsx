import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import GraphContainer from "../components/Result/ResultGraph/GraphContainer";
import ResultContainer from "../components/Result/ResultContainer/ResultContainer";
import QueryContext, { IQuery } from "../context/query-context";
import ResultInterface from "../components/Result/ResultInterface/ResultInterface";
import ResultContext, { IResultData } from "../context/result-context";
import SearchInput from "../components/Result/SearchInput/SearchInput";
import { SelectModal } from "../components/Result/Modal/SelectModal";
import { GetStaticProps } from "next";
import { ISchemaData } from "pages";
import { SideBarContext } from "components/Layout";
import _ from "lodash";
import { GroupbyModal } from "components/Result/Modal/GroupbyModal";
import { ConditionModal } from "components/Result/Modal/ConditionModal";
import { ErrorModal } from "components/Result/Modal/ErrorModal";
import ModalContext from "context/modal-context";
import { fetchNlQueryResult, fetchSQLResult } from "api";
import {
  buildSelectFromResult,
  buildWhereFromResult,
  buildWherePayload,
} from "utils/helper";
import { TableModal } from "components/Result/Modal/TableModal";

/**
 * 검색 결과 페이지
 */
const Result = (props: ISchemaData) => {
  const router = useRouter();
  const [nlQuery, setNlQuery] = useState("");
  const [rawQuery, setRawQuery] = useState("");
  const [data, setData] = useState<IResultData>([]);
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
  const [tableRecommendations, setTableRecommendations] = useState<string[]>(
    []
  );
  const { setSchema } = useContext(SideBarContext);
  const [selectModalVisibe, setSelectModalVisible] = useState(false);
  const [groupbyModalVisibe, setGroupbyModalVisible] = useState(false);
  const [conditionModalVisibe, setConditionModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [tableModalVisible, setTableModalVisible] = useState(false);

  useEffect(() => {
    if (router.query.nlQuery) {
      setNlQuery(router.query.nlQuery as string);
    }
  }, [router.query]);

  useEffect(() => {
    setSchema(
      JSON.parse(
        JSON.stringify(_.groupBy(props.schema, (data) => data.table_name))
      )
    );
  }, []);

  // TODO: 우선 전체 schema에서 추천
  // useEffect(() => {
  //   if ((query.from ?? []).length > 0) {
  //     setRecommendations([
  //       ...props.schema
  //         .filter((s) => query.from.includes(s.table_name))
  //         .map((c) => `${c.table_name}.${c.column_name}`),
  //     ]);
  //   }
  // }, [query.from]);
  useEffect(() => {
    setRecommendations([
      ...props.schema.map((c) => `${c.table_name}.${c.column_name}`),
    ]);
    setTableRecommendations(_.uniq(props.schema.map((c) => c.table_name)));
  }, []);

  /**
   * 서버에 query를 요청 하여 결과를 상태값으로 관리
   */
  const postSQL = useCallback(
    async (params: IQuery) => {
      if (params.select.length > 0 && params.from.length > 0) {
        fetchSQLResult({
          sql: {
            select: params.select.map((select) => [select.agg, select.column]),
            from: params.from,
            where: buildWherePayload(params.where),
            groupby: params.groupby,
            join_conditions: params.joinCondition,
          },
          // FIXME: db id 넣어줘야함
          // db_id: dbID,
          db_id: "w3schools_test",
        })
          .then((rst) => {
            setData(rst.data);
            setQuery({
              select: [...buildSelectFromResult(rst.sql.select)],
              from: rst.sql.from,
              where: buildWhereFromResult(rst.sql.where),
              groupby: rst.sql.groupby,
              joinCondition: rst.sql.join_conditions,
              orderby: [],
            });

            setRawQuery(rst.raw_sql);
          })
          .catch((e) => {
            setErrorModalVisible(true);
          });
      } else {
        setQuery({
          ...params,
        });
        setData([]);
      }
    },
    [dbID]
  );

  /**
   * 서버에 자연언어를 질의하고 결과를 상태값으로 관리
   * @param params 자연언어 질의
   */
  const getNlQuery = async (params: { nlQuery: string }) => {
    fetchNlQueryResult(params)
      .then((rst) => {
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
        setRawQuery(rst.raw_sql);
      })
      .catch((e) => {
        setErrorModalVisible(true);
      });
  };

  useEffect(() => {
    if (nlQuery) {
      getNlQuery({ nlQuery: nlQuery });
    }
  }, [nlQuery]);

  return (
    <QueryContext.Provider
      value={{
        query,
        setQuery,
        nlQuery,
        setNlQuery,
        rawQuery,
        setRawQuery,
        postSQL,
        getNlQuery,
      }}>
      <ModalContext.Provider
        value={{
          tableModal: {
            visible: tableModalVisible,
            setVisible: setTableModalVisible,
          },
          selectModal: {
            visible: selectModalVisibe,
            setVisible: setSelectModalVisible,
          },
          groupbyModal: {
            visible: groupbyModalVisibe,
            setVisible: setGroupbyModalVisible,
          },
          conditionModal: {
            visible: conditionModalVisibe,
            setVisible: setConditionModalVisible,
          },
          errorModal: {
            visible: errorModalVisible,
            setVisible: setErrorModalVisible,
          },
        }}>
        <ResultContext.Provider
          value={{
            data,
            setData,
            recommendations,
            setRecommendations,
            tableRecommendations,
            setTableRecommendations,
          }}>
          <ResultContainer>
            <ResultInterface />
            <SearchInput />
            {data.length > 0 && <GraphContainer />}
          </ResultContainer>
          <SelectModal />
          <TableModal />
          <GroupbyModal />
          <ConditionModal />
          <ErrorModal />
        </ResultContext.Provider>
      </ModalContext.Provider>
    </QueryContext.Provider>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const data: ISchemaData = await fetch("http://localhost:40010/").then(
    function (response) {
      return response.json();
    }
  );

  return {
    props: {
      schema: data.schema,
    },
  };
};

export default Result;
