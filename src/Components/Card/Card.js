import React from 'react';
import './Card.css';

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
			fetch('https://young-meadow-81807.herokuapp.com/link', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				link: url
			})
		}).then(response => response.json())
		.then(response => {
			this.props.reload(response)
			})
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
		<div className='button bg-image1 light-blue dib br3 pa3 ma2 grow bw2 shadow-5' onClick={() => this.getUrl(`${song} ${artist} lyrics`)} >
			<img src={`${this.state.art}`} alt='artwork' />
			<div>
				<h2 > {song} </h2>
				<p> {artist} </p>
			</div>
			   

		</div>
		);
	}
}

export default Card;
