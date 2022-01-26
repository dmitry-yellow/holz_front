import React, { useState } from "react";
import { Collapse } from "react-collapse/lib/Collapse";
import cn from "classnames";
import paypalImage from "../../../../assets/images/paypal.png";
import klarnaImage from "../../../../assets/images/klarna.svg";
import maestroCardImage from "../../../../assets/images/maestroCard.svg";
import masterCardImage from "../../../../assets/images/masterCard.svg";
import visaCardImage from "../../../../assets/images/visaCard.svg";
import visaElectronCardImage from "../../../../assets/images/visaElectronCard.svg";
import "./style.css";

const CartPaymentOptions = () => {
  const [radioPaymentValue, setRadioPaymentValue] = useState("BankTransfer");
  const [radioCardValue, setRadioCardValue] = useState("DebitCharge");

  return (
    <div className="CartPaymentOptions">
      <p>ZAHLUNGSART AUSWÄHLEN</p>
      <div className="CartPaymentOptions-method">
        <label className={cn( "CartPaymentOptions-method-radio", radioPaymentValue === "BankTransfer" && "checked" )}>
          <input
            type="radio"
            value="BankTransfer"
            checked={radioPaymentValue === "BankTransfer"}
            onChange={(e) => {
                setRadioPaymentValue(e.target.value);
            }}
          />Direkte Banküberweisung
        </label>
        <Collapse
          isOpened={radioPaymentValue === "BankTransfer"}
          theme={{
            collapse: "CartPaymentOptions-method-collapse",
            content: "CartPaymentOptions-method-content",
          }}>
          <p>
            Überweise direkt an unsere Bankverbindung. Bitte nutze die
            Bestellnummer als Verwendungszweck. Deine Bestellung wird erst nach
            Geldeingang auf unserem Konto versandt.
          </p>
        </Collapse>
      </div>
      <div className="CartPaymentOptions-method">
        <label className={cn("CartPaymentOptions-method-radio", radioPaymentValue === "PayPal" && "checked")}>
          <input
            type="radio"
            value="PayPal"
            checked={radioPaymentValue === "PayPal"}
            onChange={(e) => {
                setRadioPaymentValue(e.target.value);
            }}
          />PayPal
          <img src={paypalImage} />
          <a src={process.env.REACT_APP_PAYPAL} target="_blank" rel="noreferrer" >Was ist PayPal?</a>
        </label>
        <Collapse
          isOpened={radioPaymentValue === "PayPal"}
          theme={{
            collapse: "CartPaymentOptions-method-collapse",
            content: "CartPaymentOptions-method-content",
          }}>
          <p>
            Mit Paypal bezahlen. Solltest du keinen Paypal-Account besitzen,
            kannst du auch mit deiner Kreditkarte bezahlen. Es fallen bei dieser
            Zahlungsmethode 3% PayPal Gebühren an.
          </p>
        </Collapse>
      </div>
      <div className="CartPaymentOptions-method">
        <label className={cn("CartPaymentOptions-method-radio", radioPaymentValue === "PayNow" && "checked")}>
            <input
            type="radio"
            value="PayNow"
            checked={radioPaymentValue === "PayNow"}
            onChange={(e) => {
                setRadioPaymentValue(e.target.value);
            }}
            />Sofort bezahlen
            <img src={klarnaImage} />
            <a src={process.env.REACT_APP_KLARNA} target="_blank" rel="noreferrer">Was ist Klarna?</a>
        </label>
        <Collapse
            isOpened={radioPaymentValue === "PayNow"}
            theme={{
            collapse: "CartPaymentOptions-method-collapse",
            content: "CartPaymentOptions-method-content",
            }}>
            <div className="CartPaymentOptions-method-payNow">
                <p className="CartPaymentOptions-method-payNow-title">Jetzt bezahlen.</p>
                <p className="CartPaymentOptions-method-payNow-subtitle">Schnell und sicher</p>
                
                <label className={"CartPaymentOptions-method-payNow-radio"}>
                    <input
                    type="radio"
                    value="DebitCharge"
                    checked={radioCardValue === "DebitCharge"}
                    onChange={(e) => {
                        setRadioCardValue(e.target.value);
                    }}
                    /><div className={radioCardValue === "DebitCharge" ? "checkedCard" : "noCheckedCard"}>Lastschrift</div>
                </label>
                
                <label className={"CartPaymentOptions-method-payNow-radio"}>
                    <input
                    type="radio"
                    value="BankTransfer"
                    checked={radioCardValue === "BankTransfer"}
                    onChange={(e) => {
                        setRadioCardValue(e.target.value);
                    }}
                    /><div className={radioCardValue === "BankTransfer" ? "checkedCard" : "noCheckedCard"}>Sofortüberweisung</div>
                </label>
                
                <label className={"CartPaymentOptions-method-payNow-radio"}>
                    <input
                    type="radio"
                    value="CreditCard"
                    checked={radioCardValue === "CreditCard"}
                    onChange={(e) => {
                        setRadioCardValue(e.target.value);
                    }}
                    /><div className={radioCardValue === "CreditCard" ? "checkedCard" : "noCheckedCard"}>Kreditkarte</div>   
                </label>
                <Collapse
                    isOpened={radioCardValue === "DebitCharge"}
                    theme={{
                        collapse: "CartPaymentOptions-method-payNow-collapse",
                        content: "CartPaymentOptions-method-payNow-content",
                    }}>
                    <div className="CartPaymentOptions-method-payNow-content-list">
                        <ul>
                            <li>Abbuchung vom Bankkonto</li>
                            <li>Klarnas Käuferschutz inbegriffen</li>
                        </ul>
                    </div>
                </Collapse>
                <Collapse
                    isOpened={radioCardValue === "BankTransfer"}
                    theme={{
                        collapse: "CartPaymentOptions-method-payNow-collapse",
                        content: "CartPaymentOptions-method-payNow-content",
                    }}>
                    <div className="CartPaymentOptions-method-payNow-content-list">
                        <ul>
                            <li>Ohne Registrierung</li>
                            <li>Nutze Deine regulären Online Banking Daten</li>
                            <li>Bequem und siche</li>
                            <li>Direkte Transaktionsbestätigung</li>
                            <li><a src="https://www.klarna.com/de/kauferschutzrichtlinie/" target="_blank" rel="noopener">Klarnas Käuferschutz</a></li>
                        </ul>
                    </div>
                </Collapse>
                <Collapse
                    isOpened={radioCardValue === "CreditCard"}
                    theme={{
                        collapse: "CartPaymentOptions-method-payNow-collapse",
                        content: "CartPaymentOptions-method-payNow-content",
                    }}>
                        <div className="CartPaymentOptions-method-payNow-content-images">
                            <img src={maestroCardImage}/>
                            <img src={masterCardImage}/>
                            <img src={visaCardImage}/>
                            <img src={visaElectronCardImage}/>
                        </div>
                    <div className="CartPaymentOptions-method-payNow-content-list">
                        <ul>
                            <li>Speichere deine Kartendaten für zukünftige Einkäufe</li>
                            <li><a src="https://www.klarna.com/de/kauferschutzrichtlinie/" target="_blank" rel="noopener">Klarnas Käuferschutz</a></li>
                        </ul>
                    </div>
                </Collapse>
                <p className="CartPaymentOptions-method-payNow-condition">
                    Indem ich fortfahre, akzeptiere ich die <a src="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/de_de/user" target="_blank" rel="noopener">
                    Bedingungen für den Klarna Shopping Service</a> und bestätige, dass ich die <a src="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/de_de/privacy" target="_blank" rel="noopener">
                    Datenschutzerklärung</a> und den <a src="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/de_de/cookie_purchase" target="_blank" rel="noopener">
                    Hinweis zu Cookies</a> gelesen habe. <a src="https://www.klarna.com/de/impressum/" target="_blank" rel="noopener">Impressum</a>
                </p>
            </div>
        </Collapse>
      </div>
    </div>
  );
};

export default CartPaymentOptions;
