import React from "react";
import './movieCard.css';
import './Header.css';
import MovieCard from './movie-card';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import MovieIcon from '@material-ui/icons/Movie';
class MoviesList extends React.Component {
    state = {
        moviesList: [{}],
        searchField:""
    };

    search = event => {
        event.preventDefault();
        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?api_key=d2e7f1f4aa6ae23cfa2616f68588b0ef&with_original_language=hi&query=${
                    this.state.searchField
                }&overview=full`
            )
            .then(results => results.data)
            .then(results=> {
                if(!results.results) {
                    this.setState({moviesList: [{}]});
                    return;
                }
                this.setState({
                    moviesList:results.results
                });
            });    
    };
    handleChange = event => {
        this.setState({
            searchField: event.target.value
        });
    };
    render() {
        const { moviesList } = this.state;
        return (
            <div>
                <div className="header">
                    <span onClick={ () => window.scroll(0,0)}>
                        <MovieIcon/> MOVIE WORLD <MovieIcon/>
                    </span>
                </div>
                <form onSubmit={this.search}>
                    <div className="searchbar">
                        <input 
                            type="text" 
                            className="searchbar-input" 
                            name="search" 
                            placeholder="Search for movies"
                            onChange={this.handleChange}
                        />
                        <button type="submit" className="searchbar-button">
                            <SearchIcon/>
                        </button>
                    </div>
                </form>
                {moviesList.length > 0 ? (
                    moviesList.map(movie => (
                        <MovieCard movietitle={movie} key={movie}/>
                    ))
                ) : (
                    <p>No movies match the search criteria</p>
                )}
            </div>
        );
    }
}
export default MoviesList;