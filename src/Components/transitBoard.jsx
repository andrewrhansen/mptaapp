import React from "react";

const TransitBoard = ({ schedule, routes }) => {
  if (schedule === undefined || routes === undefined) {
    return <div>Click button to load board</div>;
  }

  const populateTable = () => {
    return routes.map((r) => (
      <tr>
        <td>{r.attributes.direction_destinations[0]}</td>
        {schedule.map((s) => {
          r.relationships.data.id === s.relationships.data.id ? (
            <td>{s.attributes.arrival_time}</td>
          ) : (
            <td>Time not available</td>
          );
        })}
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Destination</th>
          <th>Arrival Time</th>
        </tr>
      </thead>
      <tbody>{populateTable()}</tbody>
    </table>
  );
};

export default TransitBoard;
