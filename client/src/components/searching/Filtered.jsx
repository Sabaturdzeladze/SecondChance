import React, { Component } from "react";
import axios from "axios";

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
        .catch(err => console.log(err));
    }
  }

  render() {
    return this.state.array.length && <h1>{this.state.array[0].gender}</h1>;
  }
}

export default Filtered;
