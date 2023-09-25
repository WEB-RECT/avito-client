
export interface IFieldsAddItemList {
    title: string;
    type: string;
    childrenParams: string[];
    childrenParamsFields?: IParamsToFields[] | [];
}

export interface TFieldsAddItem {
    [key: string]: IFieldsAddItemList[]
}

export type TValueSelect = {
    name: string;
    type: string | null;
}

export type TValueList = {
    name: string;
    type: string;
}

export type TErrors = {
    status: boolean;
    errorText: string;
}

export interface IParamsToFields {
    type: string;
    label: string;
    labelInfo?: string;
    widget: {
        type: string;
        required: boolean;
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
    },
}

