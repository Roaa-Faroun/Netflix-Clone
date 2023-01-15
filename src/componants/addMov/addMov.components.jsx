import "./addMov.css";
import Multiselect from "multiselect-react-dropdown";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Plus } from "phosphor-react";
// import { movies } from "../../assets/data/data";
import { useContext } from "react";
import { DataContext } from "../provider/dataProvider.componant";
const AddMov = () => {
  let [addMovies, setAddMovies] = useState(true);
  let { setMovies, moviesArr, seriesArr, setSeries } = useContext(DataContext);
  const allGenre = [
    "drama",
    "action",
    "history",
    "crime",
    "fantasy",
    "thriller",
    "romance",
  ];
  const handleAddSeries = () => {
    setAddMovies(false);
  };
  const handleAddMovies = () => {
    setAddMovies(true);
  };
  let [options, setOptions] = useState([...allGenre]);

  const navigate = useNavigate();
  function returnAdmin() {
    navigate("/admin");
  }

  let [genre, setGenre] = useState([]);
  let [cast, setCast] = useState(1);
  let [epi, setEpi] = useState(1);
  let [castInput, setCastInput] = useState([]);
  let [episode, setEpisode] = useState([]);
  const addCastInput = () => {
    if (castInput.length < 4) {
      setCast(cast + 1);
      setCastInput([...castInput, "0"]);
    }
  };
  const addEpisodeInput = () => {
    if (episode.length < 4) {
      setEpi(epi + 1);
      setEpisode([...episode, "0"]);
    }
  };
  const handleAddMovie = (e) => {
    e.preventDefault();
    let newCast = [];

    for (let i = 0; i < cast; i++) {
      console.log(cast);
      if (cast === 1) {
        newCast.push(e.target.cast.value);
        console.log(e.target.cast.value);
        break;
      }
      newCast.push(e.target.cast[i].value);
    }
    let newMovie = {
      id: Date.now(),
      name: e.target.showName.value,
      about: e.target.showAbout.value,
      isNetflixSeries: e.target.production.value.includes("Netflix"),
      genre: genre,
      Duration: e.target.duration.value,
      isMovie: true,
      rate: 0,
      cast: newCast,
      portaitImage: e.target.portraitImage.value,
      landscapeImg: e.target.landscapeImage.value,
    };
    console.log(newMovie);
    setMovies([...moviesArr, newMovie]);

    success();
  };
  const handleCreateSeries = (e) => {
    e.preventDefault();
    let newCast = [];

    for (let i = 0; i < cast; i++) {
      if (cast === 1) {
        newCast.push(e.target.cast.value);
        console.log(e.target.cast.value);
        break;
      }
      newCast.push(e.target.cast[i].value);
    }
    // }
    let newEpisodes = {};
    for (let i = 0; i < epi; i++) {
      if (epi === 1) {
        let s = {};
        s[`s1`] = parseInt(e.target.epi.value);
        newEpisodes = { ...newEpisodes, ...s };
        break;
      }
      let s = {};
      s[`s${i + 1}`] = parseInt(e.target.epi[i].value);
      newEpisodes = { ...newEpisodes, ...s };
    }
    let newSeries = {
      id: Date.now(),
      name: e.target.showName.value,
      about: e.target.showAbout.value,
      isNetflixSeries: e.target.production.value.includes("Netflix"),
      season: e.target.season.value,
      episodes: newEpisodes,
      genre: genre,
      rate: 0,
      isMovie: false,
      cast: newCast || [e.target.cast[0].value],
      portaitImage: e.target.portraitImage.value,
      landscapeImg: e.target.landscapeImage.value,
    };
    console.log(newSeries);
    setSeries([...seriesArr, newSeries]);
    success();
    // Swal.fire("Good job!", "You clicked the button!", "success");
  };
  function success() {
    Swal.fire({
      title: "Success",
      type: "success",
      text: "Your work has been saved.",
    });
    navigate("/admin");
  }
  const handleGenre = (event) => {
    setGenre(event);
  };

  return (
    <div className="b">
      <button className="go-back" onClick={() => window.history.back()}>
        <ArrowLeft size={32} color="#c9c9c9" weight="bold" />
      </button>
      <div className="upper">
        <div className="tabs-btns">
          <button
            className={!addMovies ? "active" : ""}
            onClick={handleAddSeries}
          >
            Add Series
          </button>
          <button
            className={addMovies ? "active" : ""}
            onClick={handleAddMovies}
          >
            Add Movie
          </button>
        </div>
        <div className="wrapper">
          {addMovies ? (
            <>
              <div className="title">Create Movie</div>
              <form className="form" onSubmit={(e) => handleAddMovie(e)}>
                <div className="inputField">
                  <label>Movie Name</label>
                  <input
                    required
                    placeholder="Add Movie Name/Title"
                    type="text"
                    name="showName"
                    className="input"
                  />
                </div>
                <div className="inputField">
                  <label>About Movie</label>
                  <textarea
                    required
                    type="text"
                    name="showAbout"
                    placeholder="Write a Brief Summary"
                    className="input"
                  />
                </div>
                <div className="inputField">
                  <label>Genre</label>
                  <Multiselect
                    onSelect={(e) => handleGenre(e)}
                    className="select-genre"
                    isObject={false}
                    options={options}
                  />
                </div>
                <div className="inputField">
                  <label>Duration</label>
                  <input
                    required
                    type="input"
                    className="input"
                    name="duration"
                    placeholder="2h 2m"
                  />
                </div>
                <div className="inputField cast">
                  <label>cast</label>
                  <div className="cast-inputs">
                    <input required name="cast" type="text" className="input" />
                    {castInput.length > 0 &&
                      castInput.map((e) => {
                        return (
                          <>
                            <input
                              required
                              name="cast"
                              type="text"
                              className="input new"
                            />
                            <br />
                          </>
                        );
                      })}
                  </div>
                  <div
                    className={
                      castInput.length < 4 ? "add-cast" : "add-cast disable"
                    }
                    onClick={addCastInput}
                    disabled={castInput.length < 4}
                  >
                    <Plus size={25} color="#fff" />
                  </div>
                </div>
                <div className="inputField">
                  <label>Production</label>
                  <input
                    required
                    name="production"
                    type="text"
                    className="input"
                  />
                </div>

                <div className="inputField">
                  <label>portaitImage</label>
                  <input
                    required
                    type="url"
                    className="input"
                    name="portraitImage"
                  />
                </div>
                <div className="inputField">
                  <label>landscapeImg</label>
                  <input
                    required
                    type="url"
                    name="landscapeImage"
                    className="input"
                  />
                </div>
                <div className="inputField">
                  <button type="submit" className="btn">
                    Add Movie
                  </button>
                  <button type="reset" className="btn" onClick={returnAdmin}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="title">Create Series</div>
              <form className="form" onSubmit={(e) => handleCreateSeries(e)}>
                <div className="inputField">
                  <label>Series Name</label>
                  <input
                    required
                    placeholder="Add Movie Name/Title"
                    type="text"
                    name="showName"
                    className="input"
                  />
                </div>
                <div className="inputField">
                  <label>About Series</label>
                  <textarea
                    required
                    type="text"
                    name="showAbout"
                    placeholder="Write a Brief Summary"
                    className="input"
                  />
                </div>
                <div className="inputField">
                  <label>Genre</label>
                  <Multiselect
                    onSelect={(e) => handleGenre(e)}
                    className="select-genre"
                    isObject={false}
                    options={options}
                  />
                </div>
                <div className="inputField">
                  <label>How Many Seasons </label>
                  <input
                    required
                    type="input"
                    className="input"
                    name="season"
                    placeholder="3,5"
                  />
                </div>
                <div className="inputField cast">
                  <label>Episode</label>
                  <div className="cast-inputs">
                    <input required name="epi" type="text" className="input" />
                    {episode.length > 0 &&
                      episode.map((e) => {
                        return (
                          <>
                            <input
                              required
                              name="epi"
                              type="text"
                              className="input new"
                            />
                            <br />
                          </>
                        );
                      })}
                  </div>
                  <div
                    className={
                      castInput.length < 4 ? "add-cast" : "add-cast disable"
                    }
                    onClick={addEpisodeInput}
                    disabled={episode.length < 4}
                  >
                    <Plus size={25} color="#fff" />
                  </div>
                </div>
                <div className="inputField cast">
                  <label>cast</label>
                  <div className="cast-inputs">
                    <input required name="cast" type="text" className="input" />
                    {castInput.length > 0 &&
                      castInput.map((e) => {
                        return (
                          <>
                            <input
                              required
                              name="cast"
                              type="text"
                              className="input new"
                            />
                            <br />
                          </>
                        );
                      })}
                  </div>
                  <div
                    className={
                      castInput.length < 4 ? "add-cast" : "add-cast disable"
                    }
                    onClick={addCastInput}
                    disabled={castInput.length < 4}
                  >
                    <Plus size={25} color="#fff" />
                  </div>
                </div>
                <div className="inputField">
                  <label>Production</label>
                  <input
                    required
                    name="production"
                    type="text"
                    className="input"
                  />
                </div>

                <div className="inputField">
                  <label>portaitImage</label>
                  <input
                    required
                    type="url"
                    className="input"
                    name="portraitImage"
                  />
                </div>
                <div className="inputField">
                  <label>landscapeImg</label>
                  <input
                    required
                    type="url"
                    name="landscapeImage"
                    className="input"
                  />
                </div>
                <div className="inputField">
                  <button type="submit" className="btn">
                    Add Series
                  </button>
                  <button type="reset" className="btn" onClick={returnAdmin}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddMov;
