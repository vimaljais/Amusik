import React from 'react';
import './Artist.css';

class Artist extends React.Component   { 
		constructor(props) {
		super(props);
		this.state = {
			art:''
		}

	}

	
	componentDidMount() {
		const {artist} = this.props;
		fetch(`https://young-meadow-81807.herokuapp.com/getart/${artist}`)
		.then(response => response.json())
		.then(response => {
			this.setState({art:response});					
		})
		
		
	}

	render() {

	/*const titleCase = (str) => {
	   var splitStr = str.toLowerCase().split(' ');
	   for (var i = 0; i < splitStr.length; i++) {
	       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	   }
	   return splitStr.join(' '); 
	}
*/
	var {artist} = this.props;

	return (

		<div className='button bg-image1 light-blue dib br3 grow tc bw2 shadow-5 flex items-center bb b--black-10' >
			<img className= '' src={`${this.state.art}`} alt='artwork' />
			<dl className="pl3 flex-auto">
	          <dt className="clip">Title</dt>
	          <dd className="ml0 white truncate w-100">{artist}</dd> 
	        </dl>
		</div>
		);
	}
}

export default Artist;

