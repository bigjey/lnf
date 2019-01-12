import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export default function setupStore() {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}