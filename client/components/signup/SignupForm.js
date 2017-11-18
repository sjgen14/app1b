import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import classname from 'classname';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import {browserHistory} from 'react-router';
import { hashHistory } from 'react-router';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    /*this.checkUserExists = this.checkUserExists.bind(this);*/
  }

  onChange(e) {
    console.log("echange",[e.target.name]);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
      e.preventDefault();
      if (this.isValid) {
          this.setState({errors: {}, isLoading: true});
          console.log(this.state);
          this.props.userSignupRequest(this.state).then(({data}) => {
              console.log(data);
              console.log("tokenize submit");
              console.log('router', this.context.router);
              this.props.addFlashMessage({type:'success',text:'successfully registered!! welcome'});
              this.context.router.history.push('/');
          }).catch(
                (error) => {
                    console.log('errr',error);
                    if(error !='undefined'){
                        console.log("400");
                        console.log('erro->',error.response.data);
                        this.setState({errors: error.response.data, isLoading: false})

                    }

          });

      }
  }
  isValid() {

     const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
        this.setState({ errors });
    }

    return isValid;
  }

  render() {
    const { errors } = this.state;
    const options = map(timezones, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    return (
      <form onSubmit={this.onSubmit}>
        <h4>Sign Up!</h4>
        <TextFieldGroup
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />

        <div className={classname("form-group", { 'has-error': errors.timezone })}>
          <label className="control-label">Timezone</label>
          <select
            className="form-control"
            name="timezone"
            onChange={this.onChange}
            value={this.state.timezone}
          >
            <option value="" disabled>Choose Your Timezone</option>
            {options}
          </select>
          {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-success btn-lg">
            Sign up
          </button>
        </div>
      </form>
    );
  }
}



SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}
SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
}
export default SignupForm;
