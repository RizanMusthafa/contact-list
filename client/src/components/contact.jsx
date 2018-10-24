import React from 'react';
import { connect } from 'react-redux';
import ContactService from '../services/contact-service';
import contactFormValidate from '../form-modals/contact';

class Contact extends React.Component {
  currentContact = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: [],
    description: '',
    profasion: ''
  };

  state = {
    ERR: null,
    contact: this.currentContact,
    isEditable: false,
    errors: null
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
    this.currentContact.firstName = res.firstName || '';
    this.currentContact.lastName = res.lastName || '';
    this.currentContact.email = res.email || '';
    this.currentContact.address = res.address || '';
    this.currentContact.phone = res.phone || '';
    this.currentContact.description = res.description || '';
    this.currentContact.profasion = res.profasion || '';
    this.setState({ contact: this.currentContact });
  }

  async componentDidUpdate(prevProps) {
    if (!this.props.contact || this.props.contact === prevProps.contact) return;
    await this.getAndSetContact();
  }

  handleEditBtn = async () => {
    if (!this.state.isEditable) this.setState({ isEditable: true });
    else await this.getAndSetContact();
  };

  fieldChange = e => {
    this.currentContact[e.target.name] = e.target.value;
    this.setState({ contact: this.currentContact });
  };

  isValid() {
    const { isValid, err } = contactFormValidate.validate(this.state.contact);
    this.setState({ errors: err });
    return isValid;
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (!this.isValid()) return;
    const { res, err } = await this.contactService.updateContact(
      this.state.contact,
      this.props.contact._id
    );
    if (err) return this.setState({ ERR: err });
    console.log(res);
    this.setState({ isEditable: false });
  };

  render() {
    const { contact, isEditable, ERR } = this.state;
    if (!contact)
      return (
        <div className="alert alert-warning">
          <p>You did not select a contact to show</p>
        </div>
      );
    return (
      <div className="container-fluid">
        {ERR ? <div className="alert alert-danger">{ERR}</div> : null}
        <form className="row" onSubmit={this.handleSubmit}>
          <div className="col-sm-12 text-right">
            <button
              type="button"
              onClick={this.handleEditBtn}
              className={
                'btn px-3 btn-sm btn-' + (!isEditable ? 'warning' : 'secondary')
              }
            >
              {!isEditable ? 'Edit' : 'Cancel'}
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
              onChange={this.fieldChange}
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
              onChange={this.fieldChange}
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
              onChange={this.fieldChange}
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
              onChange={this.fieldChange}
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
              onChange={this.fieldChange}
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
              onChange={this.fieldChange}
            />
          </div>
          <div className="form-group col-sm-12">
            <label htmlFor="description">Decription</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Description not provided"
              disabled={!isEditable}
              defaultValue={contact.description || ''}
              onChange={this.fieldChange}
            />
          </div>
          <div className="text-right col-sm-12">
            <button className="btn btn-sm btn-success px-3">Submit</button>
          </div>
        </form>
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
