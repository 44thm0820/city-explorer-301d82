import React from 'react';
import axios from 'axios';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      cityData: {}
    };
  }

  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({ 
      city: e.target.value
    });
  };

  getCityData = async (e) => {
    e.preventDefault();

    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

    let cityData = await axios.get(url);
    
    console.log(cityData.data[0]);
  }

  render() {
    console.log('app state: ', this.state);
    return (
      <>
        <form onSubmit={this.getCityData}>
          <label>Pick a city!!!
            <input type="text" onInput={this.handleCityInput}/>
          </label>
          <button type="submit">Explore!</button>
        </form>
      </>
    )
  }
}

export default Main;
