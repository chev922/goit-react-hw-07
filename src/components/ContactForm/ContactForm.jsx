import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addContact } from "../../redux/contactsOps";

export default function ContactForm() {
  const dispatch = useDispatch();
  const loaderBtn = useSelector((state) => state.contacts.loading.add);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Required")
      .min(3, "Too Short!")
      .max(50, "Too Long!"),
    number: yup
      .string()
      .required("Required")
      .matches(/^(\d+|\d+-\d+(?:-\d+)?)$/, "Must be only numbers"),
  });

  const formatPhoneNumber = (value) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue.replace(
      /(\d{3})(\d{2})(\d{2})/,
      "$1-$2-$3"
    );

    return formattedValue;
  };

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          number: "",
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(addContact(values));
          resetForm();
        }}
      >
        {({ setFieldValue }) => (
          <Form className={css.form}>
            <div>
              <label htmlFor="username_text" className={css.label}>
                Name
                <Field
                  type="text"
                  name="name"
                  className={css.input}
                  id="username_text"
                  placeholder="Viktor"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />
              </label>
            </div>
            <div>
              <label htmlFor="user_number" className={css.label}>
                Number
                <Field name="number">
                  {({ field }) => (
                    <input
                      {...field}
                      className={css.input}
                      id="user_number"
                      placeholder="123-45-67"
                      onChange={(e) => {
                        const formattedNumber = formatPhoneNumber(
                          e.target.value
                        );
                        setFieldValue("number", formattedNumber);
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="number"
                  component="div"
                  className={css.error}
                />
              </label>
            </div>
            <button className={css.btn} type="submit">
              {loaderBtn && (
                <div className={css.loader}>
                  <span className={css.bar}></span>
                  <span className={css.bar}></span>
                  <span className={css.bar}></span>
                </div>
              )}
              Add Contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
