import React, { useState } from "react";
import { Collapse } from "react-collapse/lib/Collapse";
import Popup from "../../../../Popup";
import maestroCardImage from "../../../../../assets/images/maestroCard.svg";
import masterCardImage from "../../../../../assets/images/masterCard.svg";
import visaCardImage from "../../../../../assets/images/visaCard.svg";
import visaElectronCardImage from "../../../../../assets/images/visaElectronCard.svg";
import "../style.css";

const PaymentTypeCards = (props) => {

  const {radioValue, setRadioValue} = props;
  const [modalActive, setModalActive] = useState("");

  const onHandleCloseModal = () => {
    setModalActive("");
  }

  return (
    <div className="CartPaymentOptions-method-payNow">
      <p className="CartPaymentOptions-method-payNow-title">Jetzt bezahlen.</p>
      <p className="CartPaymentOptions-method-payNow-subtitle">Schnell und sicher</p>
      <label className={"CartPaymentOptions-method-payNow-radio"}>
        <input
          type="radio"
          value="DebitCharge"
          checked={radioValue === "DebitCharge"}
          onChange={(e) => {
            setRadioValue(e.target.value);
          }}
        />
        <div className={ radioValue === "DebitCharge" ? "checkedCard" : "noCheckedCard" }>
          Lastschrift
        </div>
      </label>
      <label className={"CartPaymentOptions-method-payNow-radio"}>
        <input
          type="radio"
          value="BankTransfer"
          checked={radioValue === "BankTransfer"}
          onChange={(e) => {
            setRadioValue(e.target.value);
          }}
        />
        <div className={ radioValue === "BankTransfer" ? "checkedCard" : "noCheckedCard" }>
          Sofortüberweisung
        </div>
      </label>
      <label className={"CartPaymentOptions-method-payNow-radio"}>
        <input
          type="radio"
          value="CreditCard"
          checked={radioValue === "CreditCard"}
          onChange={(e) => {
            setRadioValue(e.target.value);
          }}
        />
        <div className={ radioValue === "CreditCard" ? "checkedCard" : "noCheckedCard" }>
          Kreditkarte
        </div>
      </label>
      <Collapse
        isOpened={radioValue === "DebitCharge"}
        theme={{
          collapse: "CartPaymentOptions-method-payNow-collapse",
          content: "CartPaymentOptions-method-payNow-content",
        }}
      >
        <div className="CartPaymentOptions-method-payNow-content-list">
          <ul>
            <li>Abbuchung vom Bankkonto</li>
            <li>Klarnas Käuferschutz inbegriffen</li>
          </ul>
        </div>
      </Collapse>
      <Collapse
        isOpened={radioValue === "BankTransfer"}
        theme={{
          collapse: "CartPaymentOptions-method-payNow-collapse",
          content: "CartPaymentOptions-method-payNow-content",
        }}
      >
        <div className="CartPaymentOptions-method-payNow-content-list">
          <ul>
            <li>Ohne Registrierung</li>
            <li>Nutze Deine regulären Online Banking Daten</li>
            <li>Bequem und siche</li>
            <li>Direkte Transaktionsbestätigung</li>
            <li>
              <a href="https://www.klarna.com/de/kauferschutzrichtlinie/" target="_blank"rel="noreferrer">Klarnas Käuferschutz</a>
            </li>
          </ul>
        </div>
      </Collapse>
      <Collapse
        isOpened={radioValue === "CreditCard"}
        theme={{
          collapse: "CartPaymentOptions-method-payNow-collapse",
          content: "CartPaymentOptions-method-payNow-content",
        }}
      >
        <div className="CartPaymentOptions-method-payNow-content-images">
          <img src={maestroCardImage} alt="logo maestro card" />
          <img src={masterCardImage} alt="logo master card" />
          <img src={visaCardImage} alt="logo visa card" />
          <img src={visaElectronCardImage} alt="logo visa electron card" />
        </div>
        <div className="CartPaymentOptions-method-payNow-content-list">
          <ul>
            <li>Speichere deine Kartendaten für zukünftige Einkäufe</li>
            <li>
              <a href="https://www.klarna.com/de/kauferschutzrichtlinie/" target="_blank"rel="noreferrer">Klarnas Käuferschutz</a>
            </li>
          </ul>
        </div>
      </Collapse>
      <p className="CartPaymentOptions-method-payNow-condition">
        Indem ich fortfahre, akzeptiere ich die <a href="#" target="_blank"rel="noreferrer" onClick={ e => {e.preventDefault(); setModalActive("TermsService");}}>
        Bedingungen für den Klarna Shopping Service </a> und bestätige, dass ich die <a href="#" target="_blank"rel="noreferrer" onClick={ e => {e.preventDefault(); setModalActive("PrivacyPolicy");}}>
        Datenschutzerklärung</a> und den <a href="#" target="_blank"rel="noreferrer" onClick={ e => {e.preventDefault(); setModalActive("Cookies");}}>
        Hinweis zu Cookies </a> gelesen habe. <a href="https://www.klarna.com/de/impressum/" target="_blank"rel="noreferrer">Impressum</a>
      </p>
      <Popup  isModalOpen={modalActive === "TermsService"}
              onHandleCloseModal={onHandleCloseModal}   
              classes={{classModal: "CartPaymentOptions-method-payNow-condition-modal", 
                        classModalContainer: "CartPaymentOptions-method-payNow-condition-modal-container", 
                        classIconClose: "CartPaymentOptions-method-payNow-condition-close"}}
      >
        <iframe src="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/de_de/user" 
                className="CartPaymentOptions-method-payNow-condition-frame" title="Terms service"
        />
      </Popup>
      <Popup isModalOpen={modalActive === "PrivacyPolicy"}
              onHandleCloseModal={onHandleCloseModal}   
              classes={{classModal: "CartPaymentOptions-method-payNow-condition-modal", 
                        classModalContainer: "CartPaymentOptions-method-payNow-condition-modal-container", 
                        classIconClose: "CartPaymentOptions-method-payNow-condition-close"}}
      >
        <iframe src="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/de_de/privacy" 
                className="CartPaymentOptions-method-payNow-condition-frame" title="Privacy policy"
        />
      </Popup>
      <Popup isModalOpen={modalActive === "Cookies"}
              onHandleCloseModal={onHandleCloseModal}   
              classes={{classModal: "CartPaymentOptions-method-payNow-condition-modal", 
                        classModalContainer: "CartPaymentOptions-method-payNow-condition-modal-container", 
                        classIconClose: "CartPaymentOptions-method-payNow-condition-close"}}
      >
        <iframe src="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/de_de/cookie_purchase" 
                className="CartPaymentOptions-method-payNow-condition-frame" title="TermsService"
        />
      </Popup>
    </div>
  );
};

export default PaymentTypeCards;
