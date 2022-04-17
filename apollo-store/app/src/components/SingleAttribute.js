import React, { Component } from "react";
import CartSingleItem from "./CartSingleItem";
import SingleItem from "./SingleItem";

class SingleAttribute extends Component {
  render() {
    const { name: attributeName, items } = this.props.attribute;

    return (
      <div className="attributes-control">
        <h5>{attributeName} :</h5>
        <div className="attributes-center">
          {items.map((item, index) => {
            return this.props.component === "Details" ? (
              <SingleItem
                key={item.id + index}
                item={item}
                attribute={this.props.attribute}
                inStock={this.props.inStock}
                setAttributes={this.props.setAttributes}
                selectedAttributes={this.props.selectedAttributes}
              />
            ) : (
              <CartSingleItem
                key={item.id + index}
                index={index}
                item={item}
                attribute={this.props.attribute}
                dimension={this.props.dimension}
                selectedAttributes={this.props.selectedAttributes}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default SingleAttribute;
