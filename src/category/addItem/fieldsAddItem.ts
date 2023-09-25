
import {IFieldsAddItemList, TFieldsAddItem} from "../../Types/Profile/IAddItem";

export const dataDynamicTypesToFields: string[] = [
    'about_house',
    'registration_data',
    'technical_specifications',
    'operational_history_condition',
    'additional_options',
]

const dataTransport: IFieldsAddItemList[] = [
    {
        title: 'Расположение',
        type: 'location',
        childrenParams: ['address'],
        childrenParamsFields: [],
    },
    {
        title: 'Контакты',
        type: 'contacts',
        childrenParams: ['places_an_ad', 'phone', 'communication_method'],
        childrenParamsFields: [],
    },
    {
        title: 'Регистрационные данные',
        type: 'registration_data',
        childrenParams: ['vin_or_body_number'],
        childrenParamsFields: [],
    },
    {
        title: 'Технические характеристики',
        type: 'technical_specifications',
        childrenParams: ['marka'],
        childrenParamsFields: [],
    },
    {
        title: 'История эксплуатации и состояние',
        type: 'operational_history_condition',
        childrenParams: ['PTS', 'data_to'],
        childrenParamsFields: [],
    },
    {
        title: 'Дополнительные опции',
        type: 'additional_options',
        childrenParams: [
            'power_steering',
            'climate_management',
            'salon',
            'electric_windows',
            'audio_system',
            'headlights',
            'driving_assistance',
            'anti-theft_system',
            'airbags',
        ],
        childrenParamsFields: [],
    },
    {
        title: 'Фотографии',
        type: 'photo',
        childrenParams: [
            'photos',
            'color',
        ],
        childrenParamsFields: [],
    },
    {
        title: 'Объявление',
        type: 'advertisement',
        childrenParams: [
            'name',
            'description_of_the_transaction',
            'price',
        ],
        childrenParamsFields: [],
    },
]

const dataRealty: IFieldsAddItemList[] = [
    {
        title: 'Расположение',
        type: 'location',
        childrenParams: ['address', 'apartment_number'],
        childrenParamsFields: [],
    },
    {
        title: 'Контакты',
        type: 'contacts',
        childrenParams: ['places_an_ad', 'phone', 'communication_method'],
        childrenParamsFields: [],
    },
    {
        title: 'Регистрационные данные',
        type: 'registration_data',
        childrenParams: [
            'type_housing',
            'type_house',
            'number_of_rooms',
            'square_general',
            'square_residential',
            'ceiling_height',
            'bathroom',
            'floor',
            'window',
            'repair',
            'furniture',
            'technic',
        ],
        childrenParamsFields: [],
    },
    {
        title: 'О доме',
        type: 'about_house',
        childrenParams: [
            'type_of_house',
            'year_of_construction',
            'floors_in_the_house',
            'passenger_elevator',
            'freight_elevator',
            'yard',
            'parking_space',
        ],
        childrenParamsFields: [],
    },
    {
        title: 'Фотографии',
        type: 'photo',
        childrenParams: [
            'photos',
        ],
        childrenParamsFields: [],
    },
    {
        title: 'Объявление',
        type: 'advertisement',
        childrenParams: [
            'name',
            'description_of_the_transaction',
            'price',
        ],
        childrenParamsFields: [],
    },
]

export const fieldsAddItem: TFieldsAddItem = {
    ['cars']: dataTransport,
    ['buggy']: dataTransport,
    ['terrain-vehicles']: dataTransport,
    ['karting']: dataTransport,
    ['atvs']: dataTransport,
    ['mopeds-scooters']: dataTransport,
    ['motorcycles']: dataTransport,
    ['snowmobiles']: dataTransport,
    ['trucks-special-equipment']: dataTransport,
    ['water-transport']: dataTransport,
    ['the-buses']: dataTransport,
    ['motorhome']: dataTransport,
    ['truck-cranes']: dataTransport,
    ['bulldozers']: dataTransport,
    ['trucks']: dataTransport,
    ['utility-equipment']: dataTransport,
    ['light-commercial-transport']: dataTransport,
    ['attachments']: dataTransport,
    ['loaders']: dataTransport,
    ['trailers']: dataTransport,
    ['rowing-boats']: dataTransport,
    ['jet-skis']: dataTransport,
    ['boats-yachts']: dataTransport,
    ['kayaks-canoes']: dataTransport,
    ['motor-boats-motors']: dataTransport,
    ['inflatable-boats']: dataTransport,
    ['secondary']: dataRealty,
    ['new-building']: dataRealty,
    ['for-a-long-time']: dataRealty,
    ['daily-rent']: dataRealty,
    ['sell-off']: dataRealty,
}