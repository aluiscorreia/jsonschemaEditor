import React from "react";
import ReactDOM from "react-dom";
import Form from "./form";

/* based on https://codesandbox.io/s/ccnxm?file=/src/form.jsx
*/
function App() {
  return <Form onSubmit={values => alert(JSON.stringify(values))} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);