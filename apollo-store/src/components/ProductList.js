import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import Product from "./Product";
import { CATEGORY_QUERY } from "../queries/queries";

class ProductList extends Component {
  render() {
    if (this.props.data.loading) {
      return <div className="loading"></div>;
    }
    const { name, products } = this.props.data.category;

    return (
      <section className="category-section">
        <div className="section-title">
          <h2>{name}</h2>
        </div>
        <div className="cards-center">
          {products.map((product, index) => {
            return <Product key={product.id + index} product={product} />;
          })}
        </div>
      </section>
    );
  }
}

export default graphql(CATEGORY_QUERY, {
  options: (props) => ({
    variables: { title: props.match.params.name || "all" },
  }),
})(ProductList);
