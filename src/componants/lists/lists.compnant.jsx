import "./list.css";
import Genre from "../genre/genre.componant";
import TopFiveSeries from "../TopFiveSeries/TopFiveSeries.componant";
import NetflixOriginals from "../netflix-originals/netflixoriginals.componant";

const List = (props) => {
  const allListsGenre = [
    "drama",
    "action",
    "history",
    "crime",
    "fantasy",
    "thriller",
    "romance",
  ];

  return (
    <div className="List">
      {allListsGenre.map((e, i) => {
        return <Genre genre={e} key={e + i} />;
      })}
      <NetflixOriginals />
      <TopFiveSeries />
    </div>
  );
};
export default List;
