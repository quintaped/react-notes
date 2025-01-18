import { useState } from "react";
import "./App.css";
import { LeftPanel } from "./layout/leftPanel/LeftPanel";
import Body from "./layout/body/Body";
import Header from "./components/Header/Header";
import JournalAddBtn from "./components/JournalAddBtn/JournalAddBtn";
import JournalList from "./components/JournalList/JournalList";
import JournalForm from "./components/JournalForm/JournalFormReducer";
import { useLocalStorage } from "./hooks/use-localstorage.hooks";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((item) => ({
    ...item,
    date: new Date(item.date),
  }));
}

function App() {
  const [items, setItems] = useLocalStorage("data");
  const [count, setCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const addItem = (item) => {
    if (!item.id) {
      setItems([
        ...items,
        {
          ...item,
          id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        },
      ]);
    } else {
      setItems([
        ...mapItems(items).map((i) => {
          if (i.id === item.id) {
            return {
              ...item,
            };
          }
          return i;
        }),
      ]);
    }
  };

  const deleteItem = (id) => {
    setItems([...items.filter((i) => i.id !== id)]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddBtn clearForm={() => setSelectedItem(null)} />
        <JournalList items={mapItems(items)} setItem={setSelectedItem} />
      </LeftPanel>
      <Body>
        <JournalForm
          onSubmit={addItem}
          data={selectedItem}
          onDelete={deleteItem}
        />
      </Body>
    </div>
  );
}

export default App;
