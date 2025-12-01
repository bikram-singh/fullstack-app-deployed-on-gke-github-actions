import React, { useEffect, useState } from "react";
import { fetchHealth, fetchDbCheck, fetchItems } from "./api";

function App() {
  const [health, setHealth] = useState(null);
  const [db, setDb] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const h = await fetchHealth();
      setHealth(h);
      const d = await fetchDbCheck();
      setDb(d);
      const i = await fetchItems();
      setItems(i.items || []);
    })();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>GKE Fullstack App</h1>
      <h2>Backend Health</h2>
      <pre>{JSON.stringify(health, null, 2)}</pre>

      <h2>DB Status</h2>
      <pre>{JSON.stringify(db, null, 2)}</pre>

      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{`${item.id}: ${item.name}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
