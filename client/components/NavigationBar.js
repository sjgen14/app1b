import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.context.router.history.push('/login');
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/send">Send SMS</Link></li>
                <li><Link to="/inbox">Inbox</Link></li>
                <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
                <li><a href="#">{this.props.auth.user.username}</a></li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                {<li><Link to="/signup">Sign up</Link></li>}
                <li><Link to="/login">Login</Link></li>
            </ul>
        );

        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">App1b</Link>
                    </div>

                    <div className="collapse navbar-collapse">
                        { isAuthenticated ? userLinks : guestLinks }
                    </div>
                </div>
            </nav>
        );
    }
}

NavigationBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}
NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired
}
export default connect(mapStateToProps, { logout })(NavigationBar);
//export default NavigationBar;
