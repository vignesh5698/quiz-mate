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
      </div>
    );
  }
}
 
export default Result;