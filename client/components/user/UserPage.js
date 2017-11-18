import React from 'react';
import Userlist from './Userlist'
import {connect} from 'react-redux';
import Proptypes from 'prop-types';
import {fetchUser} from '../../actions/fetchUser';
import {addFlashMessage} from '../../actions/flashMessages';

class UserPage extends React.Component{
    /*constructor(props) {
        super(props);
        this.state = {
            users: {},
            errors: {},
        }
    }*/
    render(){
        const { userlst,addFlashMessage}=this.props;
        return (
            <div className="jumbotron">
                <div className="row">
                    <Userlist userlst={userlst} addFlashMessage={addFlashMessage} />
                </div>
            </div>
        );
    }
}

/*UserPage.propTypes = {
    userlst: PropTypes.array.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}*/
/*function mapStateToProps(state){
    return {
        users:state.users
    }
}*/
//export default connect(null,{userlst,addFlashMessage})(UserPage)
export UserPage