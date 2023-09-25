import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import './Input.scss'
import {TErrors} from "../../../../Types/Profile/IAddItem";
import lodash from "lodash"
import DropdownTop from "../../Dropdown/DropdownTop/DropdownTop";
import Icons from "../../Icons/Icons";
import DropdownDrop from "../../Dropdown/DropdownDrop/DropdownDrop";
import Dropdown from "../../Dropdown/Dropdown";

interface IInputSuggest {
    items: string[];
}

interface IInput {
    type?: string;
    typeInput?: 'standart' | null;
    defaultValue?: string;
    placeholder?: string;
    getValueChanged?: (value: string) => void;
    errors?: TErrors | null;
    tag?: 'input' | 'textarea';
    suggest?: IInputSuggest | null;
    delay?: number;
    sizeInput?: 'small';
}

const Input: FC<IInput> = (props) => {

    const {
        type = 'text',
        typeInput,
        defaultValue = '',
        placeholder,
        getValueChanged,
        errors,
        tag,
        suggest,
        delay = 300,
        sizeInput
    } = props

    const [value, setValue] = useState<string>('')
    const [activeInput, setActiveInput] = useState<boolean>(false)

    useEffect(() => {
        if (defaultValue !== value) {
            setValue(defaultValue)
        }
    }, [defaultValue])

    useEffect(() => {
        if (defaultValue !== value) {
            const delayValue = setTimeout(() => {
                if (getValueChanged) {
                    getValueChanged(value)
                }
            }, delay)

            return () => clearTimeout(delayValue)
        }
    }, [value])

    const changeActiveInput = (type: string) => {
        if (type === 'focus') {
            setActiveInput(true)
        }
        if (type === 'blur') {
            if (value.length > 0) {
                setActiveInput(true)
            } else {
                setActiveInput(false)
            }
        }
    }

    return (
        <>
            {
                typeInput === 'standart'
                    ?
                    <>
                        {
                            tag === 'textarea'
                                ?
                                <textarea
                                    className={`textarea`}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    onFocus={() => changeActiveInput('focus')}
                                    onBlur={() => changeActiveInput('blur')}
                                    placeholder={placeholder}
                                >
                                </textarea>
                                :
                                <input
                                    className={`input`}
                                    type={type}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    onFocus={() => changeActiveInput('focus')}
                                    onBlur={() => changeActiveInput('blur')}
                                    placeholder={placeholder}
                                />
                        }
                        {
                            errors &&
                            errors?.status &&
                            <div className="form-input-error" dangerouslySetInnerHTML={{__html: errors?.errorText}}>
                            </div>
                        }
                    </>
                    :
                    <div
                        className={`form-input ${activeInput ? 'form-input--active' : ''} ${sizeInput ? 'form-input--small' : ''} ${errors && errors?.status ? 'input--error' : ''}`}
                    >
                        {
                            placeholder &&
                            <div className={`form-input-title ${tag === 'textarea' ? 'form-input-title--textarea' : ''}`}>
                                {
                                    placeholder
                                }
                            </div>
                        }
                        {
                            !suggest
                                ?
                                <>
                                    {
                                        tag === 'textarea'
                                            ?
                                            <textarea
                                                className={`textarea`}
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                                onFocus={() => changeActiveInput('focus')}
                                                onBlur={() => changeActiveInput('blur')}
                                            >
                                            </textarea>
                                            :
                                            <input
                                                className={`input`}
                                                type={type}
                                                value={value}
                                                onChange={(e) => setValue(e.target.value)}
                                                onFocus={() => changeActiveInput('focus')}
                                                onBlur={() => changeActiveInput('blur')}
                                            />
                                    }
                                    {
                                        errors &&
                                        errors?.status &&
                                        <div className="form-input-error" dangerouslySetInnerHTML={{__html: errors?.errorText}}>
                                        </div>
                                    }
                                </>
                                :
                                <Dropdown>
                                    <DropdownTop
                                        style={{
                                            width: '100%',
                                        }}
                                    >

                                        <input
                                            className={`input`}
                                            type={type}
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            onFocus={() => changeActiveInput('focus')}
                                            onBlur={() => changeActiveInput('blur')}
                                        />

                                    </DropdownTop>
                                    <DropdownDrop>
                                        {
                                            suggest.items &&
                                            suggest.items.length > 0 &&
                                            <div className="select-drop">
                                                {
                                                    suggest.items.map((item, indexItem) => (
                                                        item &&
                                                        <div
                                                            key={item + indexItem.toString()}
                                                            className={`item`}
                                                            data-close-dropdown-to-click="true"
                                                            onClick={(e) => setValue(item)}
                                                        >
                                                            {
                                                                item
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                    </DropdownDrop>
                                </Dropdown>
                        }

                    </div>
            }
        </>
    );
};

export default React.memo(Input);
