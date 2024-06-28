import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { changeTextFilter } from "../../redux/filtersSlice";

export default function SearchBox() {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filters.name);

  function changeValue(e) {
    console.log(e.target.value);
    dispatch(changeTextFilter(e.target.value));
  }
  return (
    <div className={css.container}>
      <label className={css.label} htmlFor="filter">
        Find contacts by name
      </label>
      <input
        type="text"
        name="filter"
        className={css.input}
        id="filter"
        value={filter}
        onChange={changeValue}
      />
    </div>
  );
}
