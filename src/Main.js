import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import { ListGroupItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

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

    console.log('first ',  cityData.data[0]);
    this.setState({
      cityData: cityData.data[0],
      lat: cityData.data[0].lat,
      lon: cityData.data[0].lon,
      display_name: cityData.data[0].display_name
    })
  }

  render() {
    console.log('app state: ', this.state);
    let urlMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`;
    return (
      <>
        <form onSubmit={this.getCityData}>
          <label>Pick a city!!!
            <input type="text" onInput={this.handleCityInput}/>
          </label>
          <button type="submit">Explore!</button>
        </form>
        {Object.keys(this.state.cityData).length > 0 &&
          <Container>
            <ListGroup >
              <ListGroupItem><h6>Your Place: {this.state.display_name}</h6></ListGroupItem>
              <ListGroupItem><h6>Latitude: {this.state.lat}</h6></ListGroupItem>
              <ListGroupItem><h6>Longitude: {this.state.lon}</h6></ListGroupItem>
            </ListGroup>
            <Card>
              <Card.Img src={urlMap} alt={this.state.display_name} />
            </Card>
          </Container>
        } 
      </>
    )
  }
}
export default Main;
