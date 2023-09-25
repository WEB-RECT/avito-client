import React, {CSSProperties, FC, useContext} from 'react';
import {DropdownContext} from "../Dropdown";

interface Props {
    children: React.ReactNode;
    style?: CSSProperties;
}

const DropdownTop: FC<Props> = ({ children, style }) => {

    const {changeStateDropdown} = useContext(DropdownContext)

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()

                const target = e.target as HTMLElement
                const targetClosest = target.closest(`[data-dropdown="true"]`)

                if (targetClosest) {
                    const rect = targetClosest.getBoundingClientRect()
                    changeStateDropdown(rect)
                }

            }}
            data-dropdown={true}
            style={{ display: 'inline-block', minWidth: '200px', ...style}}
        >
            {
                children
            }
        </div>
    );
};

export default React.memo(DropdownTop);
