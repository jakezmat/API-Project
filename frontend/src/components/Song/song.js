import { NavLink } from "react-router-dom";
import "./Song.css";

function Song(song) {
  // console.log(song.song.url)
  return (

    <NavLink
    to={`/songs/${song.song.id}`}
    // style={isActive => ({
    //   color: isActive ? "black" : "black"
    // })}
    style={{ textDecoration: 'none',
              color:"black" }}
    activeStyle={isActive => ({
    color: isActive? "black" : "black"
    })}
    >
      <div id="test">
        <img
          id="placeholder-img"
          src={
            song.song.previewImage !== (null || "")
            ? song.song.previewImage
            : "https://i.imgur.com/QwtY70m.jpg"
          }

        ></img>
        <div id="title">{song.song.title}</div>

      </div>
    </NavLink>
  );
}

export default Song;
