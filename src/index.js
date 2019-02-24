import React from 'react';
import PropTypes from 'prop-types';

import './style.sass';

export default class RaterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: null,
      additionalInfo: '',
    };
  }

  render() {
    return (
      <div className="quiz">
        <h5>{this.props.title}</h5>
        <form
          action="/"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <div className="title low">{this.props.titleLow}</div>
          <ul className="ratings">
            {Array.apply(null, {length: this.props.maxRating}).map((_, i) => this.ratingLink(i + 1))}
          </ul>
          <div className="title high">{this.props.titleHigh}</div>

          {this.state.rating !== null && this.additionalInfoInput()}

          <button disabled={this.state.rating === null}>Submit</button>
        </form>
      </div>
    );
  }

  ratingLink(rating) {
    return (
      <li
        className={this.state.rating === rating ? 'current' : null}
        key={rating}
        onClick={() => this.setState({ rating })}
      >
        <span>{rating}</span>
      </li>
    );
  }

  additionalInfoInput() {
    return (
      <React.Fragment>
        <label htmlFor="quiz-additional-info">
          {this.props.additionalInfoLabel}
        </label>
        <input
          id="quiz-additional-info"
          type="text"
          value={this.state.additionalInfo}
          onChange={e => e.preventDefault() || this.setState({ additionalInfo: e.target.value })}
        />
      </React.Fragment>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.rating) {
      return;
    }

    try {
      let URL = `${this.props.formURL}&${this.props.ratingInputName}=${this.state.rating}`;
      if (this.props.additionalInfoInputName && this.state.additionalInfo) {
        URL = URL + `&${this.props.additionalInfoInputName}=${this.state.additionalInfo}`;
      }

      fetch(URL);
    } catch(e) {}
  }
}

RaterForm.defaultProps = {
  maxRating: 5,
  title: 'How would you rate your experience?',
  titleLow: 'Terrible',
  titleHigh: 'Amazing',
  additionalInfoLabel: 'Share something more',
};



RaterForm.propTypes = {
  formURL: PropTypes.string.isRequired,
  maxRating: PropTypes.number.isRequired,
  title: PropTypes.string,
  titleLow: PropTypes.string,
  titleHigh: PropTypes.string,
  labelAdditionalInfo: PropTypes.string,
  ratingInputName: PropTypes.string.isRequired,
  additionalInfoInputName: PropTypes.string.isRequired,
}
