import React, { Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movies, series } from "../../assets/data/data";
import MyList from "../../pages/myList/mylist.page";
// import { data } from "../../assets/data/data";
export const DataContext = React.createContext({});

const fetchUser = () => {
  const temp = JSON.parse(localStorage.getItem("userIn"));
  return temp || null;
};
const DataProvider = (props) => {
  let [changedPath, setChangedPath] = useState(false);
  let [user, setUser] = useState(fetchUser());
  const [moviesArr, setMovies] = useState([]);
  const [seriesArr, setSeries] = useState([]);
  const [totalData, setTotal] = useState([]);
  const [showID, setshowID] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (moviesArr.length > 0 && seriesArr.length > 0) {
      let totalData = moviesArr.concat(seriesArr);
      if (totalData.length > 0) {
        totalData.sort((one, two) =>
          one.rate > two.rate ? -1 : two.rate > one.rate ? 1 : 0
        );
        setTotal(totalData.slice(0, 8));
      }
    }
  }, [seriesArr, moviesArr]);
  useEffect(() => {
    if (seriesArr.length > 0) {
      localStorage.setItem("seriesArr", JSON.stringify(seriesArr));
    }
  }, [seriesArr]);
  useEffect(() => {
    if (moviesArr.length > 0) {
      localStorage.setItem("moviesArr", JSON.stringify(moviesArr));
    }
  }, [moviesArr, seriesArr]);
  useEffect(() => {
    // fetch("https://netflixproject-series.free.beeceptor.com/series")
    // .then((res) => {
    //   if (res.status === 429) {
    //     return null;
    //   } else {
    //     return res.json();
    //   }
    // })
    // .then((data) => setSeries(data || series))
    // .catch((error) => Error("server is off"));
    // fetch("https://netflixproject-series.free.beeceptor.com/movies")
    //   .then((res) => {
    //     if (res.status === 429) {
    //       return null;
    //     } else {
    //       return res.json();
    //     }
    //   })
    //   .then((data) => setMovies(data || movies))
    //   .catch((error) => Error("server is off"));
    setSeries(series);
    setMovies(movies);
    if (movies.length > 0 && series.length > 0) {
      let totalData = movies.concat(series);
      if (totalData.length > 0) {
        totalData.sort((one, two) =>
          one.rate > two.rate ? -1 : two.rate > one.rate ? 1 : 0
        );
        setTotal(totalData.slice(0, 8));
      }
    }
    localStorage.setItem("seriesArr", JSON.stringify(series));
    localStorage.setItem("moviesArr", JSON.stringify(movies));
    readLogUser();
  }, []);

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem("userIn", JSON.stringify(user));
    }
  }, [user]);

  const onOut = (u) => {
    // fetch(`https://netflixclone.free.beeceptor.com/users`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     ...user,
    //   }),
    // });
    setUser(u);
    // localStorage.removeItem("moviesArr");
    // localStorage.removeItem("seriesArr");
    localStorage.removeItem("userIn");
    navigate("/login");
  };
  // Putting user in the local storage
  const readLogUser = () => {
    const savedUser = localStorage.getItem("userIn");
    if (savedUser !== null) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  };
  //login function
  const handleLogIn = (user) => {
    setUser(user);
    // localStorage.setItem("userIn", JSON.stringify(user));
  };
  // handle showing header or not depending on the location
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);
  return (
    <DataContext.Provider
      value={{
        onOut,
        handleLogIn,
        user,
        setUser,
        seriesArr,
        moviesArr,
        showID,
        setshowID,
        setChangedPath,
        changedPath,
        setMovies,
        setSeries,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
export default DataProvider;
