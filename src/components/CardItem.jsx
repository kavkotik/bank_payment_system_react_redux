import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const CardItem = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cards = useSelector((state) => state.cards.cards);

  const id = location.pathname.slice(-1);

  return (
    <div className="cardItemDetails">
      <img
        src="../close.png"
        alt="close-img"
        className="close-icon"
        onClick={() => navigate(-1)}
      />

      <h2 className="title card-item-title">Card details</h2>
      {cards.map((card) =>
        card.id == id ? (
          <>
            <div className="card-item-number info">
              Card number: {card.number}
            </div>
            <div className="card-item-name info">
              Card owner name: {card.name}
            </div>
            <div className="card-item-exp info">Card EXP: {card.exp}</div>
            <div className="card-item-cvv2 info">Card CVV2: {card.cvv2}</div>
            <div className="card-item-ps info">
              Card payment system: {card.paymentSystem}
            </div>
            <div className="card-item-balance info">
              Card balance: {card.balance} USD
            </div>
            <div className="card-item-credit-limit info">
              Card credit limit: {card.creditLimit} USD
            </div>
          </>
        ) : null
      )}
    </div>
  );
};

export default CardItem;
