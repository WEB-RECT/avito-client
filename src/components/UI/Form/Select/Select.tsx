import React, {FC, useContext, useEffect, useState} from 'react';
import './Select.scss'
import {TValueList, TValueSelect} from "../../../../Types/Profile/IAddItem";
import Dropdown, {DropdownContext} from "../../Dropdown/Dropdown";
import DropdownTop from "../../Dropdown/DropdownTop/DropdownTop";
import DropdownDrop from "../../Dropdown/DropdownDrop/DropdownDrop";
import Icons from "../../Icons/Icons";
import {IDropdownState} from "../../../../Types/Types";
import lodash from "lodash";

interface ISelect {
    items: TValueList[] | undefined;
    getValueChanged?: (value: string) => void;
    defaultValue?: string;
}

const Select: FC<ISelect> = ({ items, defaultValue, getValueChanged }) => {

    const [stateActive, setStateActive] = useState<TValueList>({} as TValueList)
    const [stateDropdown, setStateDropdown] = useState<IDropdownState>({} as IDropdownState)

    useEffect(() => {
        if (defaultValue && items) {
            items.forEach((item) => {
                if (item.type === defaultValue) {
                    setStateActive(item)
                }
            })
        }
    }, [defaultValue])

    useEffect(() => {
        if (getValueChanged) {
            if (stateActive.type) {
                getValueChanged(stateActive.type)
            }
        }
    }, [stateActive.type])

    return (
        <>
            <Dropdown
                onChange={(state) => setStateDropdown(state)}
            >
                <DropdownTop>
                    <div className={`select-top ${stateDropdown.show ? 'active' : ''}`}>
                        <span>
                            {
                                stateActive &&
                                (stateActive.name || (items && items[0].name))
                            }
                        </span>

                        <Icons
                            iconType="arrowDown"
                        />

                    </div>
                </DropdownTop>
                <DropdownDrop>
                    <div className="select-drop">
                        {
                            items &&
                            items.map((item, indexItem) => (
                                !(item.type === 'DEFAULT') &&
                                <div
                                    key={item.type + indexItem.toString()}
                                    className={`item ${item.type === stateActive.type ? 'item--active' : ''}`}
                                    data-close-dropdown-to-click="true"
                                    onClick={() => {
                                        setStateActive(item)
                                    }}
                                >
                                    {
                                        item.name
                                    }
                                </div>
                            ))
                        }
                    </div>
                </DropdownDrop>
            </Dropdown>
        </>
    );
};

export default React.memo(Select);
