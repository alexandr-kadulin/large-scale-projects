import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ProductProvider } from "./context";
import "./index.css";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ProductProvider>
        <Router>
          <App />
        </Router>
      </ProductProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
