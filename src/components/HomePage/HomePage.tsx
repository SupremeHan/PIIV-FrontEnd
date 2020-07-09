import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import MovieType from '../../types/MovieType';
import api, { ApiResponse } from '../../api/api';
import './HomePage.css';
import ApiMovieDto from '../../dto/ApiMovieDto';
import { Link } from 'react-router-dom';
import { ApiConfig } from '../../config/api.config';

interface HomePageState {
    movies: MovieType[];
    value: number;
    
}


interface SingleMovieProperties {
  movie: MovieType,
}


class HomePage extends React.Component<SingleMovieProperties> {
  state: HomePageState;


  constructor(props: Readonly<SingleMovieProperties>) {
    super(props);

    this.state = {
      movies: [],
      value: 0,
      
    }

    
  }
  private getMovies() {
    api('api/movie', 'get', {})
    .then( (res: ApiResponse) => {
      this.putMoviesInState(res.data);
    });
}

private putMoviesInState(data: ApiMovieDto[]) {
    const moives: MovieType[] = data.map(movie => {
      let a = {
        movieId: movie.movieId,
        title: movie.title,
        genre: movie.genre,
        duration: movie.duration,
        director: movie.director,
        description: movie.description,
        imageUrl: movie.imageUrl,
      };
      return a;
    });
      const newState = Object.assign(this.state, {
        movies: moives,
      });

      this.setState(newState);
    
}

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <Container>
        <div className="navbar">
          <img src={process.env.PUBLIC_URL + '/assets/logo.png'} className="mx-auto logo" />
          <Link to='/auth/login'> <img src={process.env.PUBLIC_URL + '/assets/login.png'} className="float-right login"/> </Link>
         
        </div>
        <hr/>
        <h1 className="text-left naslov">Repertoar bioskopa</h1>
         
            <Row>
              {this.state.movies.map(this.singleMovie)}
            </Row>
      </Container>
    );
  }

  private singleMovie(movie: MovieType) {
    return(
      <Col md="6">
        <Row className="movie">
              <div className="movie-img">
                <img src={ApiConfig.PHOTO_PATH + movie.imageUrl } alt="slika"/>
              </div>
              <div className="movie-info">
                <h2>
                  { movie.title }
                </h2>
                <p>{ movie.director }</p>
                <p>{ movie.genre }</p>
                <p className="nesto">{ movie.duration } min</p>
                <div className="rate">
                  <input type="radio" id="star5" name="rate" value="5" />
                  <label htmlFor="star5" title="text">5 stars</label>
                  <input type="radio" id="star4" name="rate" value="4" />
                  <label htmlFor="star4" title="text">4 stars</label>
                  <input type="radio" id="star3" name="rate" value="3" />
                  <label htmlFor="star3" title="text">3 stars</label>
                  <input type="radio" id="star2" name="rate" value="2" />
                  <label htmlFor="star2" title="text">2 stars</label>
                  <input type="radio" id="star1" name="rate" value="1" />
                  <label htmlFor="star1" title="text">1 star</label>
                </div>
                <div className="more">
                  <Link to={`/api/movie/${ movie.movieId }`}><p className="budjav">Vise Informacija</p></Link>
                </div>
              </div>
             
        </Row>
      </Col>
    )
  }

  

 
}

export default HomePage;
