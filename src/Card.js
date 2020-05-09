import React, { Component } from "react";
import validator from 'validator';

class UserCard extends Component {
  constructor(props) {
    const { name, email, phone, nat } = props.item;
    super(props);
    this.state = { name, email, phone, nat,
       errors: {}
    };
  }
  
  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  saveUser() {
    const { isEmail , isMobilePhone } = validator;
    const { title, first_name, last_name, email, phone, nat } =  this.state;
    const { editUser } = this.props;
    const errors = {};
    if(!isEmail(email)){
      errors.email = "Invalid Email";
    }
    if(!isMobilePhone(phone)){
      errors.phone = "Invalid Mobile Number";
    }
    this.setState({ errors });
    if(Object.keys(errors).length>0) return;
    editUser(this.state);
    this.toggleEdit();
  }

  handleChange(e,key) {
    this.setState({ [key]: e.target.value });
  }

  render() {
    const { item, deleteUser } = this.props;
    const { edit, name, email, phone,errors } = this.state;
    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="user-list">
          {item.picture && <div className="picture">
            <img className="img-fluid" src={item.picture.large} />
          </div>}
          <div className="team-content">
            <h3 className="name">{Object.values(name).reduce((name, key) => name + ' ' + key, '')}</h3>
            <h4 className="title">Email: {edit ? <input className="input-sm" value={email} type="text" onChange={(e)=>this.handleChange(e,'email')} /> : item.email}</h4>
            <p>{errors.email}</p>
            <h4 className="title">Phone: {edit ? <input className="input-sm" value={phone} type="text" onChange={(e)=>this.handleChange(e,'phone')}/> : item.phone}</h4>
            <p>{errors.phone}</p>
          </div>
          <ul className="bar">
            {edit && <li><a onClick={() => this.saveUser()} className="fa fa-check pointer" aria-hidden="true"></a></li>}
            <li><a onClick={() => this.toggleEdit()} className={(edit?"fa fa-times":"fa fa-edit")+" pointer"} aria-hidden="true"></a></li>
            <li><a onClick={deleteUser} className="fa fa-trash pointer" aria-hidden="true"></a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default UserCard;