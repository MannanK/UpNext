import {combineReducers} from 'redux';
import interestsReducer from './interests_reducer';
import recommendationsReducer from './recommendations_reducer';

export default combineReducer({
    interests: interestsReducer,
    recommendations: recommendationsReducer
});