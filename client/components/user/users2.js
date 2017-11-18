import React from 'react';

class Users2 extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="row">
          <h3>User list</h3>
          <table className="table">
            <thead>
            <tr>
              <td>Username</td>
              <td>Email</td>
              <td>timezone</td>
              <td>number</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>j1</td>
              <td>j1@asf.com</td>
              <td>Tahiti</td>
              <td></td>
            </tr>
            <tr>
              <td>j2</td>
              <td>j2@asf.com</td>
              <td>Niue</td>
              <td></td>
            </tr>
            <tr>
              <td>test</td>
              <td>test@test.com</td>
              <td>Niue</td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Users2;
