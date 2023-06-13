import React from "react";
import { useSelector } from "react-redux";

const History = () => {
  const history = useSelector((state) => state.history.history);
  return (
    <div className="history">
      {history.map((event) => (
        <div className="history-event" key={event.id}>
          <div className="event-details">
            <div className="event-date info">
              <span className="green">Date: </span>
              {event.date}
            </div>
          </div>

          <div className="event-from info">
            <span className="green">From: </span>
            {event.from}
          </div>
          <div className="event-to info">
            <span className="green">To: </span> {event.to}
          </div>
          <div className="event-amount info">
            <span className="green">Amount: </span>
            {event.amount} USD
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
