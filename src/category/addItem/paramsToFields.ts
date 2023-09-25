import {IParamsToFields} from "../../Types/Profile/IAddItem";
import {IDataValueList} from "../../Types/Types";

export const dataValueList: IDataValueList = {
    ['places_an_ad']: [
        {
            name: 'Собственник',
            type: 'owner',
        },
        {
            name: 'Посредник',
            type: 'broker',
        },
    ],
    ['PTS']: [
        {
            name: 'Нету',
            type: 'Нету',
        },
        {
            name: 'Оригинал',
            type: 'Оригинал',
        },
        {
            name: 'Дубликат',
            type: 'Дубликат',
        },
        {
            name: 'Электронный',
            type: 'Электронный',
        },
    ],
    ['communication_method']: [
        {
            name: 'Сообщения',
            type: 'messages',
        },
        {
            name: 'По телефону',
            type: 'by_phone',
        },
    ],
    ['color']: [
        {
            name: 'Белый',
            type: 'white',
        },
        {
            name: 'Серебряный',
            type: 'silver',
        },
        {
            name: 'Серый',
            type: 'gray',
        },
        {
            name: 'Черный',
            type: 'black',
        },
        {
            name: 'Коричневый',
            type: 'brown',
        },
        {
            name: 'Золотой',
            type: 'golden',
        },
        {
            name: 'Бежевый',
            type: 'beige',
        },
        {
            name: 'Красный',
            type: 'red',
        },
        {
            name: 'Оранжевый',
            type: 'orange',
        },
        {
            name: 'Желтый',
            type: 'yellow',
        },
        {
            name: 'Зеленый',
            type: 'green',
        },
        {
            name: 'Голубой',
            type: 'blue',
        },
        {
            name: 'Фиолетовый',
            type: 'violet',
        },
        {
            name: 'Пурпурный',
            type: 'purple',
        },
        {
            name: 'Розовый',
            type: 'pink',
        },
    ],
    ['passenger_elevator']: [
        {
            name: 'Нет',
            type: 'no',
        },
        {
            name: '1',
            type: '1',
        },
        {
            name: '2',
            type: '2',
        },
        {
            name: '3',
            type: '3',
        },
        {
            name: '4',
            type: '4',
        },
    ],
    ['freight_elevator']: [
        {
            name: 'Нет',
            type: 'no',
        },
        {
            name: '1',
            type: '1',
        },
        {
            name: '2',
            type: '2',
        },
        {
            name: '3',
            type: '3',
        },
        {
            name: '4',
            type: '4',
        },
    ],
    ['electric_windows']: [
        {
            name: 'Нету',
            type: 'no',
        },
        {
            name: 'Только передние',
            type: 'Только передние',
        },
        {
            name: 'Передние и задние',
            type: 'Передние и задние',
        },
    ],
    ['audio_system']: [
        {
            name: 'Нету',
            type: 'no',
        },
        {
            name: '2 колонки',
            type: '2 колонки',
        },
        {
            name: '4 колонки',
            type: '4 колонки',
        },
    ],
    ['headlights']: [
        {
            name: 'Нету',
            type: 'no',
        },
        {
            name: 'Галогенные',
            type: 'Галогенные',
        },
        {
            name: 'Ксеоновые',
            type: 'Ксеоновые',
        },
    ],
    ['repair']: [
        {
            name: 'Требуется',
            type: 'is_required',
        },
        {
            name: 'Косметический',
            type: 'cosmetic',
        },
        {
            name: 'Евро',
            type: 'euro',
        },
        {
            name: 'Дизайнерский',
            type: 'designer',
        },
    ],
    ['vid_is_okna']: [
        {
            name: 'Во двор',
            type: 'into_the_yard',
        },
        {
            name: 'На улицу',
            type: 'outside',
        },
        {
            name: 'На солнечную сторону',
            type: 'on_the_sunny_side',
        },
    ],
    ['bathroom']: [
        {
            name: 'Совмещенный',
            type: 'Совмещенный',
        },
        {
            name: 'Разделенный',
            type: 'Разделенный',
        },
    ],
    ['furniture']: [
        {
            name: 'Кухня',
            type: 'Кухня',
        },
        {
            name: 'Хранение одежды',
            type: 'Хранение одежды',
        },
        {
            name: 'Спальные места',
            type: 'Спальные места',
        },
    ],
    ['yard']: [
        {
            name: 'Закрытая территория',
            type: 'Закрытая территория',
        },
        {
            name: 'Детская площадка',
            type: 'Детская площадка',
        },
        {
            name: 'Спортивная площадка',
            type: 'Спортивная площадка',
        },
    ],
    ['data_to']: [
        {
            name: 'Есть сервисная книжка',
            type: 'Есть сервисная книжка',
        },
        {
            name: 'Обслуживался у дилера',
            type: 'Обслуживался у дилера',
        },
        {
            name: 'На гарантии',
            type: 'На гарантии',
        },
    ],
    ['parking_space']: [
        {
            name: 'Подземная',
            type: 'Подземная',
        },
        {
            name: 'Наземная многоуровневая',
            type: 'Наземная многоуровневая',
        },
        {
            name: 'Открытая во двор',
            type: 'Открытая во двор',
        },
    ],
    ['technic']: [
        {
            name: 'Кондиционер',
            type: 'Кондиционер',
        },
        {
            name: 'Посудоемочная машина',
            type: 'Посудоемочная машина',
        },
        {
            name: 'Холодильник',
            type: 'Холодильник',
        },
        {
            name: 'Водонагреватель',
            type: 'Водонагреватель',
        },
        {
            name: 'Стиральная машина',
            type: 'Стиральная машина',
        },
    ],
    ['window']: [
        {
            name: 'Во двор',
            type: 'Во двор',
        },
        {
            name: 'На улицу',
            type: 'На улицу',
        },
        {
            name: 'На солнечную улицу',
            type: 'На солнечную улицу',
        },
    ],
    ['driving_assistance']: [
        {
            name: 'Автоматический парковщик',
            type: 'Автоматический парковщик',
        },
        {
            name: 'Датчик дождя',
            type: 'Датчик дождя',
        },
        {
            name: 'Датчик света',
            type: 'Датчик света',
        },
        {
            name: 'Парктроник задний',
            type: 'Парктроник задний',
        },
        {
            name: 'Система контроля слепых зон',
            type: 'Система контроля слепых зон',
        },
    ],
    ['anti-theft_system']: [
        {
            name: 'Сигнализация',
            type: 'Сигнализация',
        },
        {
            name: 'Центральный замок',
            type: 'Центральный замок',
        },
        {
            name: 'Иммобилайзер',
            type: 'Иммобилайзер',
        },
        {
            name: 'Спутник',
            type: 'Спутник',
        },
    ],
    ['airbags']: [
        {
            name: 'Фронтальные',
            type: 'Фронтальные',
        },
        {
            name: 'Коленные',
            type: 'Коленные',
        },
        {
            name: 'Шторки',
            type: 'Шторки',
        },
        {
            name: 'Боковые передние',
            type: 'Боковые передние',
        },
    ],
    ['type_housing']: [
        {
            name: 'Выбрать',
            type: 'DEFAULT'
        },
        {
            name: 'Квартира',
            type: 'kvartira'
        },
        {
            name: 'Апартаменты',
            type: 'apartaments'
        },
    ],
    ['type_of_house']: [
        {
            name: 'Выбрать',
            type: 'DEFAULT'
        },
        {
            name: 'Кирпичный',
            type: 'brick'
        },
        {
            name: 'Панельный',
            type: 'panels'
        },
        {
            name: 'Блочный',
            type: 'blocks'
        },
        {
            name: 'Монолитный',
            type: 'monolit'
        },
        {
            name: 'Деревянный',
            type: 'derevyanny'
        },
    ],
    ['type_house']: [
        {
            name: 'Выбрать',
            type: 'DEFAULT'
        },
        {
            name: 'Кирпичный',
            type: 'brick'
        },
        {
            name: 'Панельный',
            type: 'panel'
        },
    ],
    ['marka']: [
        {
            name: 'Выбрать',
            type: 'DEFAULT'
        },
        {
            name: 'AC',
            type: 'AC'
        },
        {
            name: 'Уаз',
            type: 'Уаз'
        },
        {
            name: 'РАФ',
            type: 'РАФ'
        },
    ],
    ['power_steering']: [
        {
            name: 'Выбрать',
            type: 'DEFAULT'
        },
        {
            name: 'Нету',
            type: 'Нету'
        },
        {
            name: 'Гидравлический',
            type: 'Гидравлический'
        },
        {
            name: 'Электрический',
            type: 'Электрический'
        },
    ],
    ['climate_management']: [
        {
            name: 'Выбрать',
            type: 'DEFAULT'
        },
        {
            name: 'Нету',
            type: 'Нету'
        },
        {
            name: 'Кондиционер',
            type: 'Кондиционер'
        },
        {
            name: 'Климат-контроль',
            type: 'Климат-контроль'
        },
    ],
    ['salon']: [
        {
            name: 'Выбрать',
            type: 'DEFAULT'
        },
        {
            name: 'Нету',
            type: 'Нету'
        },
        {
            name: 'Кожа',
            type: 'Кожа'
        },
        {
            name: 'Ткань',
            type: 'Ткань'
        },
        {
            name: 'Комбинированный',
            type: 'Комбинированный'
        },
    ],
}

