import React, {FC, useEffect, useState} from 'react';
import './RadioRow.scss'
import {TErrors, TValueList} from "../../../../Types/Profile/IAddItem";
import lodash from "lodash";

interface IRadioRow {
    items: TValueList[] | undefined;
    defaultValue?: string | undefined;
    getValueChanged?: (value: string | number) => void;
    errors?: TErrors | null;
    widgetType?: "radioColor" | null;
}

const RadioRow: FC<IRadioRow> = (props) => {

    const {
        items,
        getValueChanged,
        errors,
        defaultValue,
        widgetType,
    } = props

    const [stateActive, setStateActive] = useState<TValueList>({} as TValueList)

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
    }, [stateActive])

    return (
        <>
            {
                widgetType === 'radioColor'
                    ?
                    <>
                        {
                            items &&
                            <div className={`radio-row radio-row-color ${ errors && errors?.status ? 'radio-row--error' : ''}`}>
                                {
                                    items.map((item, indexItem) => (
                                        <div
                                            key={item + indexItem.toString()}
                                            className={`radio-row-item ${item.type} ${stateActive.type === item.type ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                setStateActive(item)
                                            }}
                                        >
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </>
                    :
                    <>
                        {
                            items &&
                            <div className={`radio-row ${ errors && errors?.status ? 'radio-row--error' : ''}`}>
                                {
                                    items.map((item, indexItem) => (
                                        <div
                                            key={item + indexItem.toString()}
                                            className={`radio-row-item ${stateActive.type === item.type ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();

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
                        }
                    </>
            }

            {
                errors &&
                errors?.status &&
                <div className="form-field-error" dangerouslySetInnerHTML={{ __html: errors?.errorText }}>
                </div>
            }
        </>
    );
};

export default React.memo(RadioRow);
