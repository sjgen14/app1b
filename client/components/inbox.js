import React from 'react';
import TextFieldGroup from './common/TextFieldGroup';
import PropTypes from 'prop-types';
import classname from 'classname';
import { connect } from 'react-redux';

class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            message: '',
            name:'',
            number:'',
            errors: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

    }

    onChange(e) {
        e.preventDefault();
    }

    render() {
        const { errors, identifier, message, isLoading } = this.state;

        return (
            <div className="jumbotron">
                <div className="row">
                    <h3>Inbox</h3>
                    <table className="table">
                        <thead>
                        <tr>
                            <td>Number</td>
                            <td>Name</td>
                            <td>Message</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan="3"><center><em>no message yet</em></center></td>
                        </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Inbox;
