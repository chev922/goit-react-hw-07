import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {
  selectError,
  selectLoadGet,
  selectFilteredContacts,
} from "../../redux/contactsSlice";
import { useSelector } from "react-redux";

export default function ContactList() {
  const tasks = useSelector(selectFilteredContacts);
  const loader = useSelector(selectLoadGet);
  const error = useSelector(selectError);
  return (
    <>
      {tasks.length > 0 && (
        <ul className={css.list}>
          {tasks.map((contact) => (
            <Contact key={contact.id} item={contact} />
          ))}
        </ul>
      )}
      {loader && <Loader />}
      {error && <ErrorMessage />}
    </>
  );
}
