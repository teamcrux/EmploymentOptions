import React from 'react';

class SearchTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    }

    //console.log("inside search tasks", "/api/task/"+this.props.jobCode);
    fetch("/api/task/"+this.props.jobCode, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+localStorage.getItem("token")
      },
      method: 'GET',
    })
    .then(res => res.json())
    .then(responseJson => {
      //console.log(responseJson);
      this.setState({
        tasks: responseJson,
      })
    });
  };

  render () {
    const taskList = this.state.tasks.map(item => (
      <div>
        <label>
          <input type="checkbox" id={item.id} value={item.description} onChange={this.props.addTasks}/>
          {item.description}
        </label>
      </div>
    ));

    return (
      <div>
        <h3> Select Tasks </h3>
        <form onSubmit={this.handleSubmit}>
          {taskList}
        </form>
      </div>
    );
  };
}

export default SearchTasks
