import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import ContactService from '../services/contact-service';

class Contact extends React.Component {
  state = {
    contact: null,
    isEditable: true
  };

  constructor(props) {
    super(props);
    this.contactService = new ContactService(props.token);
  }

  async componentDidUpdate(prevProps) {
    if (!this.props.contact || this.props.contact === prevProps.contact) return;
    const res = await this.contactService.getOneContact(this.props.contact._id);
    this.setState({ contact: res.res });
  }

  render() {
    const { contact, isEditable } = this.state;
    if (!contact)
      return (
        <div className="progress">
          <div
            className="progress-bar bg-danger progress-bar-striped progress-bar-animated"
            style={{ width: 100 + '%' }}
          />
        </div>
      );
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="form-group col-sm-6">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="first name not provided"
              disabled={isEditable}
              className="form-control"
              value={contact.firstName}
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="last name not provided"
              disabled={isEditable}
              className="form-control"
              value={contact.lastName}
            />
          </div>
          <div className="form-group col-sm-12">
            <label htmlFor="lastName">Phone Numbers</label>
            <input
              type="text"
              name="phone"
              placeholder="phone number not provided"
              disabled={isEditable}
              className="form-control"
              value={contact.phone.map(c => ' ' + c + ' ')}
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="firstName">E-mail</label>
            <input
              type="text"
              name="email"
              disabled={isEditable}
              className="form-control"
              placeholder="Email not provided"
              value={contact.email}
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="profcian">Profcian</label>
            <input
              type="text"
              name="profcian"
              disabled={isEditable}
              className="form-control"
              placeholder="Profcian not provided"
              value={contact.profasion}
            />
          </div>
          <div className="form-group col-sm-12">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address not provided"
              disabled={isEditable}
              className="form-control"
              value={contact.address}
            />
          </div>
          <div className="form-group col-sm-12">
            <label htmlFor="description">Decription</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Description not provided"
              disabled={isEditable}
              defaultValue={contact.description}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, contacts }) {
  return {
    token: auth.token,
    contact: contacts.contact
  };
}

export default connect(mapStateToProps)(Contact);
