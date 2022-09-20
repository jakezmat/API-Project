import { csrfFetch } from "./csrf";
const LOAD_CURRENT = "songs/LOAD_CURRENT";
const LOAD_ALL = "songs/LOAD_ALL";
const LOAD_ONE = "songs/LOAD_ONE";
const ADD_ONE = "songs/ADD_ONE";
const EDIT_ONE = "songs/EDIT_ONE";
const DELETE_ONE = 'songs/DELETE_ONE'

const loadCurrent = (songs) => ({
  type: LOAD_CURRENT,
  songs,
});
const load = (songs) => ({
  type: LOAD_ALL,
  songs,
});
const loadOneSong = (song) => ({
  type: LOAD_ONE,
  song,
});
//ID NOT NECESSARY HERE?

const addOneSong = (songs) => ({
  type: ADD_ONE,
  songs,
});
const editSong = (song) => ({
  type: EDIT_ONE,
  song,
});
const deleteSong = (songId) => ({
  type: DELETE_ONE,
  songId
})

export const eviscerateSong = songId => async dispatch => {
  const res = await csrfFetch(`/api/songs/${songId}`, {
    method: "DELETE",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(songId)
  })
  if (res.ok) {
    const data = res.json()
    await dispatch(deleteSong(songId))
    return data
  }
}
export const getAllSongs = () => async (dispatch) => {
  const res = await csrfFetch("/api/songs");

  if (res.ok) {
    const data = await res.json();
    dispatch(load(data));
    return data;
  }
};

export const getSongsByCurrentUser = () => async (dispatch) => {
  const response = await fetch("/api/songs/current");
  //TODO ADD PARAMS TO SHOW RELATED ARTIST
  if (response.ok) {
    const data = await response.json();
    dispatch(loadCurrent(data));
    return data;
  }
};

export const getSongDeets = (songId) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${songId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadOneSong(data));
    return data;
  }
};
export const editSongForm = (song) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${song.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editSong(data));
    return data;
  }
};

export const addSong = (song) => async (dispatch) => {
  const res = await csrfFetch("/api/songs/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addOneSong(data));
    return data;
  }
};

const initialState = {
    allSongs: {},
    singleSong: {},
  }


const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENT:
      let newState = {...state, allSongs:{...state.allSongs}};
      action.songs.Songs.forEach((song) => (newState.allSongs[song.id] = song));
      console.log("LOAD CURRENT", newState)
      return newState;
    case ADD_ONE: {
      const newState = { ...state, allSongs:{...state.allSongs, [action.song.id]: action.song}};
      console.log("ADD SONG",newState)
      return  newState ;
    }
    case LOAD_ONE:
      const song = action.song;
      return { ...song };
    case LOAD_ALL: {
      const newState = {};
      action.songs.Songs.forEach((song) => {
        newState[song.id] = song;
      });
      return { ...newState };
    }
    case EDIT_ONE:
      return {
        ...state,
        [action.song.id]: action.song,
      };
    case DELETE_ONE:
    {
      const newState={...state}
      delete newState[action.songId]
      return newState
    }
    default:
      return state;
  }
};

export default songReducer;
