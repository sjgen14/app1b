import React from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';

class Userlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            errors: {}
        }
    }
    componentDidMount(){
        this.props.fetchUser().then(({data}) => {
            console.log(data);
            this.setState({users:data});
        }).catch(
            (error) => {
                if(error !='undefined'){
                    //this.props.addFlashMessage({type:'error',text:'connection failed to sources'});
                    this.setState({errors: error.response.data});
                }
            });
    }
    render(){
        //const emptyMsg=(<p>User list is empty</p>);

        /*const ulist=(
            <table>
                <thead >
                <th>User</th>
                <th>email</th>
                <th>timezone</th>
                </thead>
                <tbody>
                    map(this.props.userlst, (val, key) =>
                    <tr> <td>{val.username}</td><td>{val.email}</td><td>{val.timezone}</td></tr>
                    )
                </tbody>
            <table>
            );*/

            return (
                <div>
                    {/*this.props.userlst.length === 0 ? emptyMsg : ulist*/}
                </div>
            );
    }
}

Userlist.propTypes = {
    userlst: PropTypes.array.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}
export default Userlist;
