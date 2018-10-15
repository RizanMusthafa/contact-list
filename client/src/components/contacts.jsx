import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getContacts, setCurrentContact } from '../actions/contacts-action';

class Contacts extends React.Component {
  componentDidMount() {
    this.props.getContacts(this.props.token);
  }

  render() {
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
      getContacts,
      setCurrentContact
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
