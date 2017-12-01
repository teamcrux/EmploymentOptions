import React from 'react';
import {Field, reduxForm} from 'redux-form';

class SearchJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobArr:[],
      searchResults: [],
      displayResults: false,
      noResults: false,
    }
    this.jobSearch = this.jobSearch.bind(this);

    fetch("/api/occupation", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+localStorage.getItem("token")
      },
      method: 'GET',
    })
    .then(res => res.json())
    .then(responseJson => {
      this.setState({
        jobArr: responseJson,
      })
    })
  };

  jobSearch(searchTerm) {
    this.setState({
      noResults: false,
      displayResults: false,
    });
    var arr = this.state.jobArr.filter(job => {
      if (job.title === searchTerm.job) {
        return job;
      }
    });
    if (arr.length === 0) {
      this.setState({
        noResults: true,
      });
    }
    else {
      this.setState({
        searchResults: arr,
        displayResults: true,
      })}
  };

  render () {
    const {handleSubmit, pristine, submitting } = this.props;
    const searchForm = (
      <form onSubmit={handleSubmit(this.jobSearch)}>
        <Field name="job" component="input" type="text"/>
        <div>
          <button className="submit-button" type="submit" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    );

    const resultsTable = (
      <thead>
        <tr>
          <td> Search Results </td>
        </tr>
        <tr>
          <td> Title </td>
          <td> Description </td>
        </tr>
      </thead>
    );

    const searchList = this.state.searchResults.map(item => (
      <tr>
        <td> {item.title} </td>
        <td> {item.description} </td>
        <td> <button onClick = {(e) => this.props.fetchTasks(item)}> Select </button> </td>
      </tr>
    ));

    return (
      <div>
        {searchForm}
        <div className="clients-table">
          <table>
            {this.state.displayResults && resultsTable}
            <tbody id="client-table-body">
              {this.state.displayResults && searchList}
            </tbody>
          </table>
          {this.state.noResults && <h4> Sorry No Results. Try a different search term or add a new job manually</h4>}
        </div>
      </div>
    );
  }
}

export default reduxForm({
	form: 'SearchJob'
})(SearchJob);
