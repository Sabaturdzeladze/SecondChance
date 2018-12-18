import React, { Component } from "react";
import axios from "axios";
import FilteredItem from "./FilteredItem";
import Spinner from "../common/Spinner";

class Filtered extends Component {
  state = {
    array: [],
    url: "",
    loading: true
  };

  componentDidMount() {
    this.setState(() => ({ loading: true, notFound: false }));
    const url = this.props.location.search;

    axios
      .get(`http://localhost:5000/api/products/search/all${url}`)
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
        .get(`http://localhost:5000/api/products/search/all${url}`)
        .then(res => {
          this.setState({ array: res.data, url, loading: false });
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
    return array.length === 0 || loading ? (
      loading === false && array.length === 0 ? (
        <h2>No Items found</h2>
      ) : (
        <Spinner />
      )
    ) : (
      <div className="row productsDisplay">
        {array.map((item, index) => (
          <FilteredItem key={index} {...item} />
        ))}
      </div>
    );
  }
}

export default Filtered;
