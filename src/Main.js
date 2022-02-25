import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import { ListGroupItem } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

class Main extends React.Component {
  constructor(props){
    super(props);
    // this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state = {
      citySearched: '',
      cityData: {}
    };
  }

  // forceUpdateHandler(){
  //   this.setState({
  //     citySearched: '',
  //     cityData: {},
  //     lat: '',
  //     lon: '',
  //     display_name: ''
  //   })
  //   this.forceUpdate();
  // };
 
  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({ 
      citySearched: e.target.value
    });
  };

  getCityData = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.citySearched}&format=json`;

    try {
      let cityData = await axios.get(url);

      console.log('first ',  cityData.data[0]);
      this.setState({
        cityData: cityData.data[0],
        lat: cityData.data[0].lat,
        lon: cityData.data[0].lon,
        display_name: cityData.data[0].display_name
      });
    } catch (error) {
      console.log('error:', error)
      console.log('error.response', error.response)
      this.setState({
        error: true,
        errorMessage: `Status ${error.response.status}. ${error.response.data.error}.`
      })  
      // this.forceUpdateHandler();    
    }
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
        {Object.keys(this.state.cityData).length > 0 && !this.state.error 
          ?
            <Container>
              <ListGroup >
                <ListGroupItem><h6>Your Place: {this.state.display_name}</h6></ListGroupItem>
                <ListGroupItem><h6>Latitude: {this.state.lat}</h6></ListGroupItem>
                <ListGroupItem><h6>Longitude: {this.state.lon}</h6></ListGroupItem>
              </ListGroup>
              <Card>
                <Card.Img src={urlMap} alt={this.state.display_name} description={this.state.display_name} title={this.state.display_name}/>
              </Card>
            </Container>
          : this.state.error &&
            <Modal 
              show='true' 
              centered 
              size='xl' 
              onClick={() => window.location.reload()} 
              onHide={() => window.location.reload()} 
              backdrop='static' 
            >
              <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{this.state.errorMessage}</p>
              </Modal.Body>
            </Modal>            
        }
      </>
    )
  }
}
export default Main;
