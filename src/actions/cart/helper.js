export const createDataForUser = (formData) => {

  const data = {...formData};
  if (!data.is_address_delivery) {
    data.delivery_first_name = data.first_name;
    data.delivery_last_name = data.last_name;
    data.delivery_company = data.company;
    data.delivery_country = data.country;
    data.delivery_street = data.street;
    data.delivery_apartment = data.apartment;
    data.delivery_postal_code = data.postal_code;
    data.delivery_city = data.city;
  }
  delete data.is_address_delivery;

  return data;
}