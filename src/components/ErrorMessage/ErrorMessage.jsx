import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div>
      <b className={css.error}>
        Oops, an error occurred. Please refresh the page and check your internet
        connection.
      </b>
    </div>
  );
}
