//we have two functions here, the first is an input that takes in a number, and renders a List component right at the bottom with the number itself, the number + 1 and + 2. we also have a button 'Toggle Theme' that changes the background color.

//the way to tackle this is to useCallback in the function here.

//useCallback is similar to useMemo the useCallback hook here, now, useCallback only re-creates the getItems function when number changes, as it is inside the dependency array.

//USEMEMO VS USECALLBACK:
//useMemo: takes a function and returns the RETURN VALUE OF THE FUNCTION
//useCallback: takes a function, and returns the FUNCTION ITSELF

// we should only use the useCallback hook if we care about referential equality.
//use case for useCallback: when function CREATION is slow
//or referential equality is important and there are parameters in the function

import React, { useState, useCallback } from "react";
import List from "./List.js";

export default function App() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  const getItems = useCallback(
    (incrementor) => {
      return [
        number + incrementor,
        number + 1 + incrementor,
        number + 2 + incrementor,
      ];
    },
    [number]
  );

  //this is the useMemo, useMemo is only set to the return [number, number + 1, number + 2];
  //useMemo does not accept function parameters as well, since it only accepts the return value of the function.
  //   const getItems = useMemo(() => {
  //     return [number, number + 1, number + 2];
  //   }, [number]);

  const theme = {
    backgroundColor: dark ? "#333" : "#FFF",
    color: dark ? "#FFF" : "#333",
  };

  return (
    <div style={theme}>
      <input
        type='number'
        value={number}
        onChange={(event) => setNumber(parseInt(event.target.value))}
      />
      <button
        onClick={() => {
          setDark((prevDark) => !prevDark);
        }}
      >
        Toggle Theme
      </button>
      <List getItems={getItems} />
    </div>
  );
}
