import React from 'react';

class Contact extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="form-group col-sm-6">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              disabled={true}
              className="form-control"
              value="Rizan"
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              disabled={true}
              className="form-control"
              value="Mohomed"
            />
          </div>
          <div className="form-group col-sm-12">
            <label htmlFor="lastName">Phone Numbers</label>
            <input
              type="text"
              name="phone"
              disabled={true}
              className="form-control"
              value="0778672721 , 0729448284"
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="firstName">E-mail</label>
            <input
              type="text"
              name="email"
              disabled={true}
              className="form-control"
              value="musthafarizan@gmail.com"
            />
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="profcian">Profcian</label>
            <input
              type="text"
              name="profcian"
              disabled={true}
              className="form-control"
              value="Web Devoloper"
            />
          </div>
          <div className="form-group col-sm-12">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              disabled={true}
              className="form-control"
              value="47/11 school lane hirimbura cross road galle"
            />
          </div>
          <div className="form-group col-sm-12">
            <label htmlFor="description">Decription</label>
            <textarea
              name="description"
              className="form-control"
              disabled={true}
              defaultValue="He is an super admin for this site"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
