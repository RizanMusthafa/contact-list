import React from 'react';
import Contacts from '../contacts';
import Contact from '../contact';

const Home = props => {
  return (
    <div className="row">
      <div
        className="col-4 p-3 bg-light"
        style={{ overflow: 'scroll', height: '92vh' }}
      >
        <Contacts />
      </div>
      <div className="col-8 p-3">
        <h1>Contacts Details</h1>
        <hr />
        <Contact />
      </div>
    </div>
  );
};

export default Home;
