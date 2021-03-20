import React from 'react'
import axios from 'axios'

export default class StudentComponent extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        pages: []
      }
    }

    componentDidMount() {
        this.getStudent()
        this.pagingTable();
    }

    getStudent() {
        axios
        .get('http://128.199.232.207:3001/api/student')
        .then(response => response.data)
        .then(data => {
            this.setState(
              {
                pages: data
              }
            )
            this.clearState()
        })
        .catch(error => {
            console.log(error)
        })
    }

    pagingTable() {
      const script = document.createElement("script")
      script.src = 'js/content.js'
      script.async = false;
      

      setTimeout(() => {
        document.body.appendChild(script)
      },600)
    }

    //Submit
    handleSubmit = async(event) => {
      event.preventDefault();
      let inputName = false;
      let inputLastname = false;

      if (this.state.student_name == null || this.state.student_name == ''){
        this.setState({errorName: "Please input Student Name"})
        inputName = true;
      } else {
        this.setState({errorName: ''})
      }

      if (this.state.student_lastname == null || this.state.student_lastname == ''){
        this.setState({errorLastname: "Please input Student Lastname"})
        inputLastname = true
      } else {
        this.setState({errorLastname: ''})
      }

      if (inputName == true || inputLastname == true){
        return;
      }

      if(this.state.id == null || this.state.id == '') {
        // Insert
        axios.post('http://128.199.232.207:3001/api/student', this.state)
        .then(response => {
          if(response.status == 200) {
            this.getStudent()
          }
        })
        .catch (error => {
          console.log(error)
        })
      }else
      // Update
      axios.put('http://128.199.232.207:3001/api/student/'+ this.state.id, this.state)
        .then(response => {
          if(response.status == 200) {
            this.getStudent();
          }
        })
        .catch (error => {
          console.log(error)
        })
    }

    //Search
    handleSearchClick = (id) => () => {
      axios.get('http://128.199.232.207:3001/api/student/'+ id, this.state)
        .then(response => {
          if(response.status == 200) {
            this.setState({
              id: id,
              student_name: response.data.student_name,
              student_lastname: response.data.student_lastname,
            })
          }
        })
        .catch (error => {
          console.log(error)
        })
    }

    //Delete
    handleDeleteClick = (id) => () => {
      axios.delete('http://128.199.232.207:3001/api/student/'+ id)
      .then(response => {
        if(response.status == 200) {
          setTimeout(() => {
            this.getStudent();
          })
        }
      })
      .catch (error => {
        console.log(error)
      })
  }
    clearState(){
      this.setState({
        id: '',
        student_name: '',
        student_lastname: '',
        errorName: '',
        errorLastname: ''
      })
    }

    render() {
        return (
            <div className="content-wrapper">
                 
                {/* general form elements */}
<div className="card card-primary">
  <div className="card-header">
    <h3 className="card-title">Student Data</h3>
  </div>
  {/* /.card-header */}
  {/* form start */}
  <form role="form" onSubmit={this.handleSubmit} >
    <div className="card-body">
      <div className="form-group">
        <label>Student Name</label>
        <input type="input" className="form-control" id="inputName" 
        value={this.state.student_name || ''}
        onChange={event => this.setState({student_name: event.target.value, errorName: ''})}
        placeholder="Student name" />
        <span class="message_error">{this.state.errorName}</span>
      </div>
      <div className="form-group">
        <label>Student Lastname</label>
        <input type="input" className="form-control" id="inputLastname" 
        value={this.state.student_lastname || ''}
        onChange={event => this.setState({student_lastname: event.target.value, errorLastname: ''})}
        placeholder="Student lastname" />
        <span class="message_error">{this.state.errorLastname}</span>
      </div>
    </div>
    {/* /.card-body */}
    <div className="card-footer">
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  </form>
</div>
{/* /.card */}


<div class="card">
  <div class="card-header">
    <h3 class="card-title">DataTable with default features</h3>
  </div>  
<div className="card-body">
  <table id="example1" className="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Id</th>
        <th>Student name</th>
        <th>Student lastname</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {this.state.pages.map(page => (
        <tr>
          <td><div onClick={this.handleSearchClick(page._id)} style={{color:'#185c77', cursor:'pointer'}}>{page._id}</div></td>
          <td>{page.student_name}</td>
          <td>{page.student_lastname}</td>
          <td><button type="button" onClick={this.handleDeleteClick(page._id)} class="btn btn-danger btn-flat btn-sm"><i class="far fa-trash-alt">&nbsp; Delete</i></button></td>
        </tr>
      ))}
    </tbody>
    {/*<tfoot>
      <tr>
        <th>Id</th>
        <th>Student name</th>
        <th>Student lastname</th>
      </tr>
      </tfoot>*/}
  </table>
</div>

</div>

            </div>
        )
    }
}
