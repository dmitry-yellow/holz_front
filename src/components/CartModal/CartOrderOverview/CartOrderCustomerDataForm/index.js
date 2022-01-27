import { Form } from "formik";
import TextField from "../../../TextField";
import TextArea from "../../../TextArea";
import Select from "../../../Select";
import Checkbox from "../../../Checkbox";
import { Collapse } from "react-collapse/lib/Collapse";
import { countries } from "../helper";
import "./style.css";

const CartOrderCustomerDataForm = (props) => {

  const { submitForm, setValues, values, setFieldValue, errors, touched } = props;

  // const errorMessage = useSelector(state => state.firstPage.error_message);
  // const isFormSubmitting = useSelector(state => state.firstPage.isFormSubmitting);

  const handleFirstNameChange = (event) => {
    setFieldValue("first_name", event.target.value);
  };

  const handleLastNameChange = (event) => {
    setFieldValue("last_name", event.target.value);
  };

  const handleCompanyChange = (event) => {
    setFieldValue("company", event.target.value);
  };

  const handleCountryChange = (country) => {
    setFieldValue("country", country);
  };

  const handleStreetChange = (event) => {
    setFieldValue("street", event.target.value);
  };

  const handleApartmentChange = (event) => {
    setFieldValue("apartment", event.target.value);
  };

  const handlePostalCodeChange = (event) => {
    setFieldValue("postal_code", event.target.value);
  };

  const handleCityChange = (event) => {
    setFieldValue("city", event.target.value);
  };

  const handlePhoneChange = (event) => {
    setFieldValue("phone", event.target.value);
  };

  const handleEmailChange = (event) => {
    setFieldValue("email", event.target.value);
  };

  const handleIsAddressDeliveryChange = (isOpen) => {
    setFieldValue("is_address_delivery", isOpen);
  };

  const handleDeliveryFirstNameChange = (event) => {
    setFieldValue("delivery_first_name", event.target.value);
  };

  const handleDeliveryLastNameChange = (event) => {
    setFieldValue("delivery_last_name", event.target.value);
  };

  const handleDeliveryCompanyChange = (event) => {
    setFieldValue("delivery_company", event.target.value);
  };

  const handleDeliveryCountryChange = (country) => {
    setFieldValue("delivery_country", country);
  };

  const handleDeliveryStreetChange = (event) => {
    setFieldValue("delivery_street", event.target.value);
  };

  const handleDeliveryApartmentChange = (event) => {
    setFieldValue("delivery_apartment", event.target.value);
  };

  const handleDeliveryPostalCodeChange = (event) => {
    setFieldValue("delivery_postal_code", event.target.value);
  };

  const handleDeliveryCityChange = (event) => {
    setFieldValue("delivery_city", event.target.value);
  };

  const handleNotesChange = (event) => {
    setFieldValue("notes", event.target.value);
  };

  return (
    <Form className="CartOrderCustomerDataForm">
      <div className="CartOrderCustomerDataForm-line" />
      <p>RECHNUNGSDETAILS</p>
      <div className="CartOrderCustomerDataForm-firstBlock">
        <div className="CartOrderCustomerDataForm-firstBlock-box">
          <TextField
            autoComplete="off"
            name="first_name"
            type="text"
            label="Vorname"
            required={true}
            value={values.first_name}
            onChange={handleFirstNameChange}
            error={errors.first_name && touched['first_name']}
          />
        </div>

        <div className="CartOrderCustomerDataForm-firstBlock-box">
          <TextField
            autoComplete="off"
            name="last_name"
            type="text"
            label="Nachname"
            required={true}
            value={values.last_name}
            onChange={handleLastNameChange}
            error={errors.last_name && touched['last_name']}
          />
        </div>
      </div>

      <div className="CartOrderCustomerDataForm-company-box">
        <TextField
          autoComplete="off"
          name="company"
          type="company"
          label="Firmenname (optional)"
          value={values.company}
          onChange={handleCompanyChange}
        />
      </div>

      <div className="CartOrderCustomerDataForm-country-box">
        <Select
          autoComplete="off"
          name="country"
          type="text"
          label="Land / Region"
          required={true}
          options={countries}
          value={values.country}
          onChange={handleCountryChange}
        />
      </div>

      <div className="CartOrderCustomerDataForm-fourthBlock">
        <div className="CartOrderCustomerDataForm-fourthBlock-box">
          <TextField
            autoComplete="off"
            name="street"
            type="text"
            label="Straße"
            placeholder="Straßenname und Hausnummer"
            required={true}
            value={values.street}
            onChange={handleStreetChange}
            error={errors.street && touched['street']}
          />
        </div>

        <div className="CartOrderCustomerDataForm-fourthBlock-box">
          <TextField
            autoComplete="off"
            name="apartment"
            type="text"
            placeholder="Wohnung, Suite, Zimmer usw. (optional)"
            value={values.apartment}
            onChange={handleApartmentChange}
            error={errors.apartment && touched['apartment']}
          />
        </div>
      </div>

      <div className="CartOrderCustomerDataForm-postalCode">
        <TextField
          autoComplete="off"
          name="postal_code"
          type="text"
          label="Postleitzahl"
          required={true}
          value={values.postalCode}
          onChange={handlePostalCodeChange}
          error={errors.postal_code && touched['postal_code']}
        />
      </div>

      <div className="CartOrderCustomerDataForm-city">
        <TextField
          autoComplete="off"
          name="city"
          type="text"
          label="Ort / Stadt"
          required={true}
          value={values.city}
          onChange={handleCityChange}
          error={errors.city && touched['city']}
        />
      </div>

      <div className="CartOrderCustomerDataForm-phone">
        <TextField
          autoComplete="off"
          name="phone"
          type="text"
          label="Telefon"
          required={true}
          value={values.phone}
          onChange={handlePhoneChange}
          error={errors.phone && touched['phone']}
        />
      </div>

      <div className="CartOrderCustomerDataForm-email">
        <TextField
          autoComplete="off"
          name="email"
          type="text"
          label="E-Mail-Adresse"
          required={true}
          value={values.email}
          onChange={handleEmailChange}
          error={errors.email && touched['email']}
        />
      </div>
      <div>
        <div className="CartOrderCustomerDataForm-delivery">
          <Checkbox
            checked={values.is_address_delivery}
            name="is_address_delivery"
            label="Lieferung an eine andere Adresse senden?"
            setChecked={handleIsAddressDeliveryChange}
          />
        </div>
        <Collapse
          isOpened={values.is_address_delivery}
          theme={{
            collapse: "CartOrderCustomerDataForm-collapse",
            content: "CartOrderCustomerDataForm-content",
          }}
        >
          <div className="CartOrderCustomerDataForm-firstBlock">
            <div className="CartOrderCustomerDataForm-firstBlock-box">
              <TextField
                autoComplete="off"
                name="delivery_first_name"
                type="text"
                label="Vorname"
                required={true}
                value={values.delivery_first_name}
                onChange={handleDeliveryFirstNameChange}
                error={errors.delivery_first_name && touched['delivery_first_name']}
              />
            </div>

            <div className="CartOrderCustomerDataForm-firstBlock-box">
              <TextField
                autoComplete="off"
                name="delivery_last_name"
                type="text"
                label="Nachname"
                required={true}
                value={values.delivery_last_name}
                onChange={handleDeliveryLastNameChange}
                error={errors.delivery_last_name && touched['delivery_last_name']}
              />
            </div>
          </div>

          <div className="CartOrderCustomerDataForm-company-box">
            <TextField
              autoComplete="off"
              name="delivery_company"
              type="text"
              label="Firmenname (optional)"
              value={values.delivery_company}
              onChange={handleDeliveryCompanyChange}
            />
          </div>

          <div className="CartOrderCustomerDataForm-country-box">
            <Select
              name="delivery_country"
              type="text"
              label="Land / Region"
              required={true}
              options={countries}
              value={values.delivery_country}
              onChange={handleDeliveryCountryChange}
            />
          </div>

          <div className="CartOrderCustomerDataForm-fourthBlock">
            <div className="CartOrderCustomerDataForm-fourthBlock-box">
              <TextField
                autoComplete="off"
                name="delivery_street"
                type="text"
                label="Straße"
                placeholder="Straßenname und Hausnummer"
                required={true}
                value={values.delivery_street}
                onChange={handleDeliveryStreetChange}
                error={errors.delivery_street && touched['delivery_street']}
              />
            </div>

            <div className="CartOrderCustomerDataForm-fourthBlock-box">
              <TextField
                autoComplete="off"
                name="delivery_apartment"
                type="text"
                placeholder="Wohnung, Suite, Zimmer usw. (optional)"
                value={values.delivery_apartment}
                onChange={handleDeliveryApartmentChange}
                error={errors.delivery_apartment && touched['delivery_apartment']}
              />
            </div>
          </div>

          <div className="CartOrderCustomerDataForm-postalCode">
            <TextField
              autoComplete="off"
              name="delivery_postal_code"
              type="text"
              label="Postleitzahl"
              required={true}
              value={values.delivery_postal_code}
              onChange={handleDeliveryPostalCodeChange}
              error={errors.delivery_postal_code && touched['delivery_postal_code']}
            />
          </div>

          <div className="CartOrderCustomerDataForm-city">
            <TextField
              autoComplete="off"
              name="delivery_city"
              type="text"
              label="Ort / Stadt"
              required={true}
              value={values.delivery_city}
              onChange={handleDeliveryCityChange}
              error={errors.delivery_city && touched['delivery_city']}
            />
          </div>
        </Collapse>
      </div>
      <div className="CartOrderCustomerDataForm-note">
        <TextArea
          autoComplete="off"
          name="notes"
          type="text"
          label="Anmerkungen zur Bestellung (optional)"
          placeholder="Anmerkungen zu deiner Bestellung, z.B. besondere Hinweise für die Lieferung."
          value={values.notes}
          onChange={handleNotesChange}
        />
      </div>
    </Form>
  );
};

export default CartOrderCustomerDataForm;
