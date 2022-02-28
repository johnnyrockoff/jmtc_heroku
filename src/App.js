import React from "react";
import "./App.css";
import "./style/Cards.css";
import TableChars from "./components/TableChars";
import { getAllChars, getHomeworldById, getSpeciesById, getFilmsById } from './services/api'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Chars: [],
            TotalRecords: {},
            DataisLoaded: false
        };
    }

    componentDidMount() {
        getAllChars().then(response => {
            if (Object.keys(response.data.results).length > 0) {
                response.data.results.map(async (char) => {
                    let allMovies = [];
                    if (Object.keys(char.homeworld).length > 0) {
                        await getHomeworldById(char.homeworld).then(planet => {
                            char.homeworld = planet.data;
                        }).catch(error => {
                            console.log(error)
                        });
                    }

                    if (Object.keys(char.species).length > 0) {
                        await getSpeciesById(char.species[0]).then(specie => {
                            char.species = specie.data;
                        }).catch(error => {
                            console.log(error)
                        });
                    }

                    if (Object.keys(char.films).length > 0) {
                        char.films.map(async (film) => {
                            await getFilmsById(film).then(result => {
                                allMovies.push(result);
                            }).catch(error => {
                                console.log(error)
                            }).finally(function() {
                                char.films = allMovies;
                            });

                        });
                    }

                    this.setState({DataisLoaded: true});
                    this.updateTableChars(char);
                })
            }
        }).catch(error => {console.log(error);})
    }

    updateTableChars = (charsData) => {
        this.setState(prevState => ({Chars: [...prevState.Chars, charsData]}));
    }

    render() {
        /*chars={this.state.Chars}*/
        const { DataisLoaded, chars } = this.state;
        if (!DataisLoaded)
            return <center> <img className="load" src={require('./assets/load.gif')} /> </center>;

        return (
            <div>
                <br />
                <TableChars chars={this.state.Chars} />
            </div>
        );
    }
}

export default App;