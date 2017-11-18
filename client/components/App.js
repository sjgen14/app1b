import React from 'react';
import {Link} from 'react-router';
import Navigationbar from './Navigationbar';
import FlashMessagesList from './flash/FlashMessagesList';


class App extends React.Component{
	render(){
		return(
			<div className="container">
			<Navigationbar/>
			<FlashMessagesList/>

			{this.props.children}
			</div>
		);	
	}
}

export default App;