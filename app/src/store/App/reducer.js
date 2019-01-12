import types from './types';

const defaultState = {
    test: 'test',
};

export default (state = {...defaultState}, action) => {
    switch (action.type) {
        case types.LOADING_START:
            return {
                ...state,
                loading: true
            };
        case types.LOADING_END:
            return {
                ...state,
                loading: false
            };
        default:
            return state
    }
}