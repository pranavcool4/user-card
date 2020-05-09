import React, { Component} from "react";
import "./styles.css";
import { hot } from "react-hot-loader";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import UserList from './Complete';
import HomePage from './Home';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      completeData: [],
      inCompleteData: []
    };
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=50&exc=location,login,dob,registered")
      .then(res => res.json())
      .then(res => this.setState({ completeData: this.formatPhone(res.results) }));
    fetch("https://randomuser.me/api/?results=50&exc=location,login,dob,registered,picture")
      .then(res => res.json())
      .then(res => this.setState({ inCompleteData: this.formatPhone(res.results) }));
  }

  formatPhone(results) {
    results.forEach(function (obj){
      obj.phone = obj.phone.replace(/[\(\)-]+/g,'');
    });
    return results;
  }

  deleteUser(idx,key) {
    console.log(idx,key);
    const data = this.state[key];
    data.splice(idx,1);
    this.setState({ [key]: data });
  }

  editUser(idx,values,key) {
    const data = this.state[key];
    data[idx] = { ...data[idx], ...values };
    this.setState({ data });
  }

  render(){
    const { completeData, inCompleteData } = this.state;
    return(
      <Router>
        <Route exact path="/" component={HomePage}/>
        <Route path="/completeids" exact component={(props) => 
          <UserList 
            {...props} 
            data={completeData} 
            deleteUser={(idx)=>this.deleteUser(idx,'completeData')} 
            editUser={(idx,values)=>this.editUser(idx,values,'completeData')}/>}
          />
        <Route path="/incompleteids" component={(props) => 
          <UserList 
            {...props} 
            data={inCompleteData} 
            deleteUser={(idx)=>this.deleteUser(idx,'inCompleteData')} 
            editUser={(idx,values)=>this.editUser(idx,values,'inCompleteData')}
          />}/>
      </Router>
    );
  }
}

export default hot(module)(App);