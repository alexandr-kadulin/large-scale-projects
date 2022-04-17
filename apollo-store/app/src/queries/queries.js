import { gql } from "@apollo/client";

export const CURRENCIES_QUERY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      brand
      inStock
      description
      gallery
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query {
    categories {
      name
    }
  }
`;

export const CATEGORY_QUERY = gql`
  query ($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        brand
        gallery
        inStock
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
