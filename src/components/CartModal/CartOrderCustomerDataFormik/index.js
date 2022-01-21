import {Formik} from "formik";
import {useDispatch} from "react-redux";
import CartOrderCustomerDataForm from "./CartOrderCustomerDataForm";

const CartOrderCustomerDataFormik = () => {

  const dispatch = useDispatch();

  const onHandleSubmit = (values) => {
  }

  const onHandleValidate = (values) => {

      const errors = {};

      if (!values.email) {
          errors.email = "can't be blank";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
          errors.email = 'Invalid email address';
      }

      if (!values.first_name) {
          errors.first_name = "can't be blank";
      } else if (!/^([A-Z]{1}[a-z]{1,23})$/i.test(values.first_name.trim())) {
          errors.first_name = 'Please enter a valid first name';
      }

      if (!values.last_name) {
          errors.last_name = "can't be blank";
      } else if (!/^([A-Z]{1}[a-z]{1,23})$/i.test(values.last_name.trim())) {
          errors.last_name = 'Please enter a valid last name';
      }

      if (!values.cell_phone) {
          errors.cell_phone = "can't be blank";
      } else if (!/^([0-9]{10})$/i.test(values.cell_phone.trim())) {
          errors.cell_phone = 'Please enter a ten digit phone number';
      }

      if (!values.address_line1) {
          errors.address_line1 = "can't be blank";
      }

      if (!values.city) {
          errors.city = "can't be blank";
      }

      if (!values.state_code) {
          errors.state_code = "can't be blank";
      }

      if (!values.time_at_residence) {
          errors.time_at_residence = "can't be blank";
      }

      if (!values.zip) {
          errors.zip = "can't be blank";
      } else if (!/^\d{5}(\d{4})?$/i.test(values.zip.trim())) {
          errors.zip = 'Please enter a five or nine digit zip code';
      }

      if (values.password && !/^(?=.*[0-9])(?=.*[!\@\#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!\@\#$%^&*]{8,70}$/i.test(values.password.trim())) {
          errors.password = 'Password must contain at least 8 characters and include: 1 uppercase, 1 lowercase, 1 digit and 1 special character.';
      }

      if (values.password && !values.confirm_password) {
          errors.confirm_password = "can't be blank";
      } else if ((values.password && values.confirm_password) && values.password.trim() !== values.confirm_password.trim()) {
          errors.confirm_password = "Password mismatch";
      }

      if (values.confirm_password && !values.password) {
          errors.password = "can't be blank";
      }

      return errors;
  }

  return (
      <Formik initialValues={{
          first_name: '',
          last_name: '',
          company: '',
          country: '',
          street: '',
          apartment: '',
          postal_code: '',
          city: '',
          phone: '',
          email: '',
          is_address_delivery: '',
          delivery_first_name: '',
          delivery_last_name: '',
          delivery_company: '',
          delivery_country: '',
          delivery_street: '',
          delivery_apartment: '',
          delivery_postal_code: '',
          delivery_city: '',
          notes: ''
      }}
              validate={onHandleValidate}
              onSubmit={onHandleSubmit}
      >
          {({submitForm, setValues, setFieldValue, values, errors, touched}) => {
              return <CartOrderCustomerDataForm submitForm={submitForm}
                                             setValues={setValues}
                                             setFieldValue={setFieldValue}
                                             values={values}
                                             errors={errors}
                                             touched={touched}
              />
          }
          }
      </Formik>
  )
};

export default CartOrderCustomerDataFormik;