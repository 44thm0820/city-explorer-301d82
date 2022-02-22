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
    //let url = `https://us1.locationiq.com/v1/search.php?key=pk.c829acf7c0504460bca9c3316bd09611&q=${this.state.city}&format=json`;

    let cityData = await axios.get(url);

    console.log('first ',  cityData.data[0]);
    // this.setState({
    //   cityData
    // })
  }



  render() {
    console.log('app state: 830pm : ', this.state);
    // console.log('hello', this.state.cityData.data[0]);

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
