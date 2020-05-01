export const UPDATE_DATA = 'UPDATE_DATA';

export const initialState = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    lastUpdate: '',
    country: '',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case UPDATE_DATA:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
