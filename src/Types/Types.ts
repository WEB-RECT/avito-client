import React from "react";
import {TErrors, TValueList} from "./Profile/IAddItem";
import {dataValueList} from "../category/filters/fieldsParams";


export interface IFormValueRegister {
    name: string;
    email: string;
    password: string;
}

export interface IFormValueLogin {
    email: string;
    password: string;
}

export interface IDropdownState {
    show: boolean,
    rect: DOMRect,
}

export interface IDropdownContext {
    state: IDropdownState,
    hiddenDropdown: () => void,
    changeStateDropdown: (rect: DOMRect) => void,
    position?: string;
}

export interface IYMapsSuggest {
    displayName: string;
    hl: number[];
    type: string;
    value: string;
}

export interface IKeyAny {
    [key: string]: any;
}

export interface IMenuList {
    name: string;
    path?: string;
}

export interface ICategoryItemTree {
    name: string;
    type: string;
    uuid: string;
    children: ICategoryItemTree[] | [];
}

export interface ICategoryItemList {
    name: string;
    type: string;
    uuid: string;
    parentUuid: string | null;
    path?: string
}

export type TUuid = string;


export type TDataValueListToKey = {
    name: string,
    type: string,
}

export interface IDataValueList {
    [key: string]: TDataValueListToKey[]
}

export interface IFilterFieldParamsWidget {
    type: string;
    required?: boolean;
    errors?: TErrors;
    input?: {
        placeholder?: string;
        defaultValue?: string;
    },
    radio?: {
        valueList: TValueList[];
        defaultValueType?: string;
    },
    checkboxList?: {
        valueList: TValueList[];
        defaultValueType?: string[];
    },
    select?: {
        valueList: TValueList[];
        defaultValueType?: string;
    },
}

export interface IFilterFieldParams {
    type: string;
    label: string;
    labelInfo?: string;
    widget: IFilterFieldParamsWidget[]
}

export interface IFilterField {
    [key: string]: IFilterFieldParams[]
}

export interface ICurrentCategoryPathMain {
    path: string[];
    pathUuid: TUuid[];
}