import React from 'react';

const SearchBox = ({searchchange}) => {
	return (
		<input
		 className= 'input-reset f3 sans-serif pa2 ba bg-white-10 hover-bg-white-70 w-100 white hover-black dib br3 tc bw2 shadow-5 flex items-center bb b--black-10' 
		 type="Search" 
		 placeholder='Search Tracks' 
		 onChange={searchchange} />
		)

}

export default SearchBox;