import React, { Component } from 'react';
import TutorialDataService from '../services/tutorial.service';
import { Link } from 'react-router-dom';

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e){
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials(){
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  refreshList(){
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index){
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials(){
    TutorialDataService.deleteAll()
    .then(response => {
      this.refreshList();
    })
    .catch(err => {
      console.log(err);
    });
  }

  searchTitle(){
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {searchTitle, tutorials, currentTutorial, currentIndex} = this.state;

    return (
      <div className='list row'>
        <div className='col-md-8'>
          <div className='input-group mb-3'>
              <input
                type="text"
                className="form-control"
                placeholder="ค้นหาด้วยชื่อ "
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={this.searchTitle}
              >ค้นหา</button>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <h4>Tutorials List</h4>

          <ul className='list-group'>
            {tutorials && tutorials.map((tutorial, index) => (
              <li className={"list-group-item " + (index === currentIndex ? "active" : "")} 
              onClick={() => this.setActiveTutorial(tutorial, index)}
              key={index}>
                {tutorial.title}
              </li>
            ))}
          </ul>

          <button
            className='btn btn-sm btn-danger m-3'
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className='col-md-6'>
              {currentTutorial ? (
              <div>
                <h4>รายละเอียดข้อมูล</h4>
                <div>
                  <label>
                    <strong>ชื่อ :</strong>
                  </label>
                  {" "}
                  {currentTutorial.stu_name}
                </div>
                <div>
                  <label>
                    <strong>นามสกุล :</strong>
                  </label>
                  {" "}
                  {currentTutorial.stu_suname}
                </div>
                <div>
                  <label>
                    <strong>มหาวิทยาลัย :</strong>
                  </label>
                  {" "}
                  {currentTutorial.un_name}
                </div>
                <div>
                  <label>
                    <strong>สถานภาพการศึกษา :</strong>
                  </label>
                  {" "}
                  {currentTutorial.stu_status ? "กำลังศึกษา" : "จบการศึกษา"}
                </div>
              </div>
              ) : (
              <div>
                <br />
                <p>คลิกเพื่อดูรายละเอียด</p>
              </div>
              )}
        </div>
      </div>
    )
  }
}
