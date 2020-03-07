import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
state = {
  world : [],
  countries:[],
  usa:{},
  philippines:{}
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
      console.log(data)
      console.log(data[9])
      this.setState({countries:data})
      this.setState({usa:data[9]})
      this.setState({philippines:data[57]})
    })
    .catch((err) => console.error(err));
  
}

componentDidMount = () => {
  this.doFetch()

}

render() {
  
  return (
    
    <div className="App">
      <header className="App-header">
        <div className = "corona-container">
            <div className = "world">
              WORLD
              <div className='world-cases'>CASES : {this.state.world.cases} </div>
              <div className='world-deaths'>DEATHS : {this.state.world.deaths}</div>
              <div className='world-recovered'>RECOVERED : {this.state.world.recovered}</div>
              
            
            </div>
            <div className = "usa">
                <div className='country'>COUNTRY : {this.state.usa.country}</div>
                <div className='cases'>CASES : &nbsp &nbsp {this.state.usa.cases}</div>
                <div className='today'>TODAY'S CASES : &nbsp &nbsp  {this.state.usa.todayCases}</div>
                <div className='deaths'>TODAY'S DEATHS : &nbsp&nbsp {this.state.usa.todayDeaths}</div>
                <div className='recovered'>TODAY'S RECOVERED : &nbsp &nbsp {this.state.usa.recovered}</div>
                <div className='critical'>CRITICAL : -&nbsp &nbsp {this.state.usa.critical}</div>
            </div>
            <div className = "pi">
                <div className='country'>COUNTRY :{this.state.philippines.country}</div>
                <div className='cases'>CASES :{this.state.philippines.cases}</div>
                <div className='today'>{this.state.philippines.todayCases}</div>
                <div className='deaths'>{this.state.philippines.todayDeaths}</div>
                <div className='recovered'>{this.state.philippines.recovered}</div>
                <div className='critical'>{this.state.philippines.critical}</div>
            </div>
            <div className = "all">
            4
            
            </div>
        
        
        
        </div>
      
      </header>
    </div>
  );
  }
}
export default App;