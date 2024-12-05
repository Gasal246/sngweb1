import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from 'react-redux';

import store from "./store";
import App from "./App";

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