export const paramsToFields: IParamsToFields[] = [
    {
        type: 'photos',
        label: 'Фотографии',
        labelInfo: '',
        widget: {
            required: false,
            type: 'images',
        },
    },
    {
        type: 'address',
        label: 'Адрес',
        labelInfo: '',
        widget: {
            required: true,
            type: 'input',
            input: {
                placeholder: 'Улица и номер дома',
            },
            errors: {
                status: true,
                errorText: 'Заполните поле'
            },
        },
    },
    {
        type: 'vin_or_body_number',
        label: 'VIN или номер кузова',
        labelInfo: '',
        widget: {
            required: false,
            type: 'input',
            input: {
                placeholder: '',
            },
        },
    },
    {
        type: 'name',
        label: 'Название',
        labelInfo: '',
        widget: {
            required: true,
            type: 'input',
            input: {
                placeholder: 'Название объявления',
            },
            errors: {
                status: true,
                errorText: 'Заполните поле'
            },
        },
    },
    {
        type: 'price',
        label: 'Цена',
        labelInfo: '',
        widget: {
            required: true,
            type: 'input',
            errors: {
                status: true,
                errorText: 'Заполните поле'
            },
        },
    },
    {
        type: 'description_of_the_transaction',
        label: 'Описание сделки',
        labelInfo: '',
        widget: {
            required: true,
            type: 'textarea',
            input: {
                placeholder: 'Расскажите больше информации',
            },
            errors: {
                status: true,
                errorText: 'Заполните поле'
            },
        },
    },
    {
        type: 'year_of_construction',
        label: 'Год постройки',
        labelInfo: '',
        widget: {
            required: false,
            type: 'input',
            input: {
                placeholder: 'Улица и номер дома',
            },
        },
    },
    {
        type: 'floors_in_the_house',
        label: 'Этажей в доме',
        labelInfo: '',
        widget: {
            required: false,
            type: 'input',
        },
    },
    {
        type: 'floor',
        label: 'Этаж',
        labelInfo: '',
        widget: {
            required: false,
            type: 'input',
        },
    },
    {
        type: 'number_of_rooms',
        label: 'Количество комнат',
        labelInfo: '',
        widget: {
            required: true,
            type: 'input',
            errors: {
                status: true,
                errorText: 'Заполните поле'
            },
        },
    },
    {
        type: 'square_general',
        label: 'Площадь общая',
        labelInfo: '',
        widget: {
            required: true,
            type: 'input',
            input: {
                placeholder: '0,0 м2',
            },
            errors: {
                status: true,
                errorText: 'Заполните поле'
            },
        },
    },
    {
        type: 'square_residential',
        label: 'Площадь Жилая',
        labelInfo: '',
        widget: {
            required: true,
            type: 'input',
            input: {
                placeholder: '0,0 м2',
            },
            errors: {
                status: true,
                errorText: 'Заполните поле'
            },
        },
    },
    {
        type: 'ceiling_height',
        label: 'Высота потолков',
        labelInfo: '',
        widget: {
            required: true,
            type: 'input',
            input: {
                placeholder: '0,0 м',
            },
            errors: {
                status: true,
                errorText: 'Заполните поле'
            },
        },
    },
    {
        type: 'apartment_number',
        label: 'Номер квартиры',
        labelInfo: 'Мы добавим в объявление данные из Росреестра: количество собственников, наличие ограничений. Если с квартирой всё в порядке, покупатели об этом узнают.',
        widget: {
            required: false,
            type: 'input',
        },
    },
    {
        type: 'places_an_ad',
        label: 'Размещает объявление',
        labelInfo: '',
        widget: {
            required: true,
            type: 'radio',
            radio: {
                valueList: dataValueList['places_an_ad'],
                defaultValueType: 'owner',
            },
            errors: {
                status: true,
                errorText: 'Выберите пункт'
            },
        },
    },
    {
        type: 'PTS',
        label: 'ПТС',
        labelInfo: '',
        widget: {
            required: true,
            type: 'radio',
            radio: {
                valueList: dataValueList['PTS'],
            },
            errors: {
                status: true,
                errorText: 'Выберите пункт'
            },
        },
    },
    {
        type: 'phone',
        label: 'Телефон',
        labelInfo: '',
        widget: {
            required: true,
            type: 'input',
            errors: {
                status: true,
                errorText: 'Заполните поле'
            },
        },
    },
    {
        type: 'communication_method',
        label: 'Способ связи',
        labelInfo: '',
        widget: {
            required: true,
            type: 'radio',
            radio: {
                valueList: dataValueList['communication_method'],
            },
            errors: {
                status: true,
                errorText: 'Выберите пункт'
            },
        },
    },
    {
        type: 'color',
        label: 'Цвет',
        labelInfo: '',
        widget: {
            required: false,
            type: 'radioColor',
            radio: {
                valueList: dataValueList['color'],
            },
        },
    },
    {
        type: 'passenger_elevator',
        label: 'Лифт пассажирский',
        labelInfo: '',
        widget: {
            required: false,
            type: 'radio',
            radio: {
                valueList: dataValueList['passenger_elevator'],
            },
        },
    },
    {
        type: 'freight_elevator',
        label: 'Лифт грузовой',
        labelInfo: '',
        widget: {
            required: false,
            type: 'radio',
            radio: {
                valueList: dataValueList['freight_elevator'],
            },
        },
    },
    {
        type: 'electric_windows',
        label: 'Электростеклоподъемники',
        labelInfo: '',
        widget: {
            required: false,
            type: 'radio',
            radio: {
                valueList: dataValueList['electric_windows'],
            },
        },
    },
    {
        type: 'audio_system',
        label: 'Аудиосистема',
        labelInfo: '',
        widget: {
            required: false,
            type: 'radio',
            radio: {
                valueList: dataValueList['audio_system'],
            },
        },
    },
    {
        type: 'headlights',
        label: 'Фары',
        labelInfo: '',
        widget: {
            required: false,
            type: 'radio',
            radio: {
                valueList: dataValueList['headlights'],
            },
        },
    },
    {
        type: 'repair',
        label: 'Ремонт',
        labelInfo: '',
        widget: {
            required: false,
            type: 'radio',
            radio: {
                valueList: dataValueList['repair'],
            },
        },
    },
    {
        type: 'vid_is_okna',
        label: 'Окна',
        labelInfo: '',
        widget: {
            required: false,
            type: 'checkboxList',
            checkboxList: {
                valueList: dataValueList['vid_is_okna'],
            }
        },
    },
    {
        type: 'bathroom',
        label: 'Санузел',
        labelInfo: '',
        widget: {
            required: false,
            type: 'checkboxList',
            checkboxList: {
                valueList: dataValueList['bathroom'],
                defaultValueType: ['Совмещенный'],
            },
        },
    },
    {
        type: 'furniture',
        label: 'Мебель',
        labelInfo: '',
        widget: {
            required: false,
            type: 'checkboxList',
            checkboxList: {
                valueList: dataValueList['furniture'],
            },
        },
    },
    {
        type: 'yard',
        label: 'Двор',
        labelInfo: '',
        widget: {
            required: false,
            type: 'checkboxList',
            checkboxList: {
                valueList: dataValueList['yard'],
            },
        },
    },
    {
        type: 'data_to',
        label: 'Данные о ТО',
        labelInfo: '',
        widget: {
            required: false,
            type: 'checkboxList',
            checkboxList: {
                valueList: dataValueList['data_to'],
            },
        },
    },
    {
        type: 'parking_space',
        label: 'Парковка',
        labelInfo: '',
        widget: {
            required: false,
            type: 'checkboxList',
            checkboxList: {
                valueList: dataValueList['parking_space'],
            },
        },
    },
    {
        type: 'technic',
        label: 'Техника',
        labelInfo: '',
        widget: {
            required: false,
            type: 'checkboxList',
            checkboxList: {
                valueList: dataValueList['technic'],
            },
        },
    },
    {
        type: 'window',
        label: 'Окна',
        labelInfo: '',
        widget: {
            required: false,
            type: 'checkboxList',
            checkboxList: {
                valueList: dataValueList['window'],
            },
        },
    },
    {
        type: 'driving_assistance',
        label: 'Помощь при вождении',
        labelInfo: '',
        widget: {
            required: false,
            type: 'checkboxList',
            checkboxList: {
                valueList: dataValueList['driving_assistance'],
            },
        },
    },
    {
        type: 'anti-theft_system',
        label: 'Противоугонная система',
        labelInfo: '',
        widget: {
            required: false,
            type: 'checkboxList',
            checkboxList: {
                valueList: dataValueList['anti-theft_system'],
            },
        },
    },
    {
        type: 'airbags',
        label: 'Подушки безопасности',
        labelInfo: '',
        widget: {
            required: false,
            type: 'checkboxList',
            checkboxList: {
                valueList: dataValueList['airbags'],
            },
        },
    },
    {
        type: 'type_housing',
        label: 'Тип жилья',
        labelInfo: '',
        widget: {
            required: false,
            type: 'select',
            select: {
                valueList: dataValueList['type_housing'],
            }
        },
    },
    {
        type: 'type_of_house',
        label: 'Тип дома',
        labelInfo: '',
        widget: {
            required: false,
            type: 'select',
            select: {
                valueList: dataValueList['type_of_house'],
                defaultValueType: 'brick',
            }
        },
    },
    {
        type: 'type_house',
        label: 'Тип дома',
        labelInfo: '',
        widget: {
            required: false,
            type: 'select',
            select: {
                valueList: dataValueList['type_house'],
            },
        },
    },
    {
        type: 'marka',
        label: 'Марка',
        labelInfo: '',
        widget: {
            required: false,
            type: 'select',
            select: {
                valueList: dataValueList['marka'],
            },
        },
    },
    {
        type: 'power_steering',
        label: 'Усилитель руля',
        labelInfo: '',
        widget: {
            required: false,
            type: 'select',
            select: {
                valueList: dataValueList['power_steering'],
            },
        },
    },
    {
        type: 'climate_management',
        label: 'Управление климатом',
        labelInfo: '',
        widget: {
            required: false,
            type: 'select',
            select: {
                valueList: dataValueList['climate_management'],
            },
        },
    },
    {
        type: 'salon',
        label: 'Салон',
        labelInfo: '',
        widget: {
            required: false,
            type: 'select',
            select: {
                valueList: dataValueList['salon'],
            },
        },
    },
]
