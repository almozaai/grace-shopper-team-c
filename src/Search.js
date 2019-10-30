import React from "react";
import { connect } from "react-redux";
import Products from "./Products";

class _Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchItems: [],
      input: ""
    };
  }
  startSearch(e) {
    const searchItems = this.props.products.filter(product =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    this.setState({ searchItems, input: e.target.value });
  }

  render() {
    const { searchItems, input } = this.state;

    return (
      <div>
        <form>
          <input
            type="text"
            name="search"
            className="search"
            onKeyUp={e => this.startSearch(e)}
          />
        </form>
        <div className="ordering">
          {searchItems.length === 0 && !input ? (
            <Products />
          ) : (
            searchItems.map(product => (
              <div key={product.id} className="border">
                {product.name}
                <br />${product.price}
                <br />
                <button>Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

const Search = connect(({ products }) => {
  return {
    products
  };
})(_Search);

export default Search;
