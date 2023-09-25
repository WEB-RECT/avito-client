import {IDataValueList, IFilterField} from "../../Types/Types";

export const dataValueList: IDataValueList = {
    ['number-rooms']: [
        {
            name: 'Студия',
            type: 'Студия',
        },
        {
            name: '1 комната',
            type: '1 комната',
        },
        {
            name: '2 комнаты',
            type: '2 комнаты',
        },
        {
            name: '3 комнаты',
            type: '3 комнаты',
        },
    ],
    ['type-housing']: [
        {
            name: 'Неважно',
            type: 'Неважно',
        },
        {
            name: 'Апартаменты',
            type: 'Апартаменты',
        },
        {
            name: 'Квартира',
            type: 'Квартира',
        },
    ]
}

const realty = [
    {
        type: 'number-rooms',
        label: 'Количество комнат',
        labelInfo: '',
        widget: [
            {
                type: 'checkboxList',
                checkboxList: {
                    valueList: dataValueList['number-rooms'],
                }
            },
        ]
    },
    {
        type: 'price',
        label: 'Цена, ₽',
        labelInfo: '',
        widget: [
            {
                type: 'input',
                input: {
                    placeholder: 'От',
                },
            },
            {
                type: 'input',
                input: {
                    placeholder: 'До',
                },
            },
        ]
    },
    {
        type: 'total-area',
        label: 'Общая площадь, м²',
        labelInfo: '',
        widget: [
            {
                type: 'input',
                input: {
                    placeholder: 'От',
                },
            },
            {
                type: 'input',
                input: {
                    placeholder: 'До',
                },
            },
        ]
    },
    {
        type: 'type-housing',
        label: 'Тип жилья',
        labelInfo: '',
        widget: [
            {
                type: 'radio',
                radio: {
                    valueList: dataValueList['type-housing'],
                    defaultValueType: 'owner',
                },
            },
        ]
    },
]

export const filterFieldParams: IFilterField = {
    ['25ce4654-953e-4589-8f2d-9d6e390d7ffe']: realty,
    ['9a36d595-d05d-4f19-b289-fcc1c337e313']: realty,
    ['b36efdc0-0a30-4033-a3df-164ac3d30176']: realty,
    ['bda61de3-a48c-403b-bb6e-7ca2bcf68bf0']: realty,
    ['9a7c8529-9540-4b0e-8d1d-c0050f55a2a0']: realty,
    ['124d11c6-9fdc-465d-9d71-1c41c759f691']: realty,
    ['2d6998d4-2a0f-46ef-9eae-e81737568b4a']: realty,
    ['cb46955c-3b31-40e3-9c04-820da75923cd']: realty,
    DEFAULT: [
        {
            type: 'price',
            label: 'Цена, ₽',
            labelInfo: '',
            widget: [
                {
                    type: 'input',
                    input: {
                        placeholder: 'От',
                    },
                },
                {
                    type: 'input',
                    input: {
                        placeholder: 'До',
                    },
                },
            ]
        },
    ]
}