import { useState, useEffect, useRef } from 'react';
import cn from "classnames";
import { useFocus } from "../customHooks/useFocus";
import { useOutsideClick } from "../customHooks/useOutsideClick";
import './style.css';

const Select = (props) => {

    const { label, classes = {}, options, value, required = false, onChange } = props;
    const { labelClass, errorClass, listClass, optionListClass } = classes;

    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);

    const [inputRef, setInputFocus] = useFocus();
    const dropDownRef = useOutsideClick(event => setIsOpen(false));

    useEffect(() => {
        if(isOpen) {
            setInputFocus();
        }
    }, [isOpen])

    useEffect(() => {
        if(isOpen) {
            const selectedValue = dropDownRef.current.querySelector('.selected')
            selectedValue.scrollIntoView({block: "nearest", behavior: "smooth"});
        }
    }, [isOpen])

    const toggling = () => {
        setIsOpen(!isOpen);
        setSearchValue("");
        setFilteredOptions(options);
    }

    const onOptionClicked = value => () => {
        onChange(value);
        setIsOpen(false);
        setSearchValue("");
        setFilteredOptions(options);
    };

    const handlerSearch = value => {
        setSearchValue(value);
        setFilteredOptions(options.filter(option => option.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <div className="Selection" ref={dropDownRef} >
            <p className={ cn("Selection-header", labelClass, {"obligatory-field": required}) }>{ label }</p>
            <div className={ cn("Selection-select-value", {"hidden-border-bottom": isOpen}, errorClass) } onClick={toggling}>
                <span>{value}</span>
                <div className="Selection-wrap">
                    <span className="Selection-wrap-arrow"/>
                </div>
            </div>
            { isOpen && 
                <div className="Selection-box">
                    <div className="Selection-box-search" >
                        <input 
                            className="Selection-box-search-field" 
                            ref={ inputRef } type="text" 
                            value={searchValue} 
                            onChange={event => handlerSearch(event.target.value)}
                        />
                    </div>
                    <ul className={ cn("Selection-box-options-list", listClass) } >
                        {filteredOptions.map((option, index) => 
                            <li 
                                className={cn("Selection-box-option", {"selected": value === option}, optionListClass)}
                                key={index} 
                                onClick={onOptionClicked(option)}
                            >
                                {option}
                            </li>
                        )}
                    </ul>
                </div>
            }
        </div>
    );
};

export default Select;