import React from 'react';
import './Card.css';

var check='';

class Card extends React.Component   { 
		constructor(props) {
		super(props);
		this.state = {
			art:'',
			keyword: '',
			link:''
		}
	}

	createAudio = (url) => {
			if(url!== check) {
			fetch('https://young-meadow-81807.herokuapp.com/linknew', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				link: url
			})
		}).then(response => response.json())
		.then(response => {
			this.props.reload(response)
			})
			check=url;
		}
	}


	getUrl = (quary) => {
		fetch('https://young-meadow-81807.herokuapp.com/geturl', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: quary
			})
		}).then(response => response.json())
		  .then(response => {
			this.createAudio(response)
		})
	}

	componentDidMount() {
		const {song, artist} = this.props;
		fetch(`https://young-meadow-81807.herokuapp.com/getart/${song} ${artist}`)
		.then(response => response.json())
		.then(response => {
			this.setState({art:response});					
		})		
	}




	render() {

	const titleCase = (str) => {
	   var splitStr = str.toLowerCase().split(' ');
	   for (var i = 0; i < splitStr.length; i++) {
	       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	   }
	   return splitStr.join(' '); 
	}

	var {song, artist} = this.props;
	song = song.replace(/ \([\s\S]*?\)/g, '');
	song = titleCase(song);

	return (

		<div className='button bg-image1 light-blue dib br3 grow tc bw2 shadow-5 flex items-center bb b--black-10' onClick={() => this.getUrl(`song audio ${song} ${artist}`)} >
			<img className= '' src={`${this.state.art}`} alt='artwork' />
			<dl className="pl3 flex-auto">
	          <dt className="clip">Title</dt>
	          <dd className="ml0 white truncate w-100">{song}</dd> 
	          <dt className="clip">Artist</dt>
	          <dd className="ml0 gray truncate w-100">{artist}</dd>
	        </dl>
		</div>
		);
	}
}

export default Card;

