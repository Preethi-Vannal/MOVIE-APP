import React from 'react';
import axios from 'axios';
import './movieCard.css';

const IMGURL="https://image.tmdb.org/t/p/w500";
class MovieCard extends React.Component {
    state = {
        movieData: {}
    };
    componentDidMount(){
        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?api_key=d2e7f1f4aa6ae23cfa2616f68588b0ef&with_original_language=hi&query=${
                    this.props.movietitle
                }&overview=full`
            )
            .then(results => results.data)
            .then(results => {
                this.setState({movieData:results.results});
            });
    }
    render (){
        const {
            title,
            release_date,
            overview,
            poster_path,
            genre_ids=[],
            vote_average
        }=this.props.movietitle || {};
        return (
            <div className="movie-card-container">
                <div className="img-container">
                    <div 
                        className="bg-image" 
                        style={{backgroundImage: `url(${IMGURL+poster_path})`}}
                    />
                </div>
                <div className="movie-info">
                    <h2>Details of the movie</h2>
                    <div>
                        <h1>{title}</h1>
                        <small>Released Date:{release_date}</small>
                    </div>
                    <h4>Imdb Rating: {vote_average}/10</h4>
                    <p>{overview && overview.substr(0,350)}</p>
                    <div className="genres-container">
                        {genre_ids && 
                            genre_ids.map(g=> {
                                let names=[];
                                if(parseInt(g.id)===genre_ids){
                                    names.push(g.name);
                                }
                                {/*<span key={g}>{g}</span>*/}
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default MovieCard;