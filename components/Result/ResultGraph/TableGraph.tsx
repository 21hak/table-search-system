import { IResultData } from "../../../pages/result";
import { useTable } from "react-table";
import React from "react";

interface IResultTableProps {
  data: IResultData;
}

const ResultTable: React.FC<IResultTableProps> = function ResultTable(props) {
  const columns = React.useMemo(
    () =>
      props.data.length
        ? Object.keys(props.data[0]).map((header) => ({
            Header: header,
            accessor: header,
          }))
        : [],
    [props.data]
  );

  const data = React.useMemo(() => {
    return props.data;
  }, [props.data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data } as any);

  return (
    <table
      {...getTableProps()}
      //  style={{ border: "solid 1px blue" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  textAlign: "start",
                  border: "solid 1px gray",
                  fontWeight: "bold",
                  paddingLeft: 4,
                  backgroundColor: "gray",
                }}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    // rowSpan={cell.column.Header === "test" ? 7 : undefined}
                    style={{
                      textAlign: "start",
                      paddingLeft: 4,
                      paddingRight: 4,
                      border: "solid 1px gray",
                    }}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default ResultTable;
