import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import classname from 'classname';

import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import {browserHistory} from 'react-router';
import { hashHistory } from 'react-router';

class SendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      name:'',
      message:'',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
      e.preventDefault();
      if (this.isValid) {
          this.setState({errors: {}, isLoading: true});
          console.log(this.state);
          this.props.sendRequest(this.state).then(({data}) => {
              //this.props.addFlashMessage({type:'success',text:'successfully send'});
              //this.context.router.history.push('/');
              this.props.addFlashMessage({type:'success',text:'message sent!'});
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
        <h4>Send SMS</h4>
        <TextFieldGroup
          error={errors.number}
          label="Number"
          onChange={this.onChange}
          value={this.state.number}
          field="number"
        />

        <TextFieldGroup
          error={errors.name}
          label="name"
          onChange={this.onChange}
          value={this.state.name}
          field="name"
        />

        <div className={classname("form-group", { 'has-error': errors.message })}>
          <label className="control-label">Message</label>
          <textarea onChange={this.onChange} name="message" value={this.state.message} style={{width: 100 + '%'}}></textarea>
          {errors.message && <span className="help-block">{errors.message}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-success btn-lg">
            Send
          </button>
        </div>
      </form>
    );
  }
}



SendForm.propTypes = {
    sendRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}
SendForm.contextTypes = {
    router: PropTypes.object.isRequired
}
export default SendForm;
