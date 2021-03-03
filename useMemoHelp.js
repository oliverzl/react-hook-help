//because of the slow function below, even setDark is slow. setDark is slow because, setNumber triggers a full re-render of the app, which means that setDark is also affected, when it shouldn't be slow.

//the fix here is useMemo. we useMemo with the doubleMaker, and now when we change the theme, it is fast, compared to setNumber function call.

//what happens here now is, when we click change theme, we trigger the re-render because we change the 'dark' state. however, now because of useMemo, when we reach the doubleNumber const, we leave it alone, because the number state, which is in the useMemo dependancy array DID NOT CHANGE, so we don't recall the slowFunction.

//WARNING: useMemo shouldnt be used every single time, because we are saving the value of number to a block of memory, and we shouldnt do it everywhere in our application.

//useMemo also has another use case: referential equality: when we compare objects and arrays, we dont compare them LITERALLY, but we compare their reference.
//the value of two objects can be equal to each other, but the ACTUAL object is not equal because the reference is not the same.

import React, { useState, useEffect, useMemo } from "react";

export default function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);

  //with this useEffect, we demonstrate the referential equality. even though this useEffect should only run with any change of themeStyles, every single time we add/subtract: setNumber, we still have the console.log('theme changed'), BECAUSE in the app itself themeStyles object is created, and the App will always create a new themeStyles object when it re-renders.

  //to solve this problem, we can wrap themeStyles in a useMemo
  useEffect(() => {
    console.log("theme changed");
  }, [themeStyles]);

  return (
    <>
      <input
        type='number'
        value={number}
        onChange={(event) => setNumber(parseInt(event.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Change theme
      </button>
      <div style={themeStyles}>{doubleNumber}</div>
    </>
  );
}

function slowFunction(num) {
  console.log("Calling the very slow function");

  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2;
}
