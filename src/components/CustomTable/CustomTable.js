import React from "react";
import { Spinner, Table } from "reactstrap";

function CustomTable({ columns, rows, isLoading }) {
  return (
    <Table className="align-items-center table-flush" responsive>
      <thead className="thead-light">
        <tr className="table-row-h">
          {columns?.map((column, idx) => (
            <th scope="col" key={idx}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <Spinner />
        ) : rows?.length === 0 ? (
          <p className="p-4 mb-0">No Data Available</p>
        ) : (
          rows?.map((row, index) => {
            const valuePair = Object?.values(row);
            return (
              <tr key={index}>
                {valuePair?.map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
}

export default CustomTable;
