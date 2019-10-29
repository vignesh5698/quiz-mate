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
    let { name } = this.state;
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
    return _.intersection(selectedAnswers, correctAnswers).length;
  }

  render() {
    console.log(this.state.scorecard);
    const { correctAnswers } = this.props;
    const noOfQuestionsCorrect = this.getNumberOfCorrectAnswers();
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