import {useEffect, useRef} from 'react';
import {Collapse} from "react-collapse/lib/Collapse";
import cn from "classnames";
import './style.css';


const CustomizeOptionContainer = (props) => {

    const {option, setOpenTab, isOpen, content, optional, isDisabled, openTab, showName, setOpenToolltip, openToolltip} = props;

    const optionRef = useRef();

    useEffect(() => {
        if (optionRef.current && optionRef.current.attributes.id.value === openTab) {
            optionRef.current.scrollIntoView({block: 'start'});
        }
    }, [openTab])

    const classForSpan = cn('', isOpen && "open");
    const classForHeaderOption = cn("CustomizeOptionContainer-header", isOpen && 'optionOpen', isDisabled && 'disabled');

    return (
        <div className="CustomizeOptionContainer">
            <div ref={optionRef}
                 id={option}
                 className={classForHeaderOption}
                 onClick={() => {
                   setOpenTab(isOpen ? '' : option);
                   if(openTab === '' || option !== openToolltip){
                     setOpenToolltip('');
                   }
                 }}>
                <p className="CustomizeOptionContainer-header-optionName">
                    {showName && showName}
                </p>
                <p className="CustomizeOptionContainer-header-optional">
                    {optional ? (option === 'Positioning' ? 'Click on circle to choose position' : '(Optional)') : null}
                </p>
                <span className={classForSpan}></span>
            </div>
            <Collapse
                theme={{
                    collapse: 'CustomizeOptionContainer-collapse',
                    content: 'CustomizeOptionContainer-content'
                }}
                isOpened={isOpen}
            >
                {content && content}
            </Collapse>
        </div>
    )
}

export default CustomizeOptionContainer;