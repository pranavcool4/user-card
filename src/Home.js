import React, { Component} from "react";

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { history } =  this.props;
    return(
      <div>
        <button className="btn-sweet" onClick={() => history.push('completeids')}>
        Complete IDs
        </button>
        <button className="btn-sweet" onClick={() => history.push('incompleteids')}>
        Incomplete IDs
        </button>
      </div>
    )
  }
}

export default Home;