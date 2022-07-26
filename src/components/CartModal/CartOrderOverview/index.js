import { Formik } from "formik";
import {useDispatch, useSelector} from "react-redux";
import CartOrderCustomerDataForm from "./CartOrderCustomerDataForm";
import CartPaymentsMethod from "../CartPaymentsMethod";
import { setUserData } from "../../../actions/cart";
import { countries } from "./helper";
import { useStepper } from "../../customHooks/useStepper";
import "./style.css";

const CartOrderOverview = () => {

    const session = useSelector(state => state.cart.session);
    const { setStep } = useStepper();
    const dispatch = useDispatch();

    const onHandleSubmit = (values) => {
        dispatch(setUserData(values, session));
        setStep(2);
    }

    const onHandleValidate = (values) => {
        const errors = {};

    if (!values.first_name) {
      errors.first_name = "can't be blank";
    } else if (!/^([A-Z]{1}[a-z]{1,23})$/i.test(values.first_name.trim())) {
      errors.first_name = "Please enter a valid first name";
    }

    if (!values.last_name) {
      errors.last_name = "can't be blank";
    } else if (!/^([A-Z]{1}[a-z]{1,23})$/i.test(values.last_name.trim())) {
      errors.last_name = "Please enter a valid last name";
    }

    if (!values.street) {
      errors.street = "can't be blank";
    }

    if (!values.apartment) {
      errors.apartment = "can't be blank";
    }

    if (!values.postal_code) {
      errors.postal_code = "can't be blank";
    } else if (!/^\d{5,10}$/i.test(values.postal_code.trim())) {
      errors.postal_code = "Please enter a correct code";
    }

    if (!values.city) {
      errors.city = "can't be blank";
    }

    if (!values.phone) {
      errors.phone = "can't be blank";
    } else if (!/^([0-9]{10})$/i.test(values.phone.trim())) {
      errors.phone = "Please enter a ten digit phone number";
    }

    if (!values.email) {
      errors.email = "can't be blank";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
      errors.email = "Invalid email address";
    }

    if (values.is_address_delivery) {
      if (!values.delivery_first_name) {
        errors.delivery_first_name = "can't be blank";
      } else if (!/^([A-Z]{1}[a-z]{1,23})$/i.test(values.delivery_first_name.trim())) {
        errors.delivery_first_name = "Please enter a valid first name";
      }

      if (!values.delivery_last_name) {
        errors.delivery_last_name = "can't be blank";
      } else if (!/^([A-Z]{1}[a-z]{1,23})$/i.test(values.delivery_last_name.trim())) {
        errors.delivery_last_name = "Please enter a valid last name";
      }

      if (!values.delivery_street) {
        errors.delivery_street = "can't be blank";
      }

      if (!values.delivery_apartment) {
        errors.delivery_apartment = "can't be blank";
      }

      if (!values.delivery_postal_code) {
        errors.delivery_postal_code = "can't be blank";
      } else if (!/^\d{5,10}$/i.test(values.delivery_postal_code.trim())) {
        errors.delivery_postal_code = "Please enter a correct code";
      }

      if (!values.delivery_city) {
        errors.delivery_city = "can't be blank";
      }
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        company: "",
        country: countries[6],
        street: "",
        apartment: "",
        postal_code: "",
        city: "",
        phone: "",
        email: "",
        is_address_delivery: false,
        delivery_first_name: "",
        delivery_last_name: "",
        delivery_company: "",
        delivery_country: countries[6],
        delivery_street: "",
        delivery_apartment: "",
        delivery_postal_code: "",
        delivery_city: "",
        notes: "",
      }}
      validate={onHandleValidate}
      onSubmit={onHandleSubmit}
    >
      {({ submitForm, setValues, setFieldValue, values, errors, touched }) => {
        return (
        <div className="CartOrderOverview">
            <div className="CartOrderOverview-formik">
                <CartOrderCustomerDataForm
                    submitForm={submitForm}
                    setValues={setValues}
                    setFieldValue={setFieldValue}
                    values={values}
                    errors={errors}
                    touched={touched}
                />
            </div>
            <CartPaymentsMethod />
        </div>
        );
      }}
    </Formik>
  );
};

export default CartOrderOverview;