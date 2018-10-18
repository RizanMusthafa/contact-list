import React from 'react';
import { connect } from 'react-redux';
import ContactService from '../services/contact-service';

class Contact extends React.Component {
  emptyContact = () => ({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: [],
    description: '',
    profasion: ''
  });

  state = {
    contact: this.emptyContact(),
    isEditable: false
  };

  constructor(props) {
    super(props);
    this.contactService = new ContactService(props.token);
  }

  async getAndSetContact() {
    this.setState({ isEditable: false });
    const { res } = await this.contactService.getOneContact(
      this.props.contact._id
    );
    const newContact = {
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
      address: res.address,
      phone: res.phone,
      description: res.description,
      profasion: res.profasion
    };
    this.setState({ contact: newContact });
  }

  async componentDidUpdate(prevProps) {
    if (!this.props.contact || this.props.contact === prevProps.contact) return;
    await this.getAndSetContact();
  }

  handleEditBtn = async () => {
    if (!this.state.isEditable) this.setState({ isEditable: true });
    else await this.getAndSetContact();
  };

  render() {
    const { contact, isEditable } = this.state;
    if (!contact)
      return (
        <div className="alert alert-warning">
          <p>You did not select a contact to show</p>
        </div>
      );
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 text-right">
            <button
              onClick={this.handleEditBtn}
              className="btn btn-sm btn-warning"
            >
              Edit
            </button>
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="first name not provided"
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
              className="form-control"
              value={contact.phone}
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="firstName">E-mail</label>
            <input
              type="text"
              name="email"
              disabled={!isEditable}
              className="form-control"
              placeholder="Email not provided"
              value={contact.email}
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="profcian">Profcian</label>
            <input
              type="text"
              name="profasion"
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
