import React, { Component } from "react";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.getCartLocalStorage(),
      modalOpen: false,
      bagModalOpen: false,
      currencyModalOpen: false,
      modalProduct: {},
      cartTotal: 0,
      totalAmount: 0,
      mainCurrency: this.getCurrencyLocalStorage(),
    };
  }

  componentDidMount() {
    this.addTotal();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cart !== this.state.cart) {
      localStorage.setItem("cart", JSON.stringify(this.state.cart));
    }
    if (prevState.mainCurrency !== this.state.mainCurrency) {
      localStorage.setItem("currency", JSON.stringify(this.state.mainCurrency));
    }
  }

  getCartLocalStorage = () => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      return [];
    }
  };

  getCurrencyLocalStorage = () => {
    let currency = localStorage.getItem("currency");
    if (currency) {
      return JSON.parse(localStorage.getItem("currency"));
    } else {
      return "$";
    }
  };

  addToCart = (product, attributes = []) => {
    const index = this.state.cart.findIndex((item) => item.id === product.id);

    if (index === -1) {
      const newProduct = { ...product };
      newProduct.selectedAttributes = attributes;
      newProduct.count = 1;
      newProduct.pictureIndex = 0;
      const price =
        product.prices[
          product.prices.findIndex(
            (price) => price.currency.symbol === this.state.mainCurrency
          )
        ].amount;
      newProduct.total = price;

      this.setState(
        () => {
          return { cart: [...this.state.cart, newProduct] };
        },
        () => {
          this.addTotal();
        }
      );
    } else {
      const tempCart = [...this.state.cart];
      const selectedItem = tempCart.find((item) => item.id === product.id);
      selectedItem.selectedAttributes = attributes;
      selectedItem.count = selectedItem.count + 1;
      const price =
        product.prices[
          product.prices.findIndex(
            (price) => price.currency.symbol === this.state.mainCurrency
          )
        ].amount;
      selectedItem.total = selectedItem.total + price;

      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotal();
        }
      );
    }
  };

  openModal = (product) => {
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  openAdditionalModal = (value) => {
    if (value === "bag") {
      this.setState(() => {
        return { bagModalOpen: true };
      });
    }
    if (value === "currency") {
      this.setState(() => {
        return { currencyModalOpen: true };
      });
    }
  };

  closeAdditionalModal = (e, value) => {
    if (value === "bag") {
      if (
        e.target.classList.contains("bag-modal-container") ||
        e.target.classList.contains("bag-modal-position") ||
        e.target.innerHTML === "view bag"
      ) {
        this.setState(() => {
          return { bagModalOpen: false };
        });
      }
    }
    if (value === "currency") {
      if (
        e.target.classList.contains("currency-modal-container") ||
        e.target.classList.contains("currency-modal-position") ||
        e.target.classList.contains("currency")
      ) {
        this.setState(() => {
          return { currencyModalOpen: false };
        });
      }
    }
  };

  handleCount = (id, value) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);

    if (value === "inc") {
      selectedProduct.count = selectedProduct.count + 1;
      selectedProduct.total =
        selectedProduct.count *
        selectedProduct.prices[
          selectedProduct.prices.findIndex(
            (price) => price.currency.symbol === this.state.mainCurrency
          )
        ].amount;

      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotal();
        }
      );
    }
    if (value === "dec") {
      selectedProduct.count = selectedProduct.count - 1;

      if (selectedProduct.count === 0) {
        this.removeItem(id);
      } else {
        selectedProduct.total =
          selectedProduct.count *
          selectedProduct.prices[
            selectedProduct.prices.findIndex(
              (price) => price.currency.symbol === this.state.mainCurrency
            )
          ].amount;

        this.setState(
          () => {
            return { cart: [...tempCart] };
          },
          () => {
            this.addTotal();
          }
        );
      }
    }
  };

  handleCurrency = (symbol) => {
    this.setState(
      () => {
        return {
          mainCurrency: symbol,
        };
      },
      () => {
        let tempCart = [...this.state.cart];

        tempCart.forEach((item) => {
          const price =
            item.prices[
              item.prices.findIndex(
                (price) => price.currency.symbol === this.state.mainCurrency
              )
            ].amount;
          item.total = price * item.count;

          this.setState(() => {
            return { cart: [...tempCart] };
          });
        });

        this.addTotal();
      }
    );
  };

  removeItem = (id) => {
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter((item) => item.id !== id);

    this.setState(
      () => {
        return {
          cart: [...tempCart],
        };
      },
      () => {
        this.addTotal();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.addTotal();
      }
    );
  };

  addTotal = () => {
    let total = 0;
    let count = 0;

    this.state.cart.map((item) => (total += item.total));
    this.state.cart.map((item) => (count += item.count));

    this.setState(() => {
      return {
        cartTotal: parseFloat(total.toFixed(2)),
        totalAmount: count,
      };
    });
  };

  checkIndex = (index, id) => {
    const selectedItem = this.state.cart.find((item) => item.id === id);

    if (index > selectedItem.gallery.length - 1) {
      return 0;
    }
    if (index < 0) {
      return selectedItem.gallery.length - 1;
    }

    return index;
  };

  handlePictureIndex = (id, value) => {
    const tempCart = [...this.state.cart];
    const selectedItem = tempCart.find((item) => item.id === id);

    if (value === "next") {
      selectedItem.pictureIndex = this.checkIndex(
        selectedItem.pictureIndex + 1,
        id
      );
    }
    if (value === "prev") {
      selectedItem.pictureIndex = this.checkIndex(
        selectedItem.pictureIndex - 1,
        id
      );
    }

    this.setState(() => {
      return { cart: [...tempCart] };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          clearCart: this.clearCart,
          handleCount: this.handleCount,
          removeItem: this.removeItem,
          handlePictureIndex: this.handlePictureIndex,
          openAdditionalModal: this.openAdditionalModal,
          closeAdditionalModal: this.closeAdditionalModal,
          handleCurrency: this.handleCurrency,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
