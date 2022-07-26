export const createDataForUser = (formData) => {
  console.log('formData', formData)
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

export const createDataForSubmitOrder = (formData) => {

  const data = {
    doNotClearCartItems: 0,
    name: formData.first_name,
    email: formData.email,
    phone: formData.phone,
    street: formData.street,
    surname: formData.last_name,
    lastname: "",
    city: formData.city,
    room: formData.apartment,
    index: formData.postal_code,
    orderData: {
      id: "paysystem",
      delivery: "32",
      deliveryTime: "112312331",
      status: "12",
      comments: "comments here",
      store_id: "22",
      notes: "notes here",
      promo: "909WER32",
      orderType: "notes here"
    }
  };

  return data;
}
