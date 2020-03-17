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
import {TwitterTimelineEmbed} from 'react-twitter-embed';


class App extends Component {
state = {
  world : [],
  countries:[],
  usa:[],
  philippines:{},
  philippines_history:[],
  select:{},
  twitter:[],
  newcountries:[],
  countries_recovered:[],
  alameda :[],
  santa_clara:[],
  san_fran:[],
  us_death: 0,
  california:[],
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
        }
        if(i.province === 'california'){
          this.setState({ california: { ...this.state.california, confirmed: i.latest}
          })

          var lowest = 0;
          var us_history = [];
          for (let [key, value] of Object.entries(i.history)) {
              if (value >= lowest){
                lowest = value
                us_history = key
              }
            }
          this.setState({usa:{...this.state.usa, history: us_history}})


          
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
      let us_recovered = 0 
      for (let i of this.state.countries_recovered){
        if (i.country === 'US'){
          us_recovered += i.latest
          
        }
        if (i.country === 'Philippines'){
          console.log(i)
          this.state.philippines.recovered = i.latest;
        }

        if(i.province === 'california'){
          this.setState({ california: { ...this.state.california, recovered: i.latest}
          })
          
        }
      }
      this.state.usa.recovered = us_recovered;
      this.setState({world:data.latest})
      // loop through death list
      let us_deaths =0
      for (let i of data.deaths.locations){   
        if (i.country === 'US'){
          us_deaths += i.latest;
          if(i.province === 'california'){
            this.setState({ california: { ...this.state.california, deaths: i.latest}
            })
            
          }
        }
        if (i.country === 'Philippines'){
          console.log(i)
          this.setState({ philippines: { ...this.state.philippines, deaths: i.latest}
        })
      }
    }
      console.log(us_deaths)
      this.setState({ usa: { ...this.state.usa, deaths: us_deaths}})
      console.log(this.state.usa.deaths)
      this.setState({us_death:us_deaths})
      
      })
    .catch((err) => console.error(err));
    }
  

componentDidMount = () => {
  this.doFetch()
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
                <div className='country-usa'>USA</div>
                <div className='cases'>CASES <br/> <span>{this.state.usa.confirmed}</span></div>
                <div className='today'>LAST UPDATED <br/> <span>{this.state.usa.history}</span></div>
                <div className='recovered'>RECOVERED <br/> <span>{this.state.usa.recovered}</span></div>
                <div className='deaths'>DEATHS <br/><span>{this.state.us_death}</span> </div>
            </div>
            <div className = "pi">
                <div className='country-pi'>PHILIPPINES</div>
                <div className='cases'>CASES <br/><span>{this.state.philippines.confirmed}</span></div>
                <div className='today'>LAST UPDATED <br/> <span>{this.state.philippines.philippines_history}</span></div>
                <div className='recovered'>RECOVERED <br/><span>{this.state.philippines.recovered}</span></div>
                <div className='deaths'>DEATHS <br/> <span>{this.state.philippines.deaths}</span></div>
            </div>
            <div className = "ca">
                <div className='country-pi'>CALIFORNIA</div>
                <div className='cases'>CASES <br/><span>{this.state.philippines.confirmed}</span></div>
                <div className='today'>LAST UPDATED <br/> <span>{this.state.philippines.philippines_history}</span></div>
                <div className='recovered'>RECOVERED <br/><span>{this.state.philippines.recovered}</span></div>
                <div className='deaths'>DEATHS <br/> <span>{this.state.philippines.deaths}</span></div>
            </div>
            <div className = "pi">
                <div className='country-pi'>PHILIPPINES</div>
                <div className='cases'>CASES <br/><span>{this.state.philippines.confirmed}</span></div>
                <div className='today'>LAST UPDATED <br/> <span>{this.state.philippines.philippines_history}</span></div>
                <div className='recovered'>RECOVERED <br/><span>{this.state.philippines.recovered}</span></div>
                <div className='deaths'>DEATHS <br/> <span>{this.state.philippines.deaths}</span></div>
            </div>
            
            <div className='twitter-pi'>
                  <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="WHOPhilippines"
                  options={{height: 400, width:500}}
                />

            </div>
            <div className = "all">
            </div>
        
        
        
        </div>
      
      </header>
    </div>
  );
  }
}
export default App;

// this.setState({ usa: { ...this.state.usa, deaths: us_deaths}

// <FormControl className='select'>
// <InputLabel id="demo-controlled-open-select-label">Select Country</InputLabel>
// <Select
//   labelId="demo-controlled-open-select-label"
//   id="demo-controlled-open-select"

// >
// <MenuItem value="">
// <em>None</em>
// </MenuItem>
// {this.state.countries.map((country, index) => (
// <MenuItem value={country.country} onClick={()=> this.clicked(country.country) }>{country.country}</MenuItem>
// ))}

// </Select>
// </FormControl>