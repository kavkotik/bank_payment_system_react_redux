import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCard, editCard, deleteCard } from "../store/cardsSlice";

const Cards = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.cards.cards);

  const [inputId, setInputId] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputExp, setInputExp] = useState("");
  const [inputCvv2, setInputCvv2] = useState("");
  const [inputPs, setInputPs] = useState("");
  const [inputCover, setInputCover] = useState("");
  const [addBtn, setAddBtn] = useState(true);
  const [editDeleteBtn, setEditDeleteBtn] = useState(false);

  const clearInputs = () => {
    setInputId("");
    setInputNumber("");
    setInputCover("");
    setInputCvv2("");
    setInputExp("");
    setInputName("");
    setInputPs("");
  };

  const changeCard = (id) => {
    setAddBtn(false);
    setEditDeleteBtn(true);
    cards.forEach((card) => {
      if (card.id === id) {
        setInputId(card.id);
        setInputNumber(card.number);
        setInputCover(card.cover);
        setInputCvv2(card.cvv2);
        setInputExp(card.exp);
        setInputName(card.name);
        setInputPs(card.paymentSystem);
      }
    });
  };

  const editCardButtonHandler = () => {
    dispatch(
      editCard({
        id: inputId,
        number: inputNumber,
        name: inputName,
        exp: inputExp,
        cvv2: inputCvv2,
        balance: 0,
        creditLimit: 0,
        paymentSystem: inputPs,
        cover: inputCover,
      })
    );
    clearInputs();
    setAddBtn(true);
    setEditDeleteBtn(false);
  };

  const deleteCardButtonHandler = () => {
    dispatch(deleteCard(inputId));
    clearInputs();
    setAddBtn(true);
    setEditDeleteBtn(false);
  };

  const addCardButtonHandler = () => {
    dispatch(
      addCard({
        number: inputNumber,
        name: inputName,
        exp: inputExp,
        cvv2: inputCvv2,
        balance: 0,
        creditLimit: 0,
        paymentSystem: inputPs,
        cover: inputCover,
      })
    );

    clearInputs();
  };

  return (
    <div className="cards">
      <div className="cards-list-column">
        {cards.map((card) => (
          <div
            className="cards-item"
            key={card.id}
            onClick={() => changeCard(card.id)}
          >
            <img src={card.cover} alt="card1_img" className="card-img" />

            <div className="card-number">{card.number}</div>
            <div className="card-name">{card.name}</div>
            <div className="card-balance">balance: {card.balance} USD</div>
            <div className="card-exp">{card.exp}</div>
            <button
              onClick={() => navigate(`${card.id}`)}
              className="details-button"
            >
              details
            </button>
          </div>
        ))}
      </div>
      <div className="edit-cards-menu">
        <p className="info">
          Enter the info to add a new card or choose the card from the list to
          edit or delete it.
        </p>
        <form className="card-editing-form">
          <label>
            <input
              type="number"
              placeholder="Card ID"
              value={inputId}
              disabled
              className="card-editing-input"
              name="id"
            />
            <input
              type="text"
              value={inputNumber}
              onChange={(e) => {
                setInputNumber(e.target.value);
              }}
              placeholder="Card number"
              className="card-editing-input"
              name="number"
            />
            <input
              type="text"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
              }}
              placeholder="Name of owner"
              className="card-editing-input"
              name="name"
            />
            <input
              type="text"
              value={inputExp}
              onChange={(e) => {
                setInputExp(e.target.value);
              }}
              placeholder="EXP"
              className="card-editing-input"
              name="exp"
            />
            <input
              type="number"
              value={inputCvv2}
              onChange={(e) => {
                setInputCvv2(e.target.value);
              }}
              placeholder="CVV2"
              className="card-editing-input"
              name="cvv2"
            />
            <input
              type="text"
              value={inputPs}
              onChange={(e) => {
                setInputPs(e.target.value);
              }}
              placeholder="Payment system"
              className="card-editing-input"
              name="ps"
            />
            <input
              type="text"
              value={inputCover}
              onChange={(e) => {
                setInputCover(e.target.value);
              }}
              placeholder="Cover link"
              className="card-editing-input"
              name="cover"
            />
          </label>
        </form>
        <button
          className={addBtn ? "card-add btn" : "none"}
          onClick={() => {
            addCardButtonHandler();
          }}
        >
          Add
        </button>
        <button
          className={editDeleteBtn ? "card-edit btn" : "none"}
          onClick={() => editCardButtonHandler()}
        >
          Edit
        </button>
        <button
          className={editDeleteBtn ? "card-delete btn" : "none"}
          onClick={() => deleteCardButtonHandler()}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Cards;
