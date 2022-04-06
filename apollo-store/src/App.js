import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Details from "./components/Details";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import BagModal from "./components/BagModal";
import CurrencyModal from "./components/CurrencyModal";

class App extends Component {
  render() {
    return (
      <div className="section-center">
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route
            exact
            path="/category/:name"
            render={(props) => <ProductList {...props} />}
          />
          <Route
            exact
            path="/product/:id"
            render={(props) => <Details {...props} />}
          />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
        <Modal />
        <BagModal />
        <CurrencyModal />
      </div>
    );
  }
}

export default App;
