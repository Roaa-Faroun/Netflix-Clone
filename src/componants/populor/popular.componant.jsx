import "./popular.css";
import { useEffect, useState, useContext } from "react";
import logo from "../../assets/imgs/logo/n.png";
import { Link } from "react-router-dom";
import { DataContext } from "../provider/dataProvider.componant";
const Popular = (props) => {
  const [popular, setPopular] = useState([]);
  const { seriesArr, moviesArr, totalData } = useContext(DataContext);
  let [seriesArr1, setSeries] = useState(
    seriesArr || localStorage.getItem(JSON.parse("seriesArr"))
  );
  let [moviesArr1, setMovies] = useState(
    moviesArr || localStorage.getItem(JSON.parse("moviesArr"))
  );
  let totalData12 = moviesArr1.concat(seriesArr1);
  if (totalData12.length > 0) {
    totalData12.sort((one, two) =>
      one.rate > two.rate ? -1 : two.rate > one.rate ? 1 : 0
    );
  }
  let [totalData1, setTotal] = useState(totalData || totalData12.slice(0, 8));

  useEffect(() => {
    //filter series array based on rate
    let arrSeries = [...seriesArr1];
    arrSeries.sort((one, two) =>
      one.rate > two.rate ? -1 : two.rate > one.rate ? 1 : 0
    );
    arrSeries = arrSeries.slice(0, 5);
    /////////////////////////////////////////
    //filter movies array based on rate
    let arrMovies = [...moviesArr1];
    arrMovies.sort((one, two) =>
      one.rate > two.rate ? -1 : two.rate > one.rate ? 1 : 0
    );
    arrMovies = arrMovies.slice(0, 5);
    ///////////////////////////////
    //filter recent data array based on rate
    let arrRecent = [...totalData1];
    arrRecent.sort((one, two) =>
      one.rate > two.rate ? -1 : two.rate > one.rate ? 1 : 0
    );
    arrRecent = arrRecent.slice(0, 5);

    // check if the url is movies

    if (window.location.href.includes("movies")) {
      setPopular(arrMovies);
    } // check if the url is tv show
    else if (window.location.href.includes("tvshows")) {
      setPopular(arrSeries);
    } else if (window.location.href.includes("recently")) {
      setPopular(arrRecent);
    }
    // else the url is home, then include everything
    else {
      let arrAll = arrMovies.concat(arrSeries);
      arrAll.sort((one, two) =>
        one.rate > two.rate ? -1 : two.rate > one.rate ? 1 : 0
      );
      arrAll = arrAll.slice(0, 5);
      setPopular(arrAll);
    }
  }, [seriesArr, moviesArr, totalData]);

  return (
    <>
      <h3 className="pop">Popular</h3>
      <div className="popular">
        {popular.length !== 0 &&
          popular.map((e, i) => {
            return (
              <Link
                key={e.id}
                to={e.isMovie ? `/movies/${e.id}` : `/series/${e.id}`}
              >
                <div className="lists-trend">
                  {e.isNetflixSeries ? (
                    <img src={logo} className="netflix-logo-position" />
                  ) : null}
                  <img src={e.landscapeImg} />
                  <span className="show-name title">{e.name}</span>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};
export default Popular;
