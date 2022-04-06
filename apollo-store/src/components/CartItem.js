import React, { Component } from "react";
import Price from "./Price";
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import SingleAttribute from "./SingleAttribute";

class CartItem extends Component {
  displayChevron = (gallery, id) => {
    return (
      gallery.length > 1 && (
        <>
          <button
            className="prev"
            onClick={() => this.props.handlePictureIndex(id, "prev")}
          >
            <FiChevronLeft />
          </button>
          <button
            className="next"
            onClick={() => this.props.handlePictureIndex(id, "next")}
          >
            <FiChevronRight />
          </button>
        </>
      )
    );
  };

  render() {
    const {
      name,
      brand,
      id,
      prices,
      gallery,
      count,
      selectedAttributes,
      attributes,
      pictureIndex,
    } = this.props.item;

    return (
      <article className="cart-center">
        <div className="cart">
          <div className="product-title">
            <h3>{brand}</h3>
            <h3 className="product-subtitle">{name}</h3>
          </div>
          <div className="price">
            <h5>price :</h5>
            <Price prices={prices} mainCurrency={this.props.mainCurrency} />
          </div>
          <div className="size-center">
            <div className="product-description">
              {attributes.map((attribute, index) => {
                return (
                  <SingleAttribute
                    key={attribute.id + index}
                    attribute={attribute}
                    component={"CartItem"}
                    dimension={this.props.dimension}
                    selectedAttributes={selectedAttributes}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="cart amount-center">
          <div className="cart-icon" onClick={() => this.props.removeItem(id)}>
            <FaTrash />
          </div>
          <div className="amount">
            <button
              type="button"
              className="btn btn-inc"
              onClick={() => this.props.handleCount(id, "inc")}
            >
              <BsPlusLg />
            </button>
            <span>{count}</span>
            <button
              type="button"
              className="btn btn-dec"
              onClick={() => this.props.handleCount(id, "dec")}
            >
              <BsDashLg />
            </button>
          </div>
          <div className="product-img-container">
            <img src={gallery[pictureIndex]} alt="product" className="img" />
            {this.displayChevron(gallery, id)}
          </div>
        </div>
      </article>
    );
  }
}

export default CartItem;
