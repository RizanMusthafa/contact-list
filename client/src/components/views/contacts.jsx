import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getContacts } from '../../actions/contacts-action';

class Contacts extends React.Component {
  componentDidMount() {
    this.props.getContacts(this.props.token);
  }

  render() {
    if (!this.props.contacts) return <h1>Loading...</h1>;
    return (
      <ul className="list-group my-5">
        {this.props.contacts.map(contact => (
          <li key={contact._id} className="list-group-item">
            {contact.firstName} {contact.lastName}
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps({ auth, contacts }) {
  return {
    token: auth.token,
    contacts: contacts.contacts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getContacts
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
