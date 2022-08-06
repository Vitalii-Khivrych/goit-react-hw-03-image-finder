import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.query);
    this.setState({
      query: '',
    });
  };

  render() {
    const { query } = this.state;

    return (
      <header className="searchBar" onSubmit={this.handleSubmit}>
        <form className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
