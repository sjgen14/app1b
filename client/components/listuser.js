import React from 'react';
import PropTypes from 'prop-types';

export default function listuser ({userl}){

    return (
        <table>
            <thead >
            <th>User</th>
            <th>email</th>
            <th>timezone</th>
            </thead>
            <tbody>
            <tr>
                <td>
                    {userl.username} {userl.password} {userl.timezone}
                </td>
            </tr>
            </tbody>
        <table>
    );
}
listuser.propTypes ={
    userl: PropTypes.array.isRequired
}