import React, { Component } from "react";
import axios from "axios";
import FilteredItem from "./FilteredItem";
import Spinner from "../common/Spinner";
import Filter from "./Filter";
import ProductNotFound from "../common/ProductNotFound";

class Filtered extends Component {
  state = {
    array: [],
    url: "",
    loading: true
  };

  stateChange = state => {
    this.setState(state);
  };

  componentDidMount() {
    this.setState(() => ({ loading: true, notFound: false }));
    const url = this.props.location.search;
    axios
      .get(`/api/products/search/all${url}`)
      .then(res => {
        this.setState({ array: res.data, url, loading: false });
      })
      .catch(err => {
        this.setState(() => ({ url, loading: false }));
      });
  }

  componentDidUpdate() {
    const url = this.props.location.search;
    
    if (this.state.url !== url) {
      axios
        .get(`/api/products/search/all${url}`)
        .then(res => {
          this.setState({ array: res.data, loading: false });
        })
        .catch(err => {
          this.setState(() => ({
            array: [],
            url,
            loading: false
          }));
        });
    }
  }

  render() {
    const { array, loading } = this.state;
    return (
      <>
        <Filter
          history={this.props.history}
          location={this.props.location}
          stateChange={this.stateChange}
          array={this.state.array}
        />
        {array.length === 0 || loading ? (
          loading === false && array.length === 0 ? (
            // <h2>No Items found</h2>
            <ProductNotFound />
          ) : (
            <Spinner />
          )
        ) : (
          <main className="row productsDisplay">
            {array.map((item, index) => (
              <FilteredItem key={index} {...item} />
            ))}
          </main>
        )}
      </>
    );
  }
}

export default Filtered;
