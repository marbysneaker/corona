import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactNbsp from 'react-nbsp'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

class App extends Component {
state = {
  world : [],
  countries:[],
  usa:{},
  philippines:{},
  select:{},
  twitter:[]
}

doFetch = () => {
  console.log("fetching")
  const url1 = "https://corona.lmao.ninja/all"
  const url2 = "https://corona.lmao.ninja/countries"
  var covid = require('novelcovid');

  covid.all() 
    .then((data) => {
      console.log(data)
    this.setState({
      world: data
    })})
    .catch((err) => console.error(err));
  covid.countries()
    .then((data) => {
      console.log('done fetching',data)
      console.log(data[9])
      this.setState({countries:data})
      for (let i of data){
        if (i.country === 'USA'){
          this.setState({usa:i})

        }
        if (i.country === 'Philippines'){
          this.setState({philippines:i})

        }
      }
      
    })
    .catch((err) => console.error(err));
  
}

fetchTwitter = () => {
  fetch('https://publish.twitter.com/oembed?url=https://twitter.com/TwitterDev')
    .then(response => response.json())
    .then(data => {
      console.log('received twitter data', data)
      this.setState({twitter:data})

    })
  }

componentDidMount = () => {
  this.doFetch()
  this.fetchTwitter()

}
  
clicked = (country) => {

  console.log(country)

}

handleChange = name => event => {
    this.setState({
      select:name
    });
  };

render() {
  
  return (
    
    <div className="App">
      <header className="App-header">
        <div className = "corona-container">
            <div className = "world">
              <div className='world-title'>WORLD </div> 
              <div className='world-cases'>CASES : {this.state.world.cases} </div>
              <div className='world-deaths'>DEATHS : {this.state.world.deaths}</div>
              <div className='world-recovered'>RECOVERED : {this.state.world.recovered}</div>
              
            
            </div>
            <div className = "usa">
                <div className='country'>COUNTRY : {this.state.usa.country}</div>
                <div className='cases'>CASES : <ReactNbsp/> <ReactNbsp/> {this.state.usa.cases}</div>
                <div className='today'>TODAY'S CASES :   {this.state.usa.todayCases}</div>
                <div className='deaths'>TODAY'S DEATHS :  {this.state.usa.todayDeaths}</div>
                <div className='recovered'>TODAY'S RECOVERED :  {this.state.usa.recovered}</div>
                <div className='critical'>CRITICAL :   {this.state.usa.critical}</div>
            </div>
            <div className = "pi">
                <div className='country'>COUNTRY :{this.state.philippines.country}</div>
                <div className='cases'>CASES :{this.state.philippines.cases}</div>
                <div className='today'>TODAY'S CASES :{this.state.philippines.todayCases}</div>
                <div className='deaths'>TODAY'S DEATHS :{this.state.philippines.todayDeaths}</div>
                <div className='recovered'>RECOVERED :{this.state.philippines.recovered}</div>
                <div className='critical'>CRITICAL :{this.state.philippines.critical}</div>
                <div className='twitter'>
                <a class="twitter-timeline" data-width="300" data-height="400" data-theme="dark" href="https://twitter.com/WHOPhilippines?ref_src=twsrc%5Etfw">Tweets by WHOPhilippines</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                </div>
            </div>
            <div className = "all">
            <FormControl className='select'>
            <InputLabel id="demo-controlled-open-select-label">Select Country</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
      
            >
            <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.state.countries.map((country, index) => (
            <MenuItem value={country.country} onClick={()=> this.clicked(country.country) }>{country.country}</MenuItem>
          ))}
          
            </Select>
          </FormControl>
            
            </div>
        
        
        
        </div>
      
      </header>
    </div>
  );
  }
}
export default App;