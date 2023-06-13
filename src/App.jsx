import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cards from "./components/Cards";
import CardItem from "./components/CardItem";
import Contragents from "./components/Contragents";
import History from "./components/History";
import { fetchCards } from "./store/cardsSlice";
import { fetchContragents } from "./store/contragentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "./store/historySlice";

function App() {
  const dispatch = useDispatch();

  const cards = useSelector((state) => state.cards.cards);
  const contragents = useSelector((state) => state.contragents.contragents);
  const history = useSelector((state) => state.history.history);

  useEffect(() => {
    dispatch(fetchCards());
  }, [cards]);

  useEffect(() => {
    dispatch(fetchContragents());
  }, [contragents]);
  useEffect(() => {
    dispatch(fetchHistory());
  }, [history]);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/cards" element={<Cards />}></Route>
      <Route path="/cards/:id" element={<CardItem />}></Route>
      <Route path="/contragents" element={<Contragents />}></Route>
      <Route path="/history" element={<History />}></Route>
    </Routes>
  );
}

export default App;
