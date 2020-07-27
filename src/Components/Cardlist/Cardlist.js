import React from 'react';
import Card from '../Card/Card';


const CardList = ({ top50, reload }) => {

	const cardArray = top50.map((user, i) => {
		return (
			<Card key={i}
			reload={reload}
			song={top50[i].name} 
			artist={top50[i].artist.name}/>
			);
	})	
	return (
		<div>
		{cardArray}
		</div>
		);
}


export default CardList;