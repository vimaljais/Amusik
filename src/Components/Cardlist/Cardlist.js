import React from 'react';
import Card from '../Card/Card';
import Artist from '../Artist/Artist';
import './Cardlist.css'
import SearchBox from '../SearchBox/SearchBox'
import SearchCard from '../SearchCard/SearchCard'



class CardList extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			quary:'',
			searchtrack:[],
			searchartist:[]
		}

	}


	onSearchChange = (event) => {
		this.setState({quary: event.target.value}); 
	}

	getSearchResult = () => {
		fetch(`https://young-meadow-81807.herokuapp.com/gettracksearch/${this.state.quary}`)
        .then(response=> response.json())
        .then(response => {
          this.setState({searchtrack: response.results})
        })  

/*		fetch(`https://young-meadow-81807.herokuapp.com/getartistsearch/${this.state.quary}`)
        .then(response=> response.json())
        .then(response => {
          this.setState({searchartist: response.results.artistmatches.artist})
          console.log(this.state.searchartist)
        })  */ 
	}



	render() {

	const cardArray = this.props.top50.map((user, i) => {
		if(i<20) {
		return (
			<Card key={i}
			reload={this.props.reload}
			song={this.props.top50[i].name} 
			artist={this.props.top50[i].artist.name}/>
			);
		}
	})	

	const cardArrayArtists = this.props.top50artists.map((user, i) => {
		if(i<20) {
		return (
			<Artist key={i}
			artist={this.props.top50artists[i].name}/>
			);
		}
	})


	const cardArrayTrackSearch = this.state.searchtrack.map((user, i) => {
/*			var check ='';
			var check2 = '';
			check = this.state.searchtrack[i].trackName.replace(/ \([\s\S]*?\)/g, '');
			check2 = this.state.quary.replace(/ \([\s\S]*?\)/g, '');
			check = check.toLowerCase();
			check2 = check2.toLowerCase();
*/		if(i<19) {
		return (
			<SearchCard key={i}
			reload={this.props.reload}
			song={this.state.searchtrack[i].trackName} 
			artist={this.state.searchtrack[i].artistName}
			art={this.state.searchtrack[i].artworkUrl60}/>
		);
			}
	})	

	/*
	const cardArrayArtistSearch = this.state.searchartist.map((user, i) => {
		if(i<20) {
		return (
			<Artist key={i}
			artist={this.state.searchartist[i].name} />
			);
		}
	})	
*/



	return (
		<div className="mw9 center ph3-ns">
		  <div className="cf ph2-ns">

		  <div className="fl w-100 w-third-ns pa2">
		  		<p className='f2 center defaultcursor backg white dib br3 tc bw2 shadow-5 flex items-center bb b--black-10'>SEARCH </p>
				<div className="mw9 center ph3-ns">
				  <div className="cf ph2-ns">
		    			<div className="fl w-90 pa2">
						 	<SearchBox searchchange= {this.onSearchChange}/>		
						</div>
						<div className="fl w-10 pa2">
							<input type='button'
					    		className="f6 link dim f6 link dim br-pill ph3 pv2 mb2 dib white bg-black-50 h3rem "
						   		value='go' 
						   		onClick={this.getSearchResult} 
						   	/>
					   	</div>
				    </div>
		    	</div>
		    	 {cardArrayTrackSearch}
		    	{/* {cardArrayArtistSearch}*/}

		    </div>
		    <div className="fl w-100 w-third-ns pa2">
		    	<p className='f2 center defaultcursor backg white dib br3 tc bw2 shadow-5 flex items-center bb b--black-10'>TOP 20 TRACKS </p>
		      {cardArray}
		    </div>
		    <div className="fl w-100 w-third-ns pa2">
		    	<p className='f2 center defaultcursor backg white dib br3 tc bw2 shadow-5 flex items-center bb b--black-10'>TOP 20 ARTISTS </p>
		      {cardArrayArtists}
		    </div>
		  </div>
		</div>
		);
	}
}




export default CardList;