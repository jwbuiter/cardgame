import React, { Component } from "react";
import { connect } from "react-redux";

class PlayArea extends Component {
  render() {
    return <div className="playArea">test</div>;
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(PlayArea);
