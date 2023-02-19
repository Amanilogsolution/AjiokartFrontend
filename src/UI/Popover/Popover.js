import React, { useState, useRef } from "react";
import { Overlay, Popover } from "react-bootstrap"

function PopOver(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = event => {
        setShow(!show);
        setTarget(event.target);
    };

    return (
        <React.Fragment>

            <button type="button" onClick={handleClick}>{props.btnText}</button>
            <Overlay
                show={show}
                target={target}
                placement="top"
                container={ref.current}
                containerPadding={20}
                handleClick={props.show}


            >

                <Popover id="popover-contained">
                    <Popover.Title as="h3">{props.hintTitle}</Popover.Title>
                    <Popover.Content>
                        {props.hintText}
                    </Popover.Content>
                </Popover>
            </Overlay>
        </React.Fragment>
    );
}



export default PopOver;