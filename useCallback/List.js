//the useEffect hook gets called whenever the getItems changes, because its in the dependency array. however, the issue now is that the useEffect here runs, when toggle theme is click, which should not run the useEffect.

//why this happens is, the getItems function in the App component, gets re-created every single time we render our App component, and since its re-created, useEffect runs
//so we fix this issue with useCallback hook.

import React, { useEffect, useState } from "react";

export default function List({ getItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getItems(5));
    console.log("Updating Items");
  }, [getItems]);

  return items.map((item) => <div key={item}>{item}</div>);
}
