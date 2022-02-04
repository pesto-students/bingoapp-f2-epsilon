import React from 'react'

export default function Table(props) {

    const{data}=props
    const getKeys = () => {
        return Object.keys(props.data[0]);
      };
    
      const getHeader = () => {
        var keys = getKeys();
        return keys.map((key, index) => {
            return <th key={index}>{key.replaceAll("_", " ")}</th>;
        });
      };

    const getRowsData = () => {
        var items = props.data;
        var keys = getKeys();
        return items.map((row, index) => {
          return (
            <tr className='' key={index}>
              <RenderRow key={index} data={row} keys={keys}/>
            </tr>
          );
        });
      };

    const RenderRow = (data) => {
        return data.keys.map((key, index) => {
            return (
              <td className='' key={index}>
                {data.data[key]}
              </td>
            );
          }
        );
      };

    return (
        <div>
        {data && data.length > 0 ? (
          <table className="custom-table">
            <thead className="t-head">
              <tr>{getHeader()}</tr>
            </thead>
            <tbody>{getRowsData()}</tbody>
          </table>
        ) : (
          <p>No data found</p>
        )}
      </div>
    )
}


