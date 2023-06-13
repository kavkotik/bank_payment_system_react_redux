import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContragent,
  editContragent,
  deleteContragent,
} from "../store/contragentsSlice";

const Contragents = () => {
  const dispatch = useDispatch();

  const contragents = useSelector((state) => state.contragents.contragents);

  const [inputCAId, setInputCAId] = useState("");
  const [inputCardNumber, setInputCardNumber] = useState("");
  const [inputCAName, setInputCAName] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputTelephone, setInputTelephone] = useState("");
  const [inputDetails, setInputDetails] = useState("");
  const [addBtn, setAddBtn] = useState(true);
  const [editDeleteBtn, setEditDeleteBtn] = useState(false);

  const clearInputs = () => {
    setInputCAId("");
    setInputCardNumber("");
    setInputAddress("");
    setInputTelephone("");
    setInputCAName("");
    setInputDetails("");
    setInputTelephone("");
  };

  const changeContragent = (id) => {
    setAddBtn(false);
    setEditDeleteBtn(true);
    contragents.forEach((contragent) => {
      if (contragent.id === id) {
        setInputCAId(contragent.id);
        setInputCardNumber(contragent.cardNumber);
        setInputAddress(contragent.address);
        setInputTelephone(contragent.telephone);
        setInputCAName(contragent.name);
        setInputDetails(contragent.details);
      }
    });
  };

  const editContragentBtnHandler = () => {
    dispatch(
      editContragent({
        id: inputCAId,
        cardNumber: inputCardNumber,
        name: inputCAName,
        address: inputAddress,
        telephone: inputTelephone,
        details: inputDetails,
      })
    );

    clearInputs();
    setAddBtn(true);
    setEditDeleteBtn(false);
  };

  const deleteContragentBtnHandler = () => {
    dispatch(deleteContragent(inputCAId));

    clearInputs();
    setAddBtn(true);
    setEditDeleteBtn(false);
  };

  const addContragentBtnHandler = () => {
    dispatch(
      addContragent({
        cardNumber: inputCardNumber,
        name: inputCAName,
        address: inputAddress,
        telephone: inputTelephone,
        details: inputDetails,
        balance: 0,
      })
    );
    clearInputs();
  };

  return (
    <div className="contragents">
      <div className="edit-cards-menu">
        <p className="info">
          Enter the info to add a new contragent or choose the contragent from
          the list to edit or delete it.
        </p>
        <form className="card-editing-form">
          <label>
            <input
              type="number"
              placeholder="Contragent ID"
              value={inputCAId}
              disabled
              className="card-editing-input"
              name="id"
            />
            <input
              type="text"
              value={inputCardNumber}
              onChange={(e) => {
                setInputCardNumber(e.target.value);
              }}
              placeholder="Contragent card number"
              className="card-editing-input"
              name="number"
            />
            <input
              type="text"
              value={inputCAName}
              onChange={(e) => {
                setInputCAName(e.target.value);
              }}
              placeholder="Name of contragent"
              className="card-editing-input"
              name="name"
            />
            <input
              type="text"
              value={inputAddress}
              onChange={(e) => {
                setInputAddress(e.target.value);
              }}
              placeholder="Address"
              className="card-editing-input"
              name="exp"
            />
            <input
              type="number"
              value={inputTelephone}
              onChange={(e) => {
                setInputTelephone(e.target.value);
              }}
              placeholder="Telephone"
              className="card-editing-input"
              name="cvv2"
            />
            <input
              type="text"
              value={inputDetails}
              onChange={(e) => {
                setInputDetails(e.target.value);
              }}
              placeholder="Details"
              className="card-editing-input"
              name="ps"
            />
          </label>
        </form>
        <button
          className={addBtn ? "card-add btn" : "none"}
          onClick={() => {
            addContragentBtnHandler();
          }}
        >
          Add
        </button>
        <button
          className={editDeleteBtn ? "card-edit btn" : "none"}
          onClick={() => editContragentBtnHandler()}
        >
          Edit
        </button>
        <button
          className={editDeleteBtn ? "card-delete btn" : "none"}
          onClick={() => deleteContragentBtnHandler()}
        >
          Delete
        </button>
      </div>

      <div className="card-list-column">
        {contragents.map((contragent, key) => (
          <div
            className="contragent-item"
            key={contragent.id}
            onClick={() => changeContragent(contragent.id)}
          >
            <div className="contragent-name info">Name: {contragent.name}</div>

            <div className="contragent-number info">
              Card Number: {contragent.cardNumber}
            </div>
            <div className="contragent-address info">
              Address: {contragent.address}
            </div>
            <div className="contragent-telephone info">
              Telephone: {contragent.telephone}
            </div>
            <div className="contragent-balance info">
              Balance: {contragent.balance} USD
            </div>
            <div className="contragent-details info">
              Details: {contragent.details}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contragents;
