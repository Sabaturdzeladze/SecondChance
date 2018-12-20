import React from "react";
import Stars from "./Stars";
import { Consumer } from "../../context-api/Context";

export class UserReview extends React.Component {
  state = {
    stars: []
  };
  componentDidMount() {
    let stars = [];
    for (let i = 0; i < this.props.star; i++) {
      // imitating array to display the right amount of stars
      stars = [...stars, ""];
    }
    this.setState(() => ({ stars }));
  }
  render() {
    const { username, reviewText/* , userId  */} = this.props;
    return (
      <Consumer>
        {value => {
          return (
            <div
              className="row"
              style={{ borderBottom: "1px solid #c3c3c3", padding: "20px" }}
            >
              <div className="col-md-2">
                <a href="profile.html">
                  <img
                    className="rounded-circle d-none d-md-block"
                    src="data:image/png;base64,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"
                    alt="User"
                  />
                </a>
                <br />
                <p className="text-center">
                  <strong>{username}</strong>
                </p>
              </div>
              <div
                className="col-md-10"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "space-evenly"
                }}
              >
                <p className="lead" style={{ width: "100%" }}>
                  {reviewText}
                </p>
                {<Stars stars={this.state.stars} />}

                {/* {userId === value.user.id && (
                  <button type="button" className="btn btn-danger ml-20">
                    <i className="fas fa-times" />
                  </button>
                )} */}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
