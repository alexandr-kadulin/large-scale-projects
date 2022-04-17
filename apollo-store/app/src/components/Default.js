import React, { Component } from "react";

class Default extends Component {
  render() {
    return (
      <section className="default">
        <h1>
          <strong>404</strong> error
        </h1>
        <h2>page not found</h2>
        <h3>
          the requested URL{" "}
          <span className="text-danger">{this.props.location.pathname}</span>{" "}
          was not found
        </h3>
      </section>
    );
  }
}

export default Default;
