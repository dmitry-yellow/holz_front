import { useState } from 'react';
import './style.css';

const Select = () => {
    const countries = [
        {name: "Afghanistan"},
        {name: "Bangladesch"},
        {name: "Britische Jungferninseln"},
        {name: "Ghana"},
        {name: "Japan"},
        {name: "Liberia"},
        {name: "Afghanistan"},
        {name: "Bangladesch"},
        {name: "Britische Jungferninseln"},
        {name: "Ghana"},
        {name: "Japan"},
        {name: "Liberia"},
    ]

    const [selectedOption, setSelectedOption] = useState(countries[0].name);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(countries);

    const toggling = () => {
        setIsOpen(!isOpen);
        setSearchValue("");
        setFilteredOptions(countries);
    }

    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
        setSearchValue("");
        setFilteredOptions(countries);
    };

    const handlerSearch = value => {
        setSearchValue(value);
        setFilteredOptions(countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase())));
    }
    return (
        <div className="Selection" >
            <div className={`Selection-select-value ${isOpen && 'hidden-border-bottom'}`} onClick={toggling}>
                <span>{selectedOption}</span>
                <div className="Selection-wrap">
                    <span className="Selection-wrap-arrow"/>
                </div>
            </div>
            { isOpen && 
                <div className="Selection-box">
                    <div className="Selection-box-search">
                        <input className="Selection-box-search-field" type="text" value={searchValue} onChange={event => handlerSearch(event.target.value)}/>
                    </div>
                    <ul className="Selection-box-options-list">
                        {filteredOptions.map((country, index) => <li className="Selection-box-option" key={index+1} onClick={onOptionClicked(country.name)}>{country.name}</li>)}
                    </ul>
                </div>
            }
        </div>
    );
};

export default Select;