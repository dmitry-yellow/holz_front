import { useState } from "react";
import {Field, Form} from "formik";
import TextField from "../../../TextField";
import TextArea from "../../../TextArea";
import Select from "../../../Select";
import Checkbox from "../../../Checkbox";
import {Collapse} from "react-collapse/lib/Collapse";
import "../style.css";

const CartOrderCustomerDataForm = (props) => {
  const { submitForm, setValues, values, setFieldValue, errors, touched } = props;

  // const errorMessage = useSelector(state => state.firstPage.error_message);
  // const isFormSubmitting = useSelector(state => state.firstPage.isFormSubmitting);

  const [isOpenCollapseBlock, setIsOpenCollapseBlock] = useState(false);


  return <Form className='CartOrderCustomerDataForm' >
      <div className='CartOrderCustomerDataForm-line'/>
      <p>RECHNUNGSDETAILS</p>
      <div className='CartOrderCustomerDataForm-firstBlock'>
          <div className='CartOrderCustomerDataForm-firstBlock-box'>
              <Field
                component={TextField}
                autoComplete='off'
                name="first_name"
                type="text"
                label="Vorname"
                required={true}
              />
          </div>

          <div className='CartOrderCustomerDataForm-firstBlock-box'>
              <Field
                component={TextField}
                autoComplete='off'
                name="last_name"
                type="text"
                label="Nachname"
                required={true}
              />
          </div>

      </div>

      <div className='CartOrderCustomerDataForm-company-box'>
          <Field
            component={TextField}
            autoComplete='off'
            name="company"
            type="company"
            label="Firmenname (optional)"
          />
      </div>


      <div className='CartOrderCustomerDataForm-country-box'>
          <Field
            component={Select}
            autoComplete='off'
            name="country"
            type="text"
            label="Land / Region"
            required={true}
          />
      </div>

      <div className='CartOrderCustomerDataForm-fourthBlock'>
          <div className='CartOrderCustomerDataForm-fourthBlock-box'>
              <Field
                component={TextField}
                autoComplete='off'
                name="street"
                type="text"
                label="Straße"
                placeholder="Straßenname und Hausnummer"
                required={true}
              />
          </div>

          <div className='CartOrderCustomerDataForm-fourthBlock-box'>
              <Field
                component={TextField}
                autoComplete='off'
                name="apartment"
                type="text"
                placeholder="Wohnung, Suite, Zimmer usw. (optional)"
              />
          </div>
      </div>

      <div className='CartOrderCustomerDataForm-postalCode'>
          <Field
            component={TextField}
            autoComplete='off'
            name="postal_code"
            type="text"
            label="Postleitzahl"
            required={true}
          />
      </div>

      <div className='CartOrderCustomerDataForm-city'>
          <Field
            component={TextField}
            autoComplete='off'
            name="city"
            type="text"
            label="Ort / Stadt"
            required={true}
          />
      </div>

      <div className='CartOrderCustomerDataForm-phone'>
          <Field
            component={TextField}
            autoComplete='off'
            name="phone"
            type="text"
            label="Telefon"
            required={true}
          />
      </div>

      <div className='CartOrderCustomerDataForm-email'>
          <Field
            component={TextField}
            autoComplete='off'
            name="email"
            type="text"
            label="E-Mail-Adresse"
            required={true}
          />
      </div>
      <div>
        <div className='CartOrderCustomerDataForm-delivery'>
            <Field
                component={Checkbox}
                checked={isOpenCollapseBlock}
                name="is_address_delivery"
                label="Lieferung an eine andere Adresse senden?"
                setChecked={setIsOpenCollapseBlock}
            />
          </div>
                <Collapse
                    isOpened={isOpenCollapseBlock}
                    theme={{
                        collapse: 'CartOrderCustomerDataForm-collapse',
                        content: 'CartOrderCustomerDataForm-content'
                    }}
                >
        <div className='CartOrderCustomerDataForm-firstBlock'>
          <div className='CartOrderCustomerDataForm-firstBlock-box'>
              <Field
                component={TextField}
                autoComplete='off'
                name="first_name"
                type="text"
                label="Vorname"
                required={true}
              />
          </div>

          <div className='CartOrderCustomerDataForm-firstBlock-box'>
              <Field
                component={TextField}
                autoComplete='off'
                name="last_name"
                type="text"
                label="Nachname"
                required={true}
              />
          </div>

      </div>

      <div className='CartOrderCustomerDataForm-company-box'>
          <Field
            component={TextField}
            autoComplete='off'
            name="company"
            type="company"
            label="Firmenname (optional)"
          />
      </div>


      <div className='CartOrderCustomerDataForm-country-box'>
          <Field
            component={TextField}
            autoComplete='off'
            name="country"
            type="text"
            label="Land / Region"
            required={true}
          />
      </div>

      <div className='CartOrderCustomerDataForm-fourthBlock'>
      <div className='CartOrderCustomerDataForm-fourthBlock-box'>
              <Field
                component={TextField}
                autoComplete='off'
                name="street"
                type="text"
                label="Straße"
                placeholder="Straßenname und Hausnummer"
                required={true}
              />
          </div>

          <div className='CartOrderCustomerDataForm-fourthBlock-box'>
              <Field
                component={TextField}
                autoComplete='off'
                name="apartment"
                type="text"
                placeholder="Wohnung, Suite, Zimmer usw. (optional)"
              />
          </div>
      </div>

      <div className='CartOrderCustomerDataForm-postalCode'>
          <Field
            component={TextField}
            autoComplete='off'
            name="postal_code"
            type="text"
            label="Postleitzahl"
            required={true}
          />
      </div>

      <div className='CartOrderCustomerDataForm-city'>
          <Field
            component={TextField}
            autoComplete='off'
            name="city"
            type="text"
            label="Ort / Stadt"
            required={true}
          />
      </div>
        </Collapse>
      </div>
      <div className='CartOrderCustomerDataForm-note'>
          <Field
            component={TextArea}
            autoComplete='off'
            name="notes"
            type="text"
            label="Anmerkungen zur Bestellung (optional)"
            placeholder="Anmerkungen zu deiner Bestellung, z.B. besondere Hinweise für die Lieferung."
          />
      </div>
  </Form>
};

export default CartOrderCustomerDataForm;