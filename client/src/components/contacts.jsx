import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setContacts,
  setCurrentContact
} from '../redux-store/actions/contacts-action';
import ContactService from '../services/contact-service';

class Contacts extends React.Component {
  state = {
    error: null
  };
  constructor(props) {
    super(props);
    this.contactService = new ContactService(props.token);
  }
  async componentDidMount() {
    const res = await this.contactService.getAllContacts();
    if (res.err) return this.setState({ error: res.err });
    this.props.setContacts(res.res);
  }

  render() {
    if (this.state.error)
      return <div className="alert alert-danger">{this.state.error}</div>;
    if (!this.props.contacts)
      return (
        <div className="progress">
          <div
            className="progress-bar bg-danger progress-bar-striped progress-bar-animated"
            style={{ width: 100 + '%' }}
          />
        </div>
      );
    return (
      <ul className="list-group">
        {this.props.contacts.map(contact => {
          const classList =
            'list-group-item list-group-item-action' +
            (this.props.contact === contact ? ' active' : '');
          return (
            <li
              key={contact._id}
              onClick={() => this.props.setCurrentContact(contact)}
              className={classList}
            >
              {contact.firstName} {contact.lastName}
            </li>
          );
        })}
      </ul>
    );
  }
}

function mapStateToProps({ auth, contacts }) {
  return {
    token: auth.token,
    contacts: contacts.contacts,
    contact: contacts.contact
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setContacts,
      setCurrentContact
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
