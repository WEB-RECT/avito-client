import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import './CheckboxList.scss'
import Text from "../../Typography/Text";
import {newObject} from "../../../../functions/object/newObject";
import {TValueList} from "../../../../Types/Profile/IAddItem";

interface ICheckbox {
    items: TValueList[] | undefined;
    getValueChanged?: (value: string[]) => void;
    defaultValue?: string[];
    sizeCheckbox?: 'small';
}

const CheckboxList: FC<ICheckbox> = ({ items, getValueChanged, defaultValue = [], sizeCheckbox }) => {

    const [stateActive, setStateActive] = useState<string[]>(defaultValue || [])

    const changedInput = (item: string) => {
        setStateActive(prev => {

            const currentPrev: string[] = newObject(prev)

            if (currentPrev.find(it => it === item)) {
                if (currentPrev.indexOf(item) !== -1) {
                    currentPrev.splice(currentPrev.indexOf(item), 1)
                }
            } else {
                currentPrev.push(item)
            }

            return currentPrev
        })
    }

    useEffect(() => {
        if (getValueChanged) {
            if (stateActive.length > 0) {
                getValueChanged(stateActive)
            } else {
                if (stateActive.length === 0 && defaultValue?.length > 0) {
                    getValueChanged(stateActive)
                }
            }
        }
    }, [stateActive])

    return (
        <>
            {
                items &&
                <div className={`checkbox-list ${sizeCheckbox ? 'checkbox-list--small' : ''}`}>
                    {
                        items.map((item, indexItem) => (
                            <div
                                key={item + indexItem.toString()}
                                className="checkbox"
                            >
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={!!stateActive.find(it => it === item.type)}
                                        onChange={() => changedInput(item.type)}
                                    />
                                    <span className="checkbox-visible"> </span>

                                    <Text>
                                        {
                                            item.name
                                        }
                                    </Text>

                                </label>
                            </div>
                        ))
                    }
                </div>
            }
        </>
    );
};

export default React.memo(CheckboxList);
