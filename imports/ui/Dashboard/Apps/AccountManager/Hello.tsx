import React, { useState, useEffect } from 'react';

export const Hello = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  }

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${counter} times`;
  })

  return (
    <div>
      <button onClick={increment}>Click Me</button>
      <p>You've pressed the button {counter} times.</p>
    </div>
  );
};
