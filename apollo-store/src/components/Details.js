import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { ProductConsumer } from "../context";
import { PRODUCT_QUERY } from "../queries/queries";
import SingleAttribute from "./SingleAttribute";
import Price from "./Price";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readMore: false,
      selectedAttributes: [],
      selectedPicture: null,
    };
  }

  setAttributes = (name, value, type, id) => {
    const index = this.state.selectedAttributes.findIndex(
      (item) => item.name === name
    );
    if (index === -1) {
      const newAttribute = { name, value, type, id };
      this.setState(() => {
        return {
          selectedAttributes: [...this.state.selectedAttributes, newAttribute],
        };
      });
    } else {
      const tempAttributes = [...this.state.selectedAttributes];
      const selectedAttribute = tempAttributes.find(
        (attribute) => attribute.name === name
      );
      selectedAttribute.value = value;
      this.setState(() => {
        return { selectedAttributes: [...tempAttributes] };
      });
    }
  };

  displaySmallPictures = (gallery, id) => {
    return (
      gallery.length > 1 &&
      gallery.slice(0, 3).map((source, index) => {
        return (
          <img
            key={id + index}
            src={source}
            alt="product"
            className="img"
            onClick={() => this.setState({ selectedPicture: source })}
          />
        );
      })
    );
  };

  displayMainPicture = (gallery) => {
    return (
      <img
        src={
          gallery.length > 1
            ? this.state.selectedPicture
              ? this.state.selectedPicture
              : gallery[0]
            : gallery[0]
        }
        alt="product"
        className="img"
      />
    );
  };

  checkReadMore = (description) => {
    return this.state.readMore ? (
      <div
        className="description-center"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    ) : (
      <div
        className="description-center"
        dangerouslySetInnerHTML={{
          __html:
            description.substring(0, 300) +
            `${description.length > 300 ? " ..." : ""}`,
        }}
      />
    );
  };

  toggleReadMore = (description) => {
    return (
      description.length > 300 && (
        <button
          className="read-more-btn"
          type="button"
          onClick={() => this.setState({ readMore: !this.state.readMore })}
        >
          {this.state.readMore ? "show less" : "read more"}
        </button>
      )
    );
  };

  render() {
    if (this.props.data.loading) {
      return <div className="loading"></div>;
    }
    const {
      gallery,
      name,
      attributes,
      description,
      prices,
      id,
      brand,
      inStock,
    } = this.props.data.product;

    return (
      <ProductConsumer>
        {(value) => {
          const { addToCart, mainCurrency } = value;

          return (
            <section className="product-section">
              <div className="product-center">
                <div className="pictures-center">
                  <div className="small-pictures-container">
                    {this.displaySmallPictures(gallery, id)}
                  </div>
                  <div
                    className={`${
                      inStock
                        ? "main-picture-container"
                        : "main-picture-container card-layout"
                    }`}
                  >
                    {this.displayMainPicture(gallery)}
                    <div
                      className={`${
                        inStock ? "card-text" : "card-text show-card-text"
                      }`}
                    >
                      out of stock
                    </div>
                  </div>
                </div>
                <div className="product-description">
                  <div className="product-title">
                    <h3>{brand}</h3>
                    <h3 className="product-subtitle">{name}</h3>
                  </div>
                  {attributes.map((attribute, index) => {
                    return (
                      <SingleAttribute
                        key={attribute.id + index}
                        attribute={attribute}
                        inStock={inStock}
                        setAttributes={this.setAttributes}
                        selectedAttributes={this.state.selectedAttributes}
                        component={"Details"}
                      />
                    );
                  })}
                  <div className="price">
                    <h5>price :</h5>
                    <Price prices={prices} mainCurrency={mainCurrency} />
                  </div>
                  <button
                    type="button"
                    className={`${
                      inStock ? "btn product-btn" : "btn product-btn disabled"
                    }`}
                    onClick={() => {
                      addToCart(
                        this.props.data.product,
                        this.state.selectedAttributes
                      );
                    }}
                  >
                    add to cart
                  </button>
                  {this.checkReadMore(description)}
                  {this.toggleReadMore(description)}
                </div>
              </div>
            </section>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default graphql(PRODUCT_QUERY, {
  options: (props) => ({ variables: { id: props.match.params.id } }),
})(Details);
