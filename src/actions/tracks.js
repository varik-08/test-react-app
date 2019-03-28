let mockApiData = [
    {
        id: 1,
        name: 'Track 1'
    },
    {
        id: 2,
        name: 'Track 2'
    },
    {
        id: 3,
        name: 'Track 3'
    },
    {
        id: 4,
        name: 'Track 4'
    },
    {
        id: 5,
        name: 'Track 5'
    },
];

export const getTracks = () => dispatch => {
    setTimeout(() => {
        console.log('I got tracks');
        dispatch({type: 'FETCH_TRACKS_SUCCESS', payload: mockApiData})
    }, 2000)

};