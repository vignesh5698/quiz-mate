import React, { Component } from 'react';
import _ from 'lodash';
import Firebase from "firebase";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const userScore = this.getNumberOfCorrectAnswers();
    const { name, correctAnswers, category, level } = this.props;
    return {
      name: name || 'TEST',
      userScore: userScore,
      totalNoOfQuestions: correctAnswers.length,
      category,
      level,
      scorecard: []
    }
  }

  writeUserData = () => {
    const dateObject = new Date();
    let { name } = this.state;
    Firebase.database()
      .ref(`/${name}/${dateObject}`)
      .set(this.state);
    console.log("DATA SAVED");
  };

  componentDidMount() {
    this.writeUserData();
    this.getUserData();
  }

  getUserData = () => {
    let ref = Firebase.database().ref(`/`);
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState({
        scorecard: state
      });
    });
  }

  getNumberOfCorrectAnswers = () => {
    const { selectedAnswers, correctAnswers } = this.props;
    let numberOfCorrectAnswers = 0;
    _.each(selectedAnswers, (selectedAnswer, index) => {
      return correctAnswers[index] === selectedAnswer ? numberOfCorrectAnswers++ : null;
    });
    return numberOfCorrectAnswers;
  }

  getCorrectAnswerList = (item, index) => {
    const { selectedAnswers } = this.props;
    const selectedClass = selectedAnswers[index] === item ? `success` : `danger`;
    let answerClass = `alert alert-${selectedClass}`;

    return(
      <tr>
        <td className={answerClass}>
            {index+1}.&nbsp;&nbsp;{item}
        </td>
      </tr>
    )
  }

  renderResults = () => {
    const noOfQuestionsCorrect = this.getNumberOfCorrectAnswers();
    const { correctAnswers } = this.props;
    const correctAnswersList = _.map(correctAnswers, (correctAnswer, index) =>
      this.getCorrectAnswerList(correctAnswer, index));
    return(
      <div className="card">
        <div className="card-header">
          <div className="text-info text-center text-uppercase result-head">
              <strong>Quiz Result :&nbsp;</strong> {noOfQuestionsCorrect} / {correctAnswers.length}
          </div>
        </div>
        <div>
          <p className="text-primary ml-2  mt-3 answer-text text-center">Correct Answers</p>
          <table className="table">
            <tbody>
              {correctAnswersList}  
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render() {
    return ( 
      <div>
        {this.renderResults()}
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