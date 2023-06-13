import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editCard } from "../store/cardsSlice";
import { editContragent } from "../store/contragentsSlice";
import { addHistory } from "../store/historySlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [choosenCard, setChoosenCard] = useState("");
  const [choosenContragent, setChoosenContragent] = useState("");
  const [notice, setNotice] = useState("");

  const cards = useSelector((state) => state.cards.cards);
  const contragents = useSelector((state) => state.contragents.contragents);

  const sum = useRef(null);

  const chooseCard = (id, number) => {
    setChoosenCard(number);
    setNotice("");
  };
  const chooseContragent = (id, name) => {
    setChoosenContragent(name);
    setNotice("");
  };

  const payAction = () => {
    if (choosenContragent === "" && sum.current.value > 0) {
      cards.forEach((card) => {
        if (choosenCard === card.number) {
          setNotice("");
          const date = Date().slice(0, 24);
          let newCardBalance = Number(card.balance) + Number(sum.current.value);
          dispatch(
            editCard({
              id: card.id,
              balance: newCardBalance,
            })
          );
          dispatch(
            addHistory({
              from: "terminal",
              to: choosenCard,
              date: date,
              amount: Number(sum.current.value),
            })
          );

          sum.current.value = null;
          setChoosenCard("");
        }
      });
    } else {
      const date = Date().slice(0, 24);

      cards.forEach((card) => {
        if (
          choosenCard === card.number &&
          sum.current.value <= card.balance &&
          sum.current.value > 0
        ) {
          setNotice("");

          let newCardBalance = card.balance - sum.current.value;
          dispatch(
            editCard({
              id: card.id,
              balance: newCardBalance,
            })
          );

          contragents.forEach((contragent) => {
            if (contragent.name === choosenContragent) {
              let newContragentBalance =
                Number(contragent.balance) + Number(sum.current.value);
              dispatch(
                editContragent({
                  id: contragent.id,
                  balance: newContragentBalance,
                })
              );
            }
          });
          dispatch(
            addHistory({
              from: choosenCard,
              to: choosenContragent,
              date: date,
              amount: Number(sum.current.value),
            })
          );
        }

        if (sum.current.value < 0) {
          setNotice("error. please check the sum");
        }
      });

      cards.forEach((card) => {
        if (choosenCard === card.number && sum.current.value > card.balance) {
          setNotice("error. please check your balance");
        }
      });

      sum.current.value = null;
      setChoosenCard("");
      setChoosenContragent("");
    }
  };

  return (
    <div className="container">
      <div className="home">
        <h1>HOME</h1>
        <div className="menu">
          <button
            className="menu-cards-btn btn"
            onClick={() => navigate("/cards")}
          >
            Cards
          </button>
          <button
            className="menu-contragens-btn btn"
            onClick={() => navigate("/contragents")}
          >
            Contragents
          </button>
          <button
            className="menu-histoty-btn btn"
            onClick={() => navigate("/history")}
          >
            History
          </button>
        </div>

        <div className="info">
          Choose a card from the list and enter the sum to top up it
          <span className="green"> or</span> choose a card and contragent from
          the list to make a money transfer.
        </div>

        <div className="home-input-block">
          <input
            type="number"
            className="money-input"
            placeholder="enter the sum"
            ref={sum}
          />
          <button className="money-pay-btn" onClick={() => payAction()}>
            pay
          </button>
        </div>

        <div className="home-payment-info">
          <h4 className="">Payment details</h4>
          <div className="info-inputs">
            <input
              type="text"
              className="info-card info-input"
              placeholder=" choose a card from the list"
              disabled
              value={choosenCard}
            />
            <input
              type="text"
              className="info-contragent info-input"
              placeholder="choose a contragent from the list"
              disabled
              value={choosenContragent}
            />
          </div>
          <p className="notice info">{notice}</p>
        </div>

        <div className="home-contragents-block">
          <h3 className="title">Contragents</h3>
          <ul className="contragents-list">
            {contragents.map((contragent, key) => (
              <li
                className="contragents-item"
                key={contragent.id}
                onClick={() => chooseContragent(contragent.id, contragent.name)}
              >
                {contragent.name}, balance: {contragent.balance} USD
              </li>
            ))}
          </ul>
        </div>

        <div className="home-cards-block">
          <h3 className="title">Cards</h3>
          <div className="cards-list">
            {cards.map((card) => (
              <div className="cards-item" key={card.id}>
                <img
                  src={card.cover}
                  alt="card1_img"
                  className="card-img"
                  onClick={() => chooseCard(card.id, card.number)}
                />
                <img src="chip.png" alt="chip" className="chip-img" />
                <div className="card-number">{card.number}</div>
                <div className="card-name">{card.name}</div>
                <div className="card-exp">{card.exp}</div>
                <div className="card-balance">balance: {card.balance} USD</div>
                <button
                  className="details-button"
                  onClick={() => navigate(`/cards/${card.id}`)}
                >
                  details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
