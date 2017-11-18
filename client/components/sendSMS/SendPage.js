import React from 'react';
import SendForm from './SendForm';
import { connect } from 'react-redux';
import { sendRequest } from '../../actions/sendActions';
import {addFlashMessage} from '../../actions/flashMessages';

import PropTypes from 'prop-types';
class SendPage extends React.Component {
  render() {
      const { sendRequest,addFlashMessage}=this.props;

   return (

        <div className="row">
            <div className="col-md-12">
                <SendForm sendRequest={sendRequest} addFlashMessage={addFlashMessage} />
            </div>
        </div>
      );
  }
}

SendPage.propTypes = {
    sendRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}

export default connect(null,{sendRequest,addFlashMessage})(SendPage)
