import {combineReducers} from 'redux';
import interestsReducer from './interests_reducer';
import recommendationsReducer from './recommendations_reducer';
import genresReducer from './genres_reducer';

export default combineReducers({
    interests: interestsReducer,
    recommendations: recommendationsReducer,
    genres: genresReducer
});