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
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';


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
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url1 = "https://corona.lmao.ninja/all"
  const url2 = "https://corona.lmao.ninja/countries"

  fetch(url1)
      .then(response => response.json())
      .then(data => {
      console.log(data)
      this.setState({
      world: data
      })})
    .catch((err) => console.error(err));
  fetch(url2)
      .then(response => response.json())
      .then(data => {
      console.log('received twitter data', data)
      this.setState({countries:data})
      console.log(data[9])
      
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
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://corona.lmao.ninja/countries';
  fetch(proxyUrl + url)
    .then(response => response.json())
    .then(data => {
      console.log('received twitter data', data)
      this.setState({twitter:data})

    })
  }

componentDidMount = () => {
  this.doFetch()
  // this.fetchTwitter()
  
  

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
              <div className='world-cases'>CASES <br/> <span>{this.state.world.cases} </span></div>
              <div className='world-deaths'>DEATHS <br/> <span>{this.state.world.deaths}</span></div>
              <div className='world-recovered'>RECOVERED <br/><span>{this.state.world.recovered}</span></div>
              
            
            </div>
            <div className = "usa">
                <div className='country-usa'>{this.state.usa.country}</div>
                <div className='cases'>CASES <br/> <span>{this.state.usa.cases}</span></div>
                <div className='today'>TODAY'S CASES <br/><span>{this.state.usa.todayCases}</span> </div>
                <div className='todays-deaths'>TODAY'S DEATHS <br/><span>{this.state.usa.todayDeaths}</span></div>
                <div className='recovered'>TODAY'S RECOVERED <br/> <span>{this.state.usa.recovered}</span></div>
                <div className='critical'>CRITICAL <br/> <span>{this.state.usa.critical}</span></div>
                <div className='deaths'>DEATHS <br/><span>{this.state.usa.deaths}</span> </div>
            </div>
            <div className = "pi">
                <div className='country-pi'>{this.state.philippines.country}</div>
                <div className='cases'>CASES <br/><span>{this.state.philippines.cases}</span></div>
                <div className='today'>TODAY'S CASES <br/> <span>{this.state.philippines.todayCases}</span></div>
                <div className='todays-deaths'>TODAY'S DEATHS <br/><span>{this.state.philippines.todayDeaths}</span></div>
                <div className='recovered'>RECOVERED <br/><span>{this.state.philippines.recovered}</span></div>
                <div className='critical'>CRITICAL <br/> <span>{this.state.philippines.critical}</span></div>
                <div className='deaths'>DEATHS <br/> <span>{this.state.philippines.deaths}</span></div>
            </div>
            <div className='twitter-usa'>
                    <TwitterTimelineEmbed
                      sourceType="profile"
                      screenName="CDCemergency"
                      options={{height: 400, width: 500}}
                    />
            </div>
            <div className='twitter-pi'>
                  <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="WHOPhilippines"
                  options={{height: 400, width:500}}
                />

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