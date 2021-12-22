import madeInGermany from "../../../assets/images/made-in-germany.png";
import './style.css';



const MadeInGermanyLogo = () => {
    return (
        <a className='MadeInGermanyLogo'
           href="https://holzklusiv.de/ueber-uns/produktion/"
           rel="noreferrer noopener"
           target="_blank"
        >
            <img src={madeInGermany} alt="madeInGermany" />
        </a>
    )
}

export default MadeInGermanyLogo;