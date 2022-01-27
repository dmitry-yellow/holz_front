import {useState} from "react";
import cn from "classnames";
import {Collapse} from "react-collapse/lib/Collapse";
import { useStepper } from "../../customHooks/useStepper";
import './style.css';


const CartDataSubtotal = () => {

    const [radioValue, setRadioValue] = useState("Abholung");
    // const [isOpenCollapseBlock, setIsOpenCollapseBlock] = useState(false);
    const { setStep } = useStepper();

    return (
        <div className="CartDataSubtotal">
            <div className="CartDataSubtotal-header">
                <p>WARENKORB-SUMME</p>
            </div>
            <div className="CartDataSubtotal-title">
                <p className="CartDataSubtotal-title-name">Zwischensumme</p>
                <p className="CartDataSubtotal-title-price">2.960,00 €</p>
            </div>
            <div className="CartDataSubtotal-transportation">
                <p>Versand</p>
                <div className="CartDataSubtotal-transportation-method">  {/*radio buttons*/}
                    <label className={cn("CartDataSubtotal-transportation-method-radio", radioValue === "Abholung" && "checked")}>
                        <input type="radio"
                               value="Abholung"
                               checked={radioValue === "Abholung"}
                               onChange={(e) => {setRadioValue(e.target.value)}}
                        /> Abholung vor Ort
                    </label>
                    <label className={cn("CartDataSubtotal-transportation-method-radio", radioValue === "Versandkosten" && "checked")}>
                        <input type="radio"
                               value="Versandkosten"
                               checked={radioValue === "Versandkosten"}
                               onChange={(e) => {setRadioValue(e.target.value)}}
                        /> Versandkosten: <b>500,00 €</b>
                    </label>
                    {/* <p onClick={() => setIsOpenCollapseBlock(!isOpenCollapseBlock)}>Versandkosten berechnen</p>
                    <Collapse
                        isOpened={isOpenCollapseBlock}
                        theme={{
                            collapse: 'CartDataSubtotal-transportation-method-collapse',
                            content: 'CartDataSubtotal-transportation-method-content'
                        }}
                    >
                        <div style={{height:  "200px", backgroundColor: "#000"}}>

                        </div>
                    </Collapse> */}
                </div>
            </div>

            <div className="CartDataSubtotal-common">
                <p className="CartDataSubtotal-common-name">Gesamtsumme</p>
                <p className="CartDataSubtotal-common-price">2.960,00 €</p>
            </div>
            <div className="CartDataSubtotal-VATIncluded">
                <p className="CartDataSubtotal-VATIncluded-name">inkl. MwSt.</p>
                <p className="CartDataSubtotal-VATIncluded-price">472,61 €</p>
            </div>

            <button onClick={() => setStep(1)}>Weiter zur Kasse</button>

        </div>
    )
};

export default CartDataSubtotal;