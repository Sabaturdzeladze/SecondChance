import React, { Component } from "react";
import axios from "axios";
import { UserReview } from "./UserReview";

export default class Reviews extends Component {
  state = {
    reviews: [],
    average: 0
  };

  componentDidMount() {
    axios
      .get("/api/admin/reviews")
      .then(res => {
        let sum = 0;
        let average = 0;
        let reviews = res.data;
        reviews.forEach(review => {
          sum += review.star;
        });
        average = sum / reviews.length;
        this.setState({ reviews, average });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="posts" style={{ width: "80%", margin: "0 auto" }}>
              <h2 style={{ textAlign: "center", paddingTop: "20px" }}>
                Average Rating - <strong>
                {this.state.average > 4.5 && <span><i className="fas fa-star"/><i className="fas fa-star"/><i className="fas fa-star"/><i className="fas fa-star"/><i className="fas fa-star"/></span>}
                {this.state.average >= 3.5 && this.state.average < 4.5 && <span><i className="fas fa-star"/><i className="fas fa-star"/><i className="fas fa-star"/><i className="fas fa-star"/></span>}
                {this.state.average >= 2.5 && this.state.average < 3.5 && <span><i className="fas fa-star"/><i className="fas fa-star"/><i className="fas fa-star"/></span>}
                {this.state.average >= 1.5 && this.state.average < 2.5 && <span><i className="fas fa-star"/><i className="fas fa-star"/></span>}
                {this.state.average >= 0.5 && this.state.average < 1.5 && <span><i className="fas fa-star"/></span>}
                </strong>
              </h2>
              <div
                className="card card-body mb-3"
              >
                {this.state.reviews.map(review => (
                  <UserReview
                    key={review.userId}
                    {...review}
                    average={this.state.average}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
