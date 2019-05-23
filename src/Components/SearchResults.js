import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from 'moment';

import * as actions from "../Actions/Index";
import { Collapse } from "reactstrap";

class SearchResults extends Component {
  static propTypes = {
    //   isFetching: PropTypes.string.isRequired,
    //   games: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      from: undefined,
      to: undefined,
      fromLoc: "",
      toLoc: "",
      searchInput: ""
    };
  }

  componentDidMount() {}

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleSearchClick = () => {};

  showFromMonth = () => {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  };
  handleFromChange = from => {
    // Change the from date and focus the "to" input field
    console.log(from);
    this.setState({ from });
  };
  handleToChange = to => {
    console.log(to);
    this.setState({ to }, this.showFromMonth);
  };

  handleInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    let searchResults = (
      <div>
        <div class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
          <div class="tc">
            <img
              src="http://tachyons.io/img/avatar_1.jpg"
              class="br-100 h3 w3 dib"
              title="Service Provider"
            />
            <h1 class="f5">Wang</h1>
            <hr class="mw3 bb bw1 b--black-10" />
          </div>
          <h1 class="f4">Destination:Stockholm</h1>
          <h1 class="f4">Flight Time:2019-05-31</h1>
          <Link to="/Chat">
            <button className="f6 link dim br1 ba ph3 pv2 mb2 dib black">
              Contact
            </button>
          </Link>
          <Link to="/OrderPayment">
            <button className="f6 link dim br1 ba ph3 pv2 mb2 dib black">
              Pay
            </button>
          </Link>
        </div>
        <div class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
          <div class="tc">
            <img
              src="http://tachyons.io/img/avatar_1.jpg"
              class="br-100 h3 w3 dib"
              title="Service Provider"
            />
            <h1 class="f5">Anki Song</h1>
            <hr class="mw3 bb bw1 b--black-10" />
          </div>
          <h1 class="f4">Destination:Stockholm</h1>
          <h1 class="f4">Flight Time:2019-06-01</h1>
          <Link to="/Chat">
            <button className="f6 link dim br1 ba ph3 pv2 mb2 dib black">
              Contact
            </button>
          </Link>
          <Link to="/OrderPayment">
            <button className="f6 link dim br1 ba ph3 pv2 mb2 dib black">
              Pay
            </button>
          </Link>
        </div>
      </div>
    );

    return (
      <div className="avenir">
        <div className="mt4">
          <em>Search Results</em>
          {searchResults}
        </div>
      </div>
    );
  }
}

export default SearchResults;
