import React, {Component} from 'react';


class Music extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ''
		}
	}

	onKeywordChange = (event) => {
		this.setState({keyword:event.target.value});
	}


	createAudio = (url) => {
		console.log(url)
		fetch('https://young-meadow-81807.herokuapp.com/getaudio', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				link: url
			})
		}).then(response => response.json())
		.then(response => {
			if(response === 'success')
			{
				this.props.reload()
			}
			})
	}

	createUrl = (response) => {
		console.log(response)
		const videoId = response.items[0].id.videoId;
		const fix = 'https://www.youtube.com/watch?v='
		const url = fix+videoId;
		return url
	}

	getUrl = () => {
		fetch('https://young-meadow-81807.herokuapp.com/geturl', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.keyword
			})
		}).then(response => response.json())
		  .then(response => {
			this.createAudio(this.createUrl(response))
		})
	}
	
	render() {
		return (
		  <div>			
			  <form>
			  <label for="name">Enter song name:</label>
			  <input    type="text" 
				        name="keyword"  
				        id="keyword"
				        onChange={this.onKeywordChange} />
			  <input type='button'
			   		value='fetch data' 
			   		onClick={this.getUrl} />
			</form> 
		</div>
			 );
	}

}

export default Music;
  

  