import React, {FC, useContext, useEffect, useState} from 'react';
import '../Dropdown.scss'
import {DropdownContext} from "../Dropdown";

interface Props {
    children: React.ReactNode
}

const DropdownDrop: FC<Props> = ({ children}) => {

    const {state, position} = useContext(DropdownContext)

    const [stateDrop, setStateDrop] = useState<{ [key: string]: number}>({})

    useEffect(() => {

        const rectLeft = state.rect.left || 0
        const rectRight = state.rect.right || 0
        const rectTop = state.rect.top || 0
        const rectWidth = state.rect.width || 0
        const rectHeight = state.rect.height || 0

        if (position) {
            if (position === 'bottom-left') {
                setStateDrop({
                    left: rectLeft,
                    top: rectTop + rectHeight + 10,
                    width: rectWidth,
                })
            }
            if (position === 'bottom-right') {
                setStateDrop({
                    right: document.body.offsetWidth - rectRight,
                    top: rectTop + rectHeight + 10,
                    width: rectWidth,
                })
            }
        } else {
            setStateDrop({
                left: rectLeft,
                top: rectTop + rectHeight + 10,
                width: rectWidth,
            })
        }
    }, [position, state])

    return (
        <>
            {
                state.show &&
                <div
                    className="dropdown-drop"
                    data-dropdown={true}
                    style={{
                        minWidth: '200px',
                        ...stateDrop
                    }}
                >
                    {
                        children
                    }
                </div>
            }
        </>
    );
};

export default React.memo(DropdownDrop);
