import React, { Component } from 'react';
import _ from 'lodash';

class Result extends Component {
  render() {
    const { selectedAnswers, correctAnswers } = this.props;
    const noOfQuestionsCorrect = _.intersection(selectedAnswers, correctAnswers).length;
    return ( 
      <div>
        <div className="alert alert-success">
          <h1>
            <strong>Result:&nbsp;</strong> {noOfQuestionsCorrect} / {correctAnswers.length}
          </h1>
        </div>
        <div className='custom-footer'>
          Scoreboard will update soon...
        </div>
        <div className="footer">
          <p>Created with <span> ❤ </span> by <a href="https://vignesh-tech.github.io">Vignesh</a></p>
        </div>
      </div>
    );
  }
}
 
export default Result;