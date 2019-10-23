import React, { Component } from 'react';
import QuizViewer from './QuizViewer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      noOfQuestions: 5,
      category: 9,
      difficultyLevel: 'easy',
      name: null,
      isQuizViewer: false,
      showAlert: false
    }
  }

  onSelectCategory = (event) => {
    this.setState({ category: event.target.value })
  }

  onSelectNoOfQuestions = (event) => {
    this.setState({ noOfQuestions: event.target.value })
  }

  onSelectDifficultyLevel = (event) => {
    this.setState({ difficultyLevel: event.target.value })
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onChangeToQuizPage = () => {
    const { name } = this.state;
    if(name !== null) {
      this.setState({ isQuizViewer: true })
    } else {
      this.setState({ showAlert: true })
    }
  }

  renderFormIncompleteAlert = () => {
    return(
      <div className="alert alert-danger">
        <strong>Failed!</strong> &nbsp;Please enter the name to continue.
      </div>
    )
  }

  renderHomePage = () => {
    const { showAlert } = this.state;
    return(
      <div>
        <div className="card custom-card">
          <div className="card-header bg-light">
            <h1>Quizzer</h1>          
          </div>
          <div className="card-body">
          <div className="form-group">
            <label>Name:</label>
            <input className="form-control" id="name" onChange={this.onNameChange} placeholder='Enter your name...'></input>
            <label>Select category:</label>
            <select className="form-control" onChange={this.onSelectCategory}>
              <option value='9'>General Knowledge</option>
              <option value='10'>Books</option>
              <option value='18'>Computers</option>
              <option value='21'>Sports</option>
              <option value='22'>Geography</option>
              <option value='23'>History</option>
              <option value='24'>Politics</option>
              <option value='17'>Nature</option>
              <option value='26'>Celebrities</option>
              <option value='27'>Animals</option>
              <option value='28'>Vehicles</option>
            </select>
          </div>
          <div className="form-group">
            <label>Select number of questions:</label>
            <select className="form-control" onChange={this.onSelectNoOfQuestions} >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="form-group">
            <label>Select difficulty level:</label>
            <select className="form-control" onChange={this.onSelectDifficultyLevel}>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>
          </div>
          <div className='custom-button'>
            <button type='button' className='btn  btn-outline-info' onClick={this.onChangeToQuizPage}>Take Quiz</button>
          </div>
          {showAlert ? this.renderFormIncompleteAlert() : null}
        </div>
        
      </div>
    )
  }

  renderQuizPage = () => {
    const state = this.state;
    return <QuizViewer {...state} />
  }

  render() {
    const { isQuizViewer } = this.state;
    return (  
      <div>
        {isQuizViewer ? this.renderQuizPage() : this.renderHomePage()}
        <div className="footer">
          <p>Created with <span> ❤ </span> by <a href="https://vignesh-tech.github.io">Vignesh</a></p>
        </div>
      </div>
    );
  }
}
 
export default Home;