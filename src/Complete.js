import React, { Component} from "react";
import UserCard from './Card';

class Complete extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const { data, deleteUser, editUser, title } = this.props;
    console.log(title);
    return(
      <div className="container">
        <h1>{title}</h1>
        <div className="row">
          {data.map((item,index) =><UserCard key={index} item={item} deleteUser={()=>deleteUser(index)} editUser={(values)=>editUser(index,values)}/>)}
        </div>
      </div>
    );
  }
}

export default Complete;