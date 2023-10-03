import React, { Component } from 'react';
import TutorialDataService from '../services/tutorial.service';

export default class AddTutorial extends Component {
  constructor(props){  //ทำทันที
    super(props);  // ส่งให้คลาสแม่

    this.onChangeStuName = this.onChangeStuName.bind(this);
    this.onChangeStuSuname = this.onChangeStuSuname.bind(this);
    this.onChangeUnName = this.onChangeUnName.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      stu_name: "",
      stu_suname: "",
      un_name: "",
      stu_status: false,
      submitted: false
    }
  }

  onChangeStuName(e) {
    this.setState({
      stu_name: e.target.value
    });
  }

  onChangeStuSuname(e) {
    this.setState({
      stu_suname: e.target.value
    });
  }

  onChangeUnName(e) {
    this.setState({
      un_name: e.target.value
    });
  }

  saveTutorial() {
    var data = {
      stu_name: this.state.stu_name,
      stu_suname: this.state.stu_suname,
      un_name: this.state.un_name
    };

    TutorialDataService.create(data)
      .then( response => {
        this.setState({
          id: response.data.id,
          stu_name: response.data.stu_name,
          stu_name: response.data.stu_suname,
          un_name: response.data.un_name,
          stu_status: response.data.stu_status,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  newTutorial(){
    this.setState({
      id: null,
      stu_name: "",
      stu_suname: "",
      un_name: "",
      stu_status: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className='submit-form'>
        {this.state.submitted ? (
          <>
            <h4>You submitted successfully</h4>
            <button className='btn btn-success' onClick={this.newTutorial}>Add</button>
          </>
        ) : (
          <>
            <div className='form-group'>
              <label htmlFor='stu_name'>ชื่อ:</label>
              <input type='text' 
                className='form-control' 
                id='stu_name' value={this.state.stu_name}
                onChange={this.onChangeStuName}
                name='stu_name'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='stu_suname'>นามสกุล</label>
              <input type='text' 
                className='form-control' 
                id='stu_suname' value={this.state.stu_suname}
                onChange={this.onChangeStuSuname}
                name='stu_suname'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='un_name'>มหาวิทยาลัย</label>
              <input type='text' 
                className='form-control' 
                id='un_name' value={this.state.un_name}
                onChange={this.onChangeUnName}
                name='un_name'
                required />
            </div>

            <button onClick={this.saveTutorial} 
              className='btn btn-success'>
                Submit
            </button>
          </>
        )}
      </div>
    )
  }
}
