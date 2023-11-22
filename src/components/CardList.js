import React, { useState, useEffect } from "react";

// Dati delle card
var data = [
  {
    id: 5,
    titolo: "Caterina Rossi",
    descrizione:
      "Persona affidabile nel mondo del digital marketing con esperienza da 3 anni",
  },
  {
    id: 2,
    titolo: "Michael Menegoi",
    descrizione: "Ragazzo più serio e bello di tutta Verona",
  },
  {
    id: 3,
    titolo: "Kevin Balasca",
    descrizione:
      "Ragazzo intelligente ma non si applica",
  },
];

// Componente che renderizza tutte le card
function CardList() {
  // Componente della singola card
  function Card({ id, titolo, descrizione }) {
    return (
      <div className="container_card">
        <div className="content_card">
          <h2>{titolo}</h2>
          <p>{descrizione}</p>
          <div className="containerCTA_card">
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => deleteCard(id)}
            >
              ELIMINA
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Definisco gli stati
  const [cardList, setCardList] = useState(data);
  const [newCard, setNewCard] = useState({
    id: 0,
    titolo: "",
    descrizione: "",
  });

  // Funzion epr trovare l'ID maggiore tra le card presenti
  function findMaxFromID() {
    var IDarray = [];
    cardList.forEach((card) => {
      IDarray.push(card.id);
    });
    return Math.max(...IDarray);
  }

  // Funzione per aggiungere una nuova card
  function addCard() {
    const newCardWithId = {
      ...newCard,
      id: findMaxFromID() + 1,
    };

    setCardList([...cardList, newCardWithId]);
    setNewCard({
      id: 0,
      titolo: "",
      descrizione: "",
    });
  }

  // Funzione per eliminare una card dalla lista corrente
  function deleteCard(id) {
    var newCardList = cardList.filter((card) => card.id !== id);
    setCardList(newCardList);
  }

  // Effettua un re-rendering al variare dello stato cardList
  useEffect(() => {
    console.log(cardList);
  }, [cardList]);

  return (
    <div>
      <div className="form_container">
        <label>Titolo </label>
        <input
          className="input_field"
          value={newCard.titolo}
          onChange={(e) => setNewCard({ ...newCard, titolo: e.target.value })}
          placeholder="Inserisci un titolo"
        />
        <br />
        <label>Descrizione </label>
        <input
          className="input_field"
          value={newCard.descrizione}
          onChange={(e) =>
            setNewCard({ ...newCard, descrizione: e.target.value })
          }
          placeholder="Inserisci una descrizione"
        />
        <div className="button_container">
          <button onClick={addCard}>ADD CARD</button>
        </div>
      </div>

      {/* Renderizza le card presenti nella lista corrente */}
      {cardList.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          titolo={card.titolo}
          descrizione={card.descrizione}
        />
      ))}
    </div>
  );
}

export default CardList;
