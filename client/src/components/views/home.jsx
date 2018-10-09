import React from 'react';
import Contacts from '../contacts';

const Home = props => {
  return (
    <div className="row">
      <div className="col-4 p-3">
        <Contacts />
      </div>
      <div className="col-8 p-3">
        <h1>Contacts Details</h1>
      </div>
    </div>
  );
};

export default Home;
