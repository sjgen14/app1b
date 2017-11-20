import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
/*import LoginPage from './components/login/LoginPage';
import NewEventPage from './components/events/NewEventPage';

import requireAuth from './utils/requireAuth';

  <Route path="/" component={App}>
    <IndexRoute component={Greetings} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="new-event" component={requireAuth(NewEventPage)} />
  </Route>

*/

export default (
    <App>
        <Route exact={true} path="/" component={Greetings} />
        <Route path="/signup" component={SignupPage} />
        <Route path="*" component={notfound}/>
    </App>

)
const notfound = ()=><h4>not found!</h4>

