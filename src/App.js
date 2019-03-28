import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router";

import Menu from './Menu';
import {getTracks} from "./actions/tracks";


/*class App extends Component {
    render() {
        function playlist(state = [], action) {
            if (action.type === 'ADD_TRACK') {
                return [
                    ...state,
                    action.payload
                ]
            }
            return state;
        }

        const store = createStore(playlist);

        store.subscribe(() => {
            console.log('subscribe', store.getState())
        });

        const click = () => {
            const trackName = this.refs.inputNameTrack.value;
            store.dispatch({type: 'ADD_TRACK', payload: trackName});
            const list = this.refs.list;
            list.innerHTML = '';
            this.refs.inputNameTrack.value = '';

            store.getState().forEach(track => {
                const li = document.createElement('li');
                li.textContent = track;
                list.appendChild(li)
            });
        };

        return (
            <div>
                <input type='text' ref="inputNameTrack"/>
                <button onClick={click}>Add track</button>

                <ul ref='list'>
                </ul>
            </div>
        );
    }
}*/


const App = ({tracks, onGetTracks, onAddTrack, onFindTrack, ownProps}) => {
    let trackInput = '';
    let searchInput = '';
    console.log(ownProps);

    const addTrack = () => {
        console.log(trackInput.value);
        onAddTrack(trackInput.value);
        trackInput.value = '';
    }

    const findTrack = () => {
        console.log(searchInput.value);
        onFindTrack(searchInput.value);
        searchInput.value = '';
    }

    return (
        <div>
            <Menu/>

            <div>
                <input type='text' ref={(input) => {
                    trackInput = input
                }}/>
                <button onClick={addTrack}>Add track</button>
            </div>
            <div>
                <input type='text' ref={(input) => {
                    searchInput = input
                }}/>
                <button onClick={findTrack}>Find track</button>
            </div>
            <div>
                <button onClick={onGetTracks}>Get tracks</button>
            </div>
            <ul>
                {tracks.map((track, index) =>
                    <li key={index}>
                        <Link to={`/tracks/${track.id}`}>{track.name}</Link>
                    </li>)}
            </ul>
        </div>
    );

}

export default connect(
    (state, ownProps) => ({
        tracks: state.tracks.filter(track => track.name.includes(state.filterTracks)),
        ownProps
    }),
    dispatch => ({
        onAddTrack: (name) => {
            const payload = {
                id: Date.now().toString(),
                name,
            };
            dispatch({type: 'ADD_TRACK', payload})
        },
        onFindTrack: (name) => {
            dispatch({type: 'FIND_TRACK', payload: name})
        },
        onGetTracks: () => {
            dispatch(getTracks());
        }
    })
)(App);
