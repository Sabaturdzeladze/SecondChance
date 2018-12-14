import React, { Component } from "react";
import axios from "axios";
import { FilteredItem } from "./FilteredItem";

class Filtered extends Component {
  state = {
    array: [],
    url: ""
  };

  componentDidMount() {
    const url = this.props.location.search;
    axios
      .get(`http://localhost:5000/api/products/search/all${url}`)
      .then(res => {
        console.log(res.data);
        this.setState({ array: res.data, url });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    const url = this.props.location.search;

    if (this.state.url !== url) {
      axios
        .get(`http://localhost:5000/api/products/search/all${url}`)
        .then(res => {
          console.log(res.data);
          this.setState({ array: res.data, url });
        })
        .catch(err => {
          this.setState({array: []})
        });
    }
  }

  render() {
    const { array } = this.state;
    return array.length === 0 ? (
      <h2>No Items found</h2>
    ) : (
      <div className="row productsDisplay">
        {array.map((item, index) => (
          <FilteredItem
            key={index}
            {...item}
            // gender={item.gender}
            // category={item.category}
            // subCategory={item.subCategory}
          />
        ))}
      </div>
    );
  }
}

export default Filtered;
