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
  philippines_history:[],
  select:{},
  twitter:[],
  newcountries:[],
  countries_recovered:[],
  alameda :[],
  santa_clara:[],
  san_fran:[],


}

doFetch = () => {
  console.log("fetching")
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url1 = "https://corona.lmao.ninja/all"
  const url2 = "https://corona.lmao.ninja/countries"
  const url3 = 'https://ghoapi.azureedge.net/api/DIMENSION/usa/DimensionValues'
  const url4 ="https://coronavirus-tracker-api.herokuapp.com/all"
  let usTotal = 0
  fetch(url4)
      .then(response => response.json())
      .then(data => {
      console.log(data)
      this.setState({countries:data.confirmed.locations})
      console.log(this.state.countries)
      
      for (let i of this.state.countries){
        if (i.country === 'US'){
          usTotal += i.latest;
          if(i.province === 'Alameda County, CA'){
            console.log(i)
          }
          if(i.province === 'Santa Clara County, CA'){
            console.log(i)
          }
          if(i.province === 'San Francisco County, CA'){
            console.log(i)
          }
          if(i.province === 'Contra Costa County, CA'){
            console.log(i)
          }
          if(i.province === 'San Mateo, CA'){
            console.log(i)
          }
          if(i.province === 'Santa Cruz, CA'){
            console.log(i)
          }
        }
        this.state.usa.confirmed = usTotal;
        if (i.country === 'Philippines'){
          console.log(i)
          this.setState({philippines:{confirmed:i.latest}})
          var lowest = 0;
          var history = [];
          for (let [key, value] of Object.entries(i.history)) {
            if (value >= lowest){
              lowest = value
              history = key + ' : ' +value
            }
          }
          console.log(history)
          this.state.philippines.philippines_history = history
        }
      }
      this.setState({countries_recovered:data.recovered.locations})
      // loop through recovered list
      for (let i of this.state.countries_recovered){
        if (i.country === 'US'){
          if(i.province === 'Alameda County, CA'){
            console.log(i)
          }
        }
        if (i.country === 'Philippines'){
          console.log(i)
          this.state.philippines.recovered = i.latest;
        }
      }

      this.setState({world:data.latest})
      // loop through death list
      for (let i of data.deaths.locations){
        if (i.country === 'US'){
          if(i.province === 'Alameda County, CA'){
            console.log(i)
          }
        }
        if (i.country === 'Philippines'){
          console.log(i)
          this.state.philippines.deaths = i.latest;
        }
      }
      
      })
    .catch((err) => console.error(err));
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
              <div className='world-cases'>CASES <br/> <span>{this.state.world.confirmed} </span></div>
              <div className='world-deaths'>DEATHS <br/> <span>{this.state.world.deaths}</span></div>
              <div className='world-recovered'>RECOVERED <br/><span>{this.state.world.recovered}</span></div>
              
            
            </div>
            <div className = "usa">
                <div className='country-usa'>{this.state.usa.country}</div>
                <div className='cases'>CASES <br/> <span>{this.state.usa.confirmed}</span></div>
                <div className='today'>TODAY'S CASES <br/><span>{this.state.usa.todayCases}</span> </div>
                <div className='todays-deaths'>TODAY'S DEATHS <br/><span>{this.state.usa.todayDeaths}</span></div>
                <div className='recovered'>TODAY'S RECOVERED <br/> <span>{this.state.usa.recovered}</span></div>
                <div className='critical'>CRITICAL <br/> <span>{this.state.usa.critical}</span></div>
                <div className='deaths'>DEATHS <br/><span>{this.state.usa.deaths}</span> </div>
            </div>
            <div className = "pi">
                <div className='country-pi'>{this.state.philippines.country}</div>
                <div className='cases'>CASES <br/><span>{this.state.philippines.confirmed}</span></div>
                <div className='today'>LAST UPDATED <br/> <span>{this.state.philippines.philippines_history}</span></div>
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

// fetch(url2)
  //     .then(response => response.json())
  //     .then(data => {
  //     console.log('received twitter data', data)
  //     this.setState({countries:data})
  //     console.log(data[9])
      
  //     for (let i of data){
  //       if (i.country === 'USA'){
  //         this.setState({usa:i})

  //       }
  //       if (i.country === 'Philippines'){
  //         this.setState({philippines:i})

  //       }
  //     }
      
  //   })
  //   .catch((err) => console.error(err));
  


// fetchTwitter = () => {
//   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//   const url = 'https://corona.lmao.ninja/countries';
//   fetch(proxyUrl + url)
//     .then(response => response.json())
//     .then(data => {
//       console.log('received twitter data', data)
//       this.setState({twitter:data})

//     })
//   }