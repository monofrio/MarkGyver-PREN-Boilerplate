import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Sample from './Sample'

import { connect } from "react-redux";


class Routes extends Component {

  render() {
    return (
        <Router>
          <Route exact path="/" component={Sample} />
        </Router>
    );
  }
}

const mapDispatch = dispatch => ({})
export default connect(null)(Routes);
