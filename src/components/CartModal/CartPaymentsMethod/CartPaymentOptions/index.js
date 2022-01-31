import React, { useState } from "react";
import { Collapse } from "react-collapse/lib/Collapse";
import { isEmpty } from "./helper";
import Radio from "../../../Radio";
import PaymentTypeCards from "./PaymentTypeCards";
import paypalImage from "../../../../assets/images/paypal.png";
import klarnaImage from "../../../../assets/images/klarna.svg";
import "./style.css";

const CartPaymentOptions = () => {
  const [radioPaymentValue, setRadioPaymentValue] = useState("BankTransfer");
  const [radioCardValue, setRadioCardValue] = useState("DebitCharge");

  const paymentData = [
    {
      name: "BankTransfer",
      label: "Direkte Banküberweisung",
      text: "Überweise direkt an unsere Bankverbindung. Bitte nutze die Bestellnummer als Verwendungszweck. Deine Bestellung wird erst nach Geldeingang auf unserem Konto versandt.",
      image: null,
      link: null
    },
    {
      name: "PayPal",
      label:  "PayPal",
      image: paypalImage,
      link: {
        name: "Was ist PayPal?",
        address: process.env.REACT_APP_PAYPAL
      },
      text: "Mit Paypal bezahlen. Solltest du keinen Paypal-Account besitzen, kannst du auch mit deiner Kreditkarte bezahlen. Es fallen bei dieser Zahlungsmethode 3% PayPal Gebühren an.",
    },
    {
      name: "PayNow",
      label:  "Sofort bezahlen",
      image: klarnaImage,
      link: {
        name: "Was ist Klarna?",
        address: process.env.REACT_APP_KLARNA
      },
      text: <PaymentTypeCards radioValue={radioCardValue} setRadioValue={setRadioCardValue} />
    }
  ];

  return (
    <div className="CartPaymentOptions">
      <p>ZAHLUNGSART AUSWÄHLEN</p>
      
        {paymentData.map((typePayment, index) => <div key={index} className="CartPaymentOptions-method">
          <Radio 
          checked={radioPaymentValue === typePayment.name} 
          setRadioValue={setRadioPaymentValue} 
          label={<>{typePayment.label} {typePayment.image && <img src={typePayment.image} alt="logo type of payment" />}
          {!isEmpty(typePayment.link) && <a href={typePayment.link.address} target="_blank" rel="noreferrer">{typePayment.link.name}</a>}</>} 
          value={typePayment.name} />
        <Collapse
          isOpened={radioPaymentValue === typePayment.name}
          theme={{
            collapse: "CartPaymentOptions-method-collapse",
            content: "CartPaymentOptions-method-content",
          }}>
          <div className="CartPaymentOptions-method-content-data">{typePayment.text}</div>
        </Collapse>
      </div>)}
    </div>
  );
};

export default CartPaymentOptions;
