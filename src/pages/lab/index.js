import { useEffect, useState } from "react";

function Lab1() {
  const [variable, updateVariable] = useState(1);

  console.log('execute all component')
  useEffect(() => {
    console.log('print variable: ',variable)
  }, [variable]);

  return <>
    <h1>Lab</h1>
    <p>My variable value: {variable}</p>
    <button onClick={() => updateVariable(variable + 1)}>++</button>
  </>
}

export default Lab1;