import { useContext } from "react";
import { useEffect, useState } from "react";
import NetflixOriginalsItems from "../netflix-originals-items/netflix-originals-items.componant";
import { DataContext } from "../provider/dataProvider.componant";
const NetflixOriginals = () => {
  let [originalsArr, setOriginalsArr] = useState([]);
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
    //filter series array based on genre
    let arrSeries = seriesArr1.filter((ele) => {
      return ele.isNetflixSeries;
    });
    //filter movies array based on genre
    let arrMovies = moviesArr1.filter((ele) => {
      return ele.isNetflixSeries;
    });
    //filter recent data array based on genre
    let arrRecent = totalData1.filter((ele) => {
      return ele.isNetflixSeries;
    });
    // check if the url is movies

    if (window.location.href.includes("movies")) {
      setOriginalsArr(arrMovies);
    } // check if the url is tv show
    else if (window.location.href.includes("tvshows")) {
      setOriginalsArr(arrSeries);
    } else if (window.location.href.includes("recently")) {
      setOriginalsArr(arrRecent);
    }
    // else the url is home, then include everything
    else {
      let arrAll = arrMovies.concat(arrSeries);
      setOriginalsArr(arrAll);
    }
  }, [seriesArr, moviesArr, totalData]);
  return (
    <>
      {originalsArr.length > 0 ? (
        <div className="category-group">
          <h3>Netflix Originals</h3>
          <div className="list-group">
            {originalsArr.map((e, i) => {
              return <NetflixOriginalsItems e={e} key={e + i} />;
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default NetflixOriginals;
