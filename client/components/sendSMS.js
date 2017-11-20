import React from 'react';
import TextFieldGroup from './common/TextFieldGroup';
import PropTypes from 'prop-types';
import classname from 'classname';
import validateInput from '../../server/shared/validations/login';
import { connect } from 'react-redux';
import { send } from '../actions/sendSMS';

class sendSMS extends React.Component {
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

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({errors: "sending...", isLoading: true})
        
        /*if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.login(this.state).then(
                //(res) => this.context.router.history.push('/')//,

            ).catch(
                (error) => {
                    console.log('errr',error);
                    if(error !='undefined'){
                        console.log("400");
                        console.log(error.response.data)
                        this.setState({errors: error.response.data, isLoading: false})

                    }

                });
        }*/
    }

    onChange(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, identifier, message, isLoading } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h4>Send SMS</h4>

                { errors.form && <div className="alert alert-danger">{errors.form}</div> }

                <div className={classname('form-group', { 'has-error': errors.error })}>
                    <label className="control-label">Number</label>
                    <div className="row">
                    <div className='col-sm-1' style={{marginLeft: -45 + 'px'}}>
                        <label className="pull-right">+63</label>
                    </div>
                    <div className='col-sm-11'>
                        <input
                        onChange={this.onChange}
                        type="text"
                        name="number"
                        className="form-control"
                        />

                    </div>
                    </div>
                    {errors.error && <span className="help-block">{errors.error}</span>}
                </div>

                <TextFieldGroup
                    field="name"
                    label="name"

                    error={errors.name}
                    onChange={this.onChange}
                />
                <div className="form-group">
                <label className="form-control-label">message</label>

                </div>
                <textarea style={{width: 100 + '%'}}></textarea>


                <div className="form-group"><button className="btn btn-success btn-lg" disabled={isLoading}>Send SMS</button></div>
            </form>
        );
    }
}

sendSMS.propTypes = {
    send: PropTypes.func.isRequired
}

export default connect(null, { send })(sendSMS);
