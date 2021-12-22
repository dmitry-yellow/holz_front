import React from "react";
import injectMedia from "../../media";
import defaultImage from "../../../assets/images/defaultImage.png";
import flipPhoneImg from "../../../assets/images/flip-fone-icon-text.png";
import './style.css';


const CartDataProducts = (props) => {

    const productData = {
        0: {
            productOptions: [
                {
                    optionName: "Hot Tub Individuell",
                    optionDesc: "Lieferzeit: 4-6 Wochen",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: true,
                    deleteIcon: true
                },
                {
                    optionName: "Hot Tub Größe",
                    optionDesc: "Holzklusiv Hot Tub Ø 180cm",
                    price: "2.760,00 €",
                    amount: "1",
                    subtotal: "2.760,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Holztyp",
                    optionDesc: "Thermoholz",
                    price: "300,00 €",
                    amount: "1",
                    subtotal: "300,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Holzanstrich",
                    optionDesc: "Kein Anstrich",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Fiberglas-Wannenfarbe",
                    optionDesc: "Blau",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Deckelart",
                    optionDesc: "Thermodeckel Rot",
                    price: "440,00 €",
                    amount: "1",
                    subtotal: "440,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Zierringe",
                    optionDesc: "Zierringe",
                    price: "90,00 €",
                    amount: "1",
                    subtotal: "90,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Massage-Funktion",
                    optionDesc: "Hydro-Wasser-Luft-Massage 18 Düsen 2,3 kW Pumpe",
                    price: "1.100,00 €",
                    amount: "2",
                    subtotal: "2.200,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Beleuchtung",
                    optionDesc: "3 LEDs",
                    price: "330,00 €",
                    amount: "1",
                    subtotal: "330,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wannenisolierung",
                    optionDesc: "Mit Wannenisolierung",
                    price: "140,00 €",
                    amount: "1",
                    subtotal: "140,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Holzofen-Edelstahlart",
                    optionDesc: "316er Edelstahlofen 30 kW",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "Skimmer",
                    price: "160,00 €",
                    amount: "1",
                    subtotal: "160,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "Zusatzheizung 6kW",
                    price: "750,00 €",
                    amount: "1",
                    subtotal: "750,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "Zusatzheizung 3kW",
                    price: "650,00 €",
                    amount: "1",
                    subtotal: "650,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "Holzbox für Sandfilter",
                    price: "120,00 €",
                    amount: "1",
                    subtotal: "120,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "UV-Lampe",
                    price: "530,00 €",
                    amount: "1",
                    subtotal: "530,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "Sandfilter",
                    price: "320,00 €",
                    amount: "1",
                    subtotal: "320,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Rohrverlängerung",
                    optionDesc: "Extra Meter Rohr",
                    price: "60,00 €",
                    amount: "4",
                    subtotal: "240,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Sandfilter Position",
                    optionDesc: "Sandfilter Position 6",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Schalter Position",
                    optionDesc: "Schalter Position 6",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: false,
                    deleteIcon: false
                },
            ],
            totalSum: "9.030,00 €"
        },
        1: {
            productOptions: [
                {
                    optionName: "Hot Tub Individuell",
                    optionDesc: "Lieferzeit: 4-6 Wochen",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: true,
                    deleteIcon: true
                },
                {
                    optionName: "Hot Tub Größe",
                    optionDesc: "Holzklusiv Hot Tub Ø 180cm",
                    price: "2.760,00 €",
                    amount: "1",
                    subtotal: "2.760,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Holztyp",
                    optionDesc: "Thermoholz",
                    price: "300,00 €",
                    amount: "1",
                    subtotal: "300,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Holzanstrich",
                    optionDesc: "Kein Anstrich",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Fiberglas-Wannenfarbe",
                    optionDesc: "Blau",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Deckelart",
                    optionDesc: "Thermodeckel Rot",
                    price: "440,00 €",
                    amount: "1",
                    subtotal: "440,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Zierringe",
                    optionDesc: "Zierringe",
                    price: "90,00 €",
                    amount: "1",
                    subtotal: "90,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Massage-Funktion",
                    optionDesc: "Hydro-Wasser-Luft-Massage 18 Düsen 2,3 kW Pumpe",
                    price: "1.100,00 €",
                    amount: "2",
                    subtotal: "2.200,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Beleuchtung",
                    optionDesc: "3 LEDs",
                    price: "330,00 €",
                    amount: "1",
                    subtotal: "330,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wannenisolierung",
                    optionDesc: "Mit Wannenisolierung",
                    price: "140,00 €",
                    amount: "1",
                    subtotal: "140,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Holzofen-Edelstahlart",
                    optionDesc: "316er Edelstahlofen 30 kW",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "Skimmer",
                    price: "160,00 €",
                    amount: "1",
                    subtotal: "160,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "Zusatzheizung 6kW",
                    price: "750,00 €",
                    amount: "1",
                    subtotal: "750,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "Zusatzheizung 3kW",
                    price: "650,00 €",
                    amount: "1",
                    subtotal: "650,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "Holzbox für Sandfilter",
                    price: "120,00 €",
                    amount: "1",
                    subtotal: "120,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "UV-Lampe",
                    price: "530,00 €",
                    amount: "1",
                    subtotal: "530,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Wasserreinigung & Zubehör",
                    optionDesc: "Sandfilter",
                    price: "320,00 €",
                    amount: "1",
                    subtotal: "320,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Rohrverlängerung",
                    optionDesc: "Extra Meter Rohr",
                    price: "60,00 €",
                    amount: "4",
                    subtotal: "240,00 €",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Sandfilter Position",
                    optionDesc: "Sandfilter Position 6",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: false,
                    deleteIcon: false
                },
                {
                    optionName: "Schalter Position",
                    optionDesc: "Schalter Position 6",
                    price: "",
                    amount: "1",
                    subtotal: "",
                    image: false,
                    deleteIcon: false
                },
            ],
            totalSum: "9.030,00 €"
        }
    }

    const productsHeader = ['PRODUKT', "", "PREIS", "ANZAHL", "ZWISCHENSUMME"];
    const productsMobileHeader = ['PRODUKT', "", "ANZAHL"];

    const { mobileCartQuery } = props;


    return (
        <div className="CartDataProducts">
            {mobileCartQuery && <img src={flipPhoneImg} alt='flip phone'/>}
            <div className="CartDataProducts-header">
                {!mobileCartQuery ?
                    productsHeader.map((item) => <span key={item}>{item}</span>) :
                    productsMobileHeader.map((item) => <span key={item}>{item}</span>)}
            </div>
            {Object.values(productData).map((item, index) => {
                    return <React.Fragment key={index}>
                        {item.productOptions.map((product) => {
                            return <div className="CartDataProducts-product"
                                        key={product.optionDesc}>
                                <div className="CartDataProducts-product-icons">
                                    {product.deleteIcon && <span>×</span>}
                                    {product.image && <img src={defaultImage} alt="defaultImage"/>}
                                </div>
                                <div className="CartDataProducts-product-option">
                                    <p className="CartDataProducts-product-option-name">{product.optionName}</p>
                                    <p className="CartDataProducts-product-option-desc">{product.optionDesc}</p>
                                </div>
                                {!mobileCartQuery && <p className="CartDataProducts-product-price">{product.price}</p>}
                                <p className="CartDataProducts-product-amount">{product.amount}</p>
                                {!mobileCartQuery && <p className="CartDataProducts-product-price">{product.subtotal}</p>}
                            </div>
                        }
                    )}
                        <div className="CartDataProducts-totalSum">
                            {!mobileCartQuery && <p></p>}
                            {!mobileCartQuery && <p></p>}
                            <p></p>
                            <p></p>
                            <p>{item.totalSum}</p>

                        </div>
                </React.Fragment>
                }
            )}

        </div>
    )
};

export default injectMedia(CartDataProducts);