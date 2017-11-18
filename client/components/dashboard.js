import React from 'react';
import listuser from './listuser';
import PropTypes from 'prop-types';

export default function dashboard ({userl}){
    const emptyMessage=(
        <p>Empty List</p>
    );
    const userList =(
        <table className="table table-success">
            <thead >
            <th>User</th>
            <th>email</th>
            <th>timezone</th>
            </thead>
            <tbody>
            <tr>
                <td>{userl.map(game => <listuser game={userl} key={game._id}/>)}</td>
            </tr>
            </tbody>
        </table>
    );

    return (
        <div>
            {games.length ===0?emptyMessage : userList}
        </div>
    );
}
dashboard.propTypes ={
    games: PropTypes.array.isRequired
}