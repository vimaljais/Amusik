import React from 'react';
import './App.css';
//import Music from './Components/Music/Music'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
//import Navigation from './Components/Navigation/Navigation';
import Particles from 'react-particles-js';
//import Card from './Components/Card/Card'
import Cardlist from './Components/Cardlist/Cardlist'
// import 'react-h5-audio-player/lib/styles.less' Use LESS
//import 'react-h5-audio-player/src/styles.scss' //Use SASS


const ParticlesOptions = 
 {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}


class App extends React.Component {

      constructor(props) {
      super(props);
      this.player = React.createRef();  
      this.state = {
        top50: [],
        link:'',
        top50artists:[]
      }
    }


  reload = (url) => {
      this.setState({link: url})
      this.player.current.audio.current.load()
      this.player.current.audio.current.play()
    } 



    componentDidMount(){
        fetch('https://young-meadow-81807.herokuapp.com/gettop50')
        .then(response=> response.json())
        .then(response => {
          this.setState({top50: response.tracks.track})
        })  
        fetch('https://young-meadow-81807.herokuapp.com/gettop50artists')
        .then(response=> response.json())
        .then(response => {
          this.setState({top50artists: response.artists.artist})
        })   
  } 



    render() {

    const {top50} = this.state;
    const {top50artists} = this.state;
    return (
    <div className="App">
      <Particles  className='Particles'
        params = {ParticlesOptions} />
       {/*     <Navigation />*/}

      <h1 className='f1 defaultcursor backg'>Amusik </h1>

      {/*<Music reload={this.reload} />*/}
      <AudioPlayer className='containplayer zzz' 
        src={this.state.link}
        ref={this.player}
        layout="Stacked Reverse"
        // Try other props!
      />
     {/* <button onClick={this.reload}> click me </button>*/}
     <Cardlist reload={this.reload} link={this.state.link} top50={top50} top50artists={top50artists} />
    </div>
  );
  }
}

export default App;

