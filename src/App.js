import React, { Component } from 'react';
import SpaceDetails from './components/SpaceDetails';
import querystring from 'querystring';
import './App.scss';
import loader from './loader.gif';
import noData from './no-data.png';


const API_BASE_URL = "https://api.spacexdata.com/v3/launches?";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      filters: {
        limit: 100,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      },
    }

  }

  getUpdatedApiUrl(filters = {}) {
    return API_BASE_URL + querystring.stringify({ ...filters });
  }

  fetchAPI(filters) {
    const URL = this.getUpdatedApiUrl(filters);
    this.setState({ isLoaded: false, filters });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          data
        });
      });
  }

  componentDidMount() {
    this.fetchAPI(this.state.filters);
  }

  updateApiFilters(type, value) {
    // if same value is clicked, we remove that filter
    if (this.state.filters[type] === value) {
      value = undefined;
    }

    const filters = {
      ...this.state.filters,
      [type]: value,
    };

    this.fetchAPI(filters);
  }


  render() {

    const { isLoaded, data } = this.state;
    const uniqueLaunchYears = new Array(16).fill(0).map((_, index) => {
    
    return   (2006 + index)
  });

    if (!isLoaded) {
      return <div className="App-loader-container">
        <div className="App-loader-box">
          <img src={loader} alt="loading..." />
        </div>
      </div>
    }

    else {

      return (
        <div className="App">
          <h1 className="App-header">SpaceX Launch Programs</h1>
          <div>
            <div className="containt-container">
                <div className="App-filter-card filter-container">
                  <div>
                  <div className="filter-card-area">
                    <div className="App-filter-header">
                      <h5>Filters</h5>
                      
                    </div>
                    <div className="App-filter-heading-launch-year">
                        Launch Year
                      
                     
                    </div>
                        <hr className="App-filters-hr" />
                    <div>
                      <div className="App-filter-button-container">
                        {uniqueLaunchYears.map((year, index) => {
                          return (
                            <button
                              className={this.state.filters.launch_year === year.toString() ? "success App-filter-button" : "outline-success App-filter-button"}
                              key = {index}
                              value={year}
                              onClick={(e) =>
                                this.updateApiFilters(
                                  "launch_year",
                                  e.target.value
                                )
                              }
                            >
                              {year}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="App-filter-heading">
                      Successful Launch
                      
                    </div>
                  <hr className="App-filters-hr" />
                    <div className="App-filter-button-container">
                    <button
                              className={this.state.filters.launch_success === "true" ? "success App-filter-button" : "outline-success App-filter-button"}
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="true"
                      >
                        True
                      </button>

                      <button
                              className={this.state.filters.launch_success === "false" ? "success App-filter-button" : "outline-success App-filter-button"}
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="false"
                      >
                        False
                      </button>
                    </div>

                    <div className="App-filter-heading">
                      Successful Landing
                     
                    </div> 
                    <hr className="App-filters-hr" />
                    <div className="App-filter-button-container">
                      <button
                    
                        className={this.state.filters.land_success === "true" ? "success App-filter-button" : "outline-success App-filter-button"}
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="true"
                      >
                        True
                      </button>

                      <button
                      className={this.state.filters.land_success === "false" ? "success App-filter-button" : "outline-success App-filter-button"}
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="false"
                      >
                        False
                      </button>
                    </div>
                  </div>
                </div>
                </div>

          
              {data && data.length > 0 ? 
                <div className="space-data-conatainer">
                  {data.map((details, index) => {
                    return (
                        <SpaceDetails key={index} details={details} />
                    );
                  })}
              </div>  : 
                <div className="nodata"><img src={noData} alt="no-data" /></div>  }
              </div>

            <div>
              <h5 className="App-Developers-name">
                Developed by : Parvinder Singh 
              </h5>
            </div>
          </div>
        </div>
      );
    }

  }
}

export default App;
