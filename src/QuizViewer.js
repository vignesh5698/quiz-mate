import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import Result from './Result';

class QuizViewer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      quizList: [],
      selectedAnswers: [],
      optionsList: [],
      showResult: false,
      isLoadingQuiz: true,
      category: null,
      level: null
    }
  }

  componentDidMount() {
    const { noOfQuestions, category, difficultyLevel } = this.props;
    const getQuizUrl = `https://opentdb.com/api.php?amount=${noOfQuestions}&category=${category}&difficulty=${difficultyLevel}`;
    axios.get(getQuizUrl)
    .then((res) => {
      const quizList = res.data.results;
      const correctAnswers = this.getCorrectAnswers(quizList);
      const optionsList = this.getAllOptions(quizList);
      const category = _.get(quizList, '[0].category');
      const level = _.get(quizList, '[0].difficulty');
      this.setState({ quizList, correctAnswers, optionsList, isLoadingQuiz: false, category, level })
    })
    .catch((err) => {
      console.log(`Error while fetching quiz: ${err}`)
    })
  }

  getAllOptions = (quizList) => {
    let optionsList = []
    _.map(quizList, (quiz) => {
      const correctAnswer = quiz.correct_answer;
      const incorrectAnswers = quiz.incorrect_answers;
      let allOptions = _.shuffle(_.concat(correctAnswer, incorrectAnswers));
      let options = _.map(allOptions, (option) => {
        return { label: this.getParsedString(option), selected: false }
      })
      optionsList.push(options)
    })
    return optionsList;
  }

  getCorrectAnswers = (quizList) => {
    return _.map(quizList, (quiz) => this.getParsedString(quiz.correct_answer))
  }

  getParsedString = (stringToBeParsed) => {
    return stringToBeParsed.replace(/&quot;/g,'"').replace(/&#039;/g,'\'').replace(/&shy;/g,'-');
  }

  onSelectOption = (options, event, questionIndex, optionIndex) => {
    const selectedOption = event.target.value;
    let { selectedAnswers } = this.state;
    let selectedAnswersNew = _.clone(selectedAnswers);
    let optionsNew = _.clone(options);
    selectedAnswersNew[questionIndex] = selectedOption;
    _.each(optionsNew, (option) => {
      option.selected = false;
    });
    optionsNew[optionIndex].selected = true;
    this.setState({ selectedAnswers: selectedAnswersNew, options: optionsNew });
  }

  renderOptions = (options, questionIndex) => {
    return(
      _.map(options, (option, optionIndex) => {
        return(
          <div className="card-footer bg-light">
            <input type="checkbox"
              className='custom-option'
              id={`${option.label}-${questionIndex}`}
              name={option.label} value={option.label}
              checked={option.selected}
              onChange={(event) => this.onSelectOption(options, event, questionIndex, optionIndex)}
              onClick={(event) => this.onSelectOption(options, event, questionIndex, optionIndex)}
            />
            <label htmlFor={`${option.label}-${questionIndex}`}>{option.label}</label>
          </div>
        )
      })
    )
  }

  renderLoadingSpinner = () => {
    return (
      <div className='custom-spinner'>
        <h1>Loading</h1>
        <i className='fa fa-spinner fa-pulse fa-4x fa-fw'></i>
      </div>
    )
  }

  renderQuiz = () => {
    const { quizList, optionsList } = this.state;
    return _.map(quizList, (quiz, questionIndex) => {
      const question = this.getParsedString(quiz['question']);
      return(
        <div className="card" key={questionIndex}>
          <div className="card-body">
            {question}
          </div>
          {this.renderOptions(optionsList[questionIndex], questionIndex)}
        </div>
      )
    })
  }

  onViewResultPage = () => {
    this.setState({ showResult: true })
  }

  renderQuizCard = () => {
    const { selectedAnswers, quizList } = this.state;
    const noOfQuestionAnswered = _.compact(selectedAnswers).length || 0;
    const totalNumberOfQuestions = quizList.length;
    const questionHeader = `( ${noOfQuestionAnswered} / ${totalNumberOfQuestions} )`;
    return (
      <div className="card">
        <div className="card-header">
          <h4>Questions answered {questionHeader}</h4>
        </div>
        <div className="card-body">
          {this.renderQuiz()}        
        </div>
        <div className="card-footer custom-footer">
          <button className='btn btn-outline-primary' onClick={this.onViewResultPage}>
            Submit
          </button>
        </div> 
      </div>
    );
  }

  renderResultPage = () => {
    const { correctAnswers, selectedAnswers, category, level } = this.state;
    const { name } = this.props;
    return <Result correctAnswers={correctAnswers} selectedAnswers={selectedAnswers} name={name} category={category} level={level} />
  }

  render() {
    const { showResult, isLoadingQuiz } = this.state;
    return(
      <div>
        { showResult ? this.renderResultPage() : (
          isLoadingQuiz ?
          this.renderLoadingSpinner() :
          this.renderQuizCard())
        }
        <div className="footer">
          <p>Created with <span> ❤ </span> by <a href="https://vignesh-tech.github.io">Vignesh</a></p>
        </div>
      </div>
    )
  }  
}
 
export default QuizViewer;