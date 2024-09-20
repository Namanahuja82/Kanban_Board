import { TCard } from "@/types";
import { Column } from "./Column";
import { BurnBarrel } from "./BurnBarrel";
import { useEffect, useState } from "react";

export const Board = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const [haschecked, setHasChecked] = useState(false);

  useEffect(() => {
    haschecked &&
      localStorage.setItem("kanban_board_cards", JSON.stringify(cards));
  }, [cards, haschecked]);

  useEffect(() => {
    const cardsData = localStorage.getItem("kanban_board_cards");
    setCards(cardsData ? JSON.parse(cardsData) : []);
    setHasChecked(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Task Management with Kanban Board
      </h1>
      <div className="flex-grow flex flex-col lg:flex-row gap-4 mb-4 overflow-x-auto">
       
        <Column
          title="Todo"
          column="todo"
          headingColor="text-yellow-400"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Active"
          column="active"
          headingColor="text-blue-400"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Completed"
          column="completed"
          headingColor="text-emerald-400"
          cards={cards}
          setCards={setCards}
        />
      </div>
      <div className="mt-auto">
        <BurnBarrel setCards={setCards} />
      </div>
    </div>
  );
};