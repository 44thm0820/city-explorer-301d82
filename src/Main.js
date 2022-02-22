import React from 'react';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: ''
    };
  }

  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({ 
      city: e.target.value
    });
  };

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
