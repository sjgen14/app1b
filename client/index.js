import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route ,IndexRoute, Link } from 'react-router-dom';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { hasHistory} from 'react-router';
import routes from './routes';
//import Routes2 from './Routes2';
import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
//import SendSMS from './components/sendSMS';
import Send from './components/sendSMS/sendPage';
import Inbox from './components/inbox';
//import SignupForm from './components/signup/SignupForm';
import rootReducer from './rootReducer';
import setAuthorizationToken from "./utils/setAuthorizationToken";
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './actions/authActions';
import { NewEventPage } from './components/event/NewEventPage';
//import UserPage from "./components/User/UserPage";
import Users2 from './components/user/users2';

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f=> f
	)
);
if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

render(
	<Provider store={store}>
		<Router history={hasHistory}>
			<App>
				<Route exact={true} path="/" component={Greetings} />
				<Route path="/users2" component={Users2} />
				<Route path="/signup" component={SignupPage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/send" component={Send} />
				<Route path="/inbox" component={Inbox} />

				<Route path="*" component={notfound}/>
				<Route path="/new-event" component={NewEventPage}/>
			</App>
		</Router>
	</Provider>, document.getElementById('app'));
const notfound = ()=><h4>not found!</h4>

/*
<Router>
  	<div>
    	<Route exact path="/" component={App}>
				<Route exact path="/signup" component={SignupPage}/>
<Route path="*" component={notfound}/>
</Route>

</div>
</Router>

*/


	//render(<Router history={browserHistory} routes={App}/>, document.getElementById('app'));
	
