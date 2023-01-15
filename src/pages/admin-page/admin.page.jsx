import "./admin.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../componants/provider/dataProvider.componant";
const Admin = () => {
  let { user, onOut, moviesArr, setMovies, seriesArr, setSeries } =
    useContext(DataContext);
  const [localMov, setMov] = useState(
    JSON.parse(localStorage.getItem("moviesArr")) || []
  );
  const [localSer, setSer] = useState(
    JSON.parse(localStorage.getItem("seriesArr")) || []
  );
  let [total, setTotal] = useState([]);
  useEffect(() => {
    if (localSer.length > 0 && localMov.length > 0) {
      let all = localMov.concat(localSer);
      setTotal(all);
    }
  }, [localMov, localSer]);
  const navigate = useNavigate();
  const addMovie = () => {
    navigate("/add");
  };
  const handleRet = () => {
    navigate("/home");
  };

  const handleVisit = (id, isMovie) => {
    if (isMovie) {
      navigate(`/movies/${id}`);
    } else {
      navigate(`/series/${id}`);
    }
  };
  const handleDel = (id) => {
    let newMovies = moviesArr.filter((e) => {
      return e.id !== id;
    });
    let newSeries = seriesArr.filter((e) => {
      return e.id !== id;
    });
    let all = newMovies.concat(newSeries);
    setTotal(all);
    setMovies(newMovies);
    setSeries(newSeries);
    localStorage.setItem("moviesArr", JSON.stringify(newMovies));
    localStorage.setItem("seriesArr", JSON.stringify(newSeries));
    setMov(localMov?.filter((item) => item.id !== id));
    setSer(localSer?.filter((item) => item.id !== id));
  };
  const handleLogOut = () => {
    onOut(null);
  };
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="mainDiv">
      <div className="admin-logout-header">
        <button className="logOut" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
      <div className="head">
        <span className="manage">Manage Movies</span>
        <div className="headbtn">
          <button className="but1" onClick={addMovie}>
            Create Movie
          </button>
          <button className="but2" onClick={handleRet}>
            Home
          </button>
        </div>
        <div className="moviesCards">
          <span className="title">Movies and Series list</span>
          <div className="spans">
            <span className="hash">#</span>
            <span className="mTit">Movies Title</span>
            <span className="mGen">Genre</span>
            <span className="mOp">Operation</span>
          </div>
          {total &&
            total.map((item, index) => (
              <div className="card1" key={item.id}>
                <span className="no">{index + 1}</span>
                <img
                  className="movImg"
                  src={item.portaitImage}
                  alt="MovieImg"
                />
                <span className="tit">{item.name}</span>
                <span className="type">
                  {item.genre.map((e) => {
                    return <span>{e + ", "}</span>;
                  })}
                </span>
                <div className="actions1">
                  <button
                    className="bt1"
                    onClick={() => handleVisit(item.id, item.isMovie)}
                  >
                    visit
                  </button>
                  <button className="bt2">edit</button>
                  <button className="bt3" onClick={() => handleDel(item.id)}>
                    delete
                  </button>
                </div>
              </div>
            ))}
          {/* {localSer.map((item, index) => (
            <div className="card1" key={item.id}>
              <span className="no">{index + 1}</span>
              <img className="movImg" src={item.portaitImage} alt="MovieImg" />
              <span className="tit">{item.name}</span>
              <span className="type">{item.genre}</span>
              <div className="actions1">
                <button className="bt1" onClick={() => handleVisit(item.id)}>
                  visit
                </button>
                <button className="bt2">edit</button>
                <button className="bt3" onClick={() => handleDel(item.id)}>
                  delete
                </button>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
