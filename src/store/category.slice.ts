import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICategoryItemList, ICategoryItemTree, TUuid} from "../Types/Types";

interface ICategorySlice {
    categoryTree: ICategoryItemTree[];
    categoryTreeList: {
        [key: TUuid]: ICategoryItemList
    };
}

const initialState: ICategorySlice = {
    categoryTree: [
        {
            "name": "Транспорт",
            "type": "transport",
            "uuid": "7f7eea7b-03e1-479a-b1e5-13ab22e5b156",
            "children": [
                {
                    "name": "Автомобили",
                    "type": "cars",
                    "uuid": "d3fb6176-1bb2-48a6-9416-85ba748308d0",
                    "children": []
                },
                {
                    "name": "Мотоциклы и мототехника",
                    "type": "motorcycles-and-motor-vehicles",
                    "uuid": "60b490b2-3f18-4b5c-943f-f3cb16b5bb83",
                    "children": [
                        {
                            "name": "Багги",
                            "type": "buggy",
                            "uuid": "408fd6bf-13b5-420d-a47a-983c5e14abcf",
                            "children": []
                        },
                        {
                            "name": "Вездеходы",
                            "type": "terrain-vehicles",
                            "uuid": "dfa16f58-b9ee-4f08-9e99-8c6e00fe886d",
                            "children": []
                        },
                        {
                            "name": "Картинг",
                            "type": "karting",
                            "uuid": "950ef4f4-a845-4924-aab7-c85535410e2c",
                            "children": []
                        },
                        {
                            "name": "Квадроциклы",
                            "type": "atvs",
                            "uuid": "53019290-7ce3-40cf-8017-ed0b3067b491",
                            "children": []
                        },
                        {
                            "name": "Мопеды и скутеры",
                            "type": "mopeds-scooters",
                            "uuid": "2cd9d6af-cfbc-497e-ad06-25e251e90b1e",
                            "children": []
                        },
                        {
                            "name": "Мотоциклы",
                            "type": "motorcycles",
                            "uuid": "1d835a3c-942b-4058-ac25-e7b8d564422b",
                            "children": []
                        },
                        {
                            "name": "Снегоходы",
                            "type": "snowmobiles",
                            "uuid": "6a076e0a-c80b-4f85-b800-5676bf9d391d",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "Грузовики и спецтехника",
                    "type": "trucks-special-equipment",
                    "uuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
                    "children": [
                        {
                            "name": "Автобусы",
                            "type": "the-buses",
                            "uuid": "9e40526b-18cd-4ab5-9f64-a0749cb755c5",
                            "children": []
                        },
                        {
                            "name": "Автодома",
                            "type": "motorhome",
                            "uuid": "4619932c-24b2-4c59-9cfc-442089e01be0",
                            "children": []
                        },
                        {
                            "name": "Автокраны",
                            "type": "truck-cranes",
                            "uuid": "f0f67973-aff6-4b37-8d5b-6fb391943af0",
                            "children": []
                        },
                        {
                            "name": "Бульдозеры",
                            "type": "bulldozers",
                            "uuid": "916e6c5d-7874-49e7-867a-beea3d7906dc",
                            "children": []
                        },
                        {
                            "name": "Грузовики",
                            "type": "trucks",
                            "uuid": "5303bfe3-3ecf-44ca-9246-28409a64b113",
                            "children": []
                        },
                        {
                            "name": "Коммунальная техника",
                            "type": "utility-equipment",
                            "uuid": "942ec923-2d96-4a07-89c7-25e85e64b6d3",
                            "children": []
                        },
                        {
                            "name": "Лёгкий коммерческий транспорт",
                            "type": "light-commercial-transport",
                            "uuid": "32bfe9e0-0052-4ff6-9cf4-8728cbfd318e",
                            "children": []
                        },
                        {
                            "name": "Навесное оборудование",
                            "type": "attachments",
                            "uuid": "d810bd48-a72a-48f4-a77e-cdbbfd4f9dae",
                            "children": []
                        },
                        {
                            "name": "Погрузчики",
                            "type": "loaders",
                            "uuid": "e654b0b5-7f4b-4aab-a5f1-99200cdaf2a8",
                            "children": []
                        },
                        {
                            "name": "Прицепы",
                            "type": "trailers",
                            "uuid": "a70ff755-26b4-458a-ba14-873a86198bd1",
                            "children": []
                        }
                    ]
                },
                {
                    "name": "Водный транспорт",
                    "type": "water-transport",
                    "uuid": "66e16766-bc4c-4e8e-b0cc-fa0df64949df",
                    "children": [
                        {
                            "name": "Вёсельные лодки",
                            "type": "rowing-boats",
                            "uuid": "edfc82cf-72a6-491b-82dc-95361225675a",
                            "children": []
                        },
                        {
                            "name": "Гидроциклы",
                            "type": "jet-skis",
                            "uuid": "2a701829-7539-4393-9fa2-6419939c6391",
                            "children": []
                        },
                        {
                            "name": "Катера и яхты",
                            "type": "boats-yachts",
                            "uuid": "f9bd2223-2a10-4764-8714-613f97dea5ca",
                            "children": []
                        },
                        {
                            "name": "Каяки и каноэ",
                            "type": "kayaks-canoes",
                            "uuid": "ce3c4200-12ac-4207-9076-48af8f384be1",
                            "children": []
                        },
                        {
                            "name": "Моторные лодки и моторы",
                            "type": "motor-boats-motors",
                            "uuid": "487805b0-59d9-4aaf-8c33-8d13f5b24ba4",
                            "children": []
                        },
                        {
                            "name": "Надувные лодки",
                            "type": "inflatable-boats",
                            "uuid": "cbbf86ca-ac6f-4a4a-9764-16b56324dc82",
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "name": "Недвижимость",
            "type": "realty",
            "uuid": "18b8263b-0631-4153-b1c7-57428af036cc",
            "children": [
                {
                    "name": "Квартиры",
                    "type": "apartments",
                    "uuid": "c12d57c5-99f4-4e07-bb1b-91d542b3f04f",
                    "children": [
                        {
                            "name": "Продам",
                            "type": "sell-off",
                            "uuid": "eb74be11-2b1e-4531-af11-ddf37eae64f3",
                            "children": [
                                {
                                    "name": "Вторичка",
                                    "type": "secondary",
                                    "uuid": "25ce4654-953e-4589-8f2d-9d6e390d7ffe",
                                    "children": []
                                },
                                {
                                    "name": "Новостройка",
                                    "type": "new-building",
                                    "uuid": "9a36d595-d05d-4f19-b289-fcc1c337e313",
                                    "children": []
                                }
                            ]
                        },
                        {
                            "name": "Сдам",
                            "type": "rent",
                            "uuid": "f6d39517-ee01-4faf-9678-e7edb59d9964",
                            "children": [
                                {
                                    "name": "На длительный срок",
                                    "type": "for-a-long-time",
                                    "uuid": "b36efdc0-0a30-4033-a3df-164ac3d30176",
                                    "children": []
                                },
                                {
                                    "name": "Посуточно",
                                    "type": "daily-rent",
                                    "uuid": "bda61de3-a48c-403b-bb6e-7ca2bcf68bf0",
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Комнаты",
                    "type": "rooms",
                    "uuid": "fd1ce769-843a-440f-8c76-87ca058c465c",
                    "children": [
                        {
                            "name": "Продам",
                            "type": "sell-off",
                            "uuid": "2d6998d4-2a0f-46ef-9eae-e81737568b4a",
                            "children": []
                        },
                        {
                            "name": "Сдам",
                            "type": "rent",
                            "uuid": "9a7c8529-9540-4b0e-8d1d-c0050f55a2a0",
                            "children": [
                                {
                                    "name": "На длительный срок",
                                    "type": "for-a-long-time",
                                    "uuid": "124d11c6-9fdc-465d-9d71-1c41c759f691",
                                    "children": []
                                },
                                {
                                    "name": "Посуточно",
                                    "type": "daily-rent",
                                    "uuid": "cb46955c-3b31-40e3-9c04-820da75923cd",
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Дом, дача, коттедж",
                    "type": "house-cottage",
                    "uuid": "ed4372f2-a176-495e-95a1-8afa55cd29b9",
                    "children": [
                        {
                            "name": "Продам",
                            "type": "sell-off",
                            "uuid": "b9d9636c-64ce-4cb3-99a2-6c606096e519",
                            "children": []
                        },
                        {
                            "name": "Сдам",
                            "type": "rent",
                            "uuid": "60e9adf9-a401-4357-b0ba-02a171546362",
                            "children": [
                                {
                                    "name": "На длительный срок",
                                    "type": "for-a-long-time",
                                    "uuid": "ed5028fc-285b-44f1-849d-2b9fc8bf8822",
                                    "children": []
                                },
                                {
                                    "name": "Посуточно",
                                    "type": "daily-rent",
                                    "uuid": "94499dfd-5ae1-43c6-aaaa-602fcea4ba46",
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Земельный участок",
                    "type": "land-plot",
                    "uuid": "d2e1ef59-cacf-4d59-b6d9-76e7f7590f39",
                    "children": [
                        {
                            "name": "Продам",
                            "type": "sell-off",
                            "uuid": "b89bf85f-d8fa-429c-b34f-9ccf6074673d",
                            "children": []
                        },
                        {
                            "name": "Сдам",
                            "type": "rent",
                            "uuid": "231cd517-7421-4ffc-856b-d7814289061e",
                            "children": [
                                {
                                    "name": "На длительный срок",
                                    "type": "for-a-long-time",
                                    "uuid": "f25725bd-0417-47ca-9f40-da141c093f19",
                                    "children": []
                                },
                                {
                                    "name": "Посуточно",
                                    "type": "daily-rent",
                                    "uuid": "c7a1b6e4-5663-421e-a26d-f241d7411269",
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Гараж и машинометсо",
                    "type": "garage-parking-meter",
                    "uuid": "68f25add-7ce9-4ab5-9263-6af2d26219e3",
                    "children": [
                        {
                            "name": "Продам",
                            "type": "sell-off",
                            "uuid": "6dc21399-6784-40d7-81e8-6963e5be43dd",
                            "children": []
                        },
                        {
                            "name": "Сдам",
                            "type": "rent",
                            "uuid": "cc1c7efa-7cb5-48cd-9d46-24366604bee7",
                            "children": [
                                {
                                    "name": "На длительный срок",
                                    "type": "for-a-long-time",
                                    "uuid": "a03070c1-9156-47a3-9f50-192691387380",
                                    "children": []
                                },
                                {
                                    "name": "Посуточно",
                                    "type": "daily-rent",
                                    "uuid": "078d32a2-411e-4c8b-8370-579636649171",
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Коммерческая недвижимость",
                    "type": "commercial-real-estate",
                    "uuid": "306ec998-ba44-4365-845c-be7200b94065",
                    "children": [
                        {
                            "name": "Продам",
                            "type": "sell-off",
                            "uuid": "a12e2513-1d0f-47da-bce5-32949ab87cff",
                            "children": []
                        },
                        {
                            "name": "Сдам",
                            "type": "rent",
                            "uuid": "35ab1806-f992-443c-a668-35b2230f22e2",
                            "children": [
                                {
                                    "name": "На длительный срок",
                                    "type": "for-a-long-time",
                                    "uuid": "753df103-4764-4273-82be-3cc3d0eddc46",
                                    "children": []
                                },
                                {
                                    "name": "Посуточно",
                                    "type": "daily-rent",
                                    "uuid": "bd391ca9-29dd-4cb6-b6a3-bf7113d33705",
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Недвижимость за рубежом",
                    "type": "real-estate-abroad",
                    "uuid": "f851ec58-3905-47ab-9fb3-974e6af48c09",
                    "children": [
                        {
                            "name": "Продам",
                            "type": "sell-off",
                            "uuid": "8ce91801-b563-4f07-bc0d-ca5b6107745c",
                            "children": []
                        },
                        {
                            "name": "Сдам",
                            "type": "rent",
                            "uuid": "bf8689de-ecc5-4c38-ad49-cbcd762689c8",
                            "children": [
                                {
                                    "name": "На длительный срок",
                                    "type": "for-a-long-time",
                                    "uuid": "fef35cbb-99c4-4283-ad09-4890f8024520",
                                    "children": []
                                },
                                {
                                    "name": "Посуточно",
                                    "type": "daily-rent",
                                    "uuid": "d43e93c6-3829-4d4e-9c6d-5167140af61c",
                                    "children": []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    categoryTreeList: {
        "7f7eea7b-03e1-479a-b1e5-13ab22e5b156": {
            "name": "Транспорт",
            "type": "transport",
            "uuid": "7f7eea7b-03e1-479a-b1e5-13ab22e5b156",
            "parentUuid": null,
        },
        "18b8263b-0631-4153-b1c7-57428af036cc": {
            "name": "Недвижимость",
            "type": "realty",
            "uuid": "18b8263b-0631-4153-b1c7-57428af036cc",
            "parentUuid": null,
        },
        "d3fb6176-1bb2-48a6-9416-85ba748308d0": {
            "name": "Автомобили",
            "type": "cars",
            "uuid": "d3fb6176-1bb2-48a6-9416-85ba748308d0",
            "parentUuid": "7f7eea7b-03e1-479a-b1e5-13ab22e5b156",
        },
        "60b490b2-3f18-4b5c-943f-f3cb16b5bb83": {
            "name": "Мотоциклы и мототехника",
            "type": "motorcycles-and-motor-vehicles",
            "uuid": "60b490b2-3f18-4b5c-943f-f3cb16b5bb83",
            "parentUuid": "7f7eea7b-03e1-479a-b1e5-13ab22e5b156",
        },
        "c6326bf8-5ca5-4cbc-adce-34467c4bc815": {
            "name": "Грузовики и спецтехника",
            "type": "trucks-special-equipment",
            "uuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
            "parentUuid": "7f7eea7b-03e1-479a-b1e5-13ab22e5b156",
        },
        "66e16766-bc4c-4e8e-b0cc-fa0df64949df": {
            "name": "Водный транспорт",
            "type": "water-transport",
            "uuid": "66e16766-bc4c-4e8e-b0cc-fa0df64949df",
            "parentUuid": "7f7eea7b-03e1-479a-b1e5-13ab22e5b156",
        },
        "edfc82cf-72a6-491b-82dc-95361225675a": {
            "name": "Вёсельные лодки",
            "type": "rowing-boats",
            "uuid": "edfc82cf-72a6-491b-82dc-95361225675a",
            "parentUuid": "66e16766-bc4c-4e8e-b0cc-fa0df64949df",
        },
        "2a701829-7539-4393-9fa2-6419939c6391": {
            "name": "Гидроциклы",
            "type": "jet-skis",
            "uuid": "2a701829-7539-4393-9fa2-6419939c6391",
            "parentUuid": "66e16766-bc4c-4e8e-b0cc-fa0df64949df",
        },
        "f9bd2223-2a10-4764-8714-613f97dea5ca": {
            "name": "Катера и яхты",
            "type": "boats-yachts",
            "uuid": "f9bd2223-2a10-4764-8714-613f97dea5ca",
            "parentUuid": "66e16766-bc4c-4e8e-b0cc-fa0df64949df",
        },
        "ce3c4200-12ac-4207-9076-48af8f384be1": {
            "name": "Каяки и каноэ",
            "type": "kayaks-canoes",
            "uuid": "ce3c4200-12ac-4207-9076-48af8f384be1",
            "parentUuid": "66e16766-bc4c-4e8e-b0cc-fa0df64949df",
        },
        "487805b0-59d9-4aaf-8c33-8d13f5b24ba4": {
            "name": "Моторные лодки и моторы",
            "type": "motor-boats-motors",
            "uuid": "487805b0-59d9-4aaf-8c33-8d13f5b24ba4",
            "parentUuid": "66e16766-bc4c-4e8e-b0cc-fa0df64949df",
        },
        "cbbf86ca-ac6f-4a4a-9764-16b56324dc82": {
            "name": "Надувные лодки",
            "type": "inflatable-boats",
            "uuid": "cbbf86ca-ac6f-4a4a-9764-16b56324dc82",
            "parentUuid": "66e16766-bc4c-4e8e-b0cc-fa0df64949df",
        },
        "c12d57c5-99f4-4e07-bb1b-91d542b3f04f": {
            "name": "Квартиры",
            "type": "apartments",
            "uuid": "c12d57c5-99f4-4e07-bb1b-91d542b3f04f",
            "parentUuid": "18b8263b-0631-4153-b1c7-57428af036cc",
        },
        "eb74be11-2b1e-4531-af11-ddf37eae64f3": {
            "name": "Продам",
            "type": "sell-off",
            "uuid": "eb74be11-2b1e-4531-af11-ddf37eae64f3",
            "parentUuid": "c12d57c5-99f4-4e07-bb1b-91d542b3f04f",
        },
        "25ce4654-953e-4589-8f2d-9d6e390d7ffe": {
            "name": "Вторичка",
            "type": "secondary",
            "uuid": "25ce4654-953e-4589-8f2d-9d6e390d7ffe",
            "parentUuid": "eb74be11-2b1e-4531-af11-ddf37eae64f3",
        },
        "9a36d595-d05d-4f19-b289-fcc1c337e313": {
            "name": "Новостройка",
            "type": "new-building",
            "uuid": "9a36d595-d05d-4f19-b289-fcc1c337e313",
            "parentUuid": "eb74be11-2b1e-4531-af11-ddf37eae64f3",
        },
        "f6d39517-ee01-4faf-9678-e7edb59d9964": {
            "name": "Сдам",
            "type": "rent",
            "uuid": "f6d39517-ee01-4faf-9678-e7edb59d9964",
            "parentUuid": "c12d57c5-99f4-4e07-bb1b-91d542b3f04f",
        },
        "b36efdc0-0a30-4033-a3df-164ac3d30176": {
            "name": "На длительный срок",
            "type": "for-a-long-time",
            "uuid": "b36efdc0-0a30-4033-a3df-164ac3d30176",
            "parentUuid": "f6d39517-ee01-4faf-9678-e7edb59d9964",
        },
        "bda61de3-a48c-403b-bb6e-7ca2bcf68bf0": {
            "name": "Посуточно",
            "type": "daily-rent",
            "uuid": "bda61de3-a48c-403b-bb6e-7ca2bcf68bf0",
            "parentUuid": "f6d39517-ee01-4faf-9678-e7edb59d9964",
        },
        "fd1ce769-843a-440f-8c76-87ca058c465c": {
            "name": "Комнаты",
            "type": "rooms",
            "uuid": "fd1ce769-843a-440f-8c76-87ca058c465c",
            "parentUuid": "18b8263b-0631-4153-b1c7-57428af036cc",
        },
        "2d6998d4-2a0f-46ef-9eae-e81737568b4a": {
            "name": "Продам",
            "type": "sell-off",
            "uuid": "2d6998d4-2a0f-46ef-9eae-e81737568b4a",
            "parentUuid": "fd1ce769-843a-440f-8c76-87ca058c465c",
        },
        "9a7c8529-9540-4b0e-8d1d-c0050f55a2a0": {
            "name": "Сдам",
            "type": "rent",
            "uuid": "9a7c8529-9540-4b0e-8d1d-c0050f55a2a0",
            "parentUuid": "fd1ce769-843a-440f-8c76-87ca058c465c",
        },
        "124d11c6-9fdc-465d-9d71-1c41c759f691": {
            "name": "На длительный срок",
            "type": "for-a-long-time",
            "uuid": "124d11c6-9fdc-465d-9d71-1c41c759f691",
            "parentUuid": "9a7c8529-9540-4b0e-8d1d-c0050f55a2a0",
        },
        "cb46955c-3b31-40e3-9c04-820da75923cd": {
            "name": "Посуточно",
            "type": "daily-rent",
            "uuid": "cb46955c-3b31-40e3-9c04-820da75923cd",
            "parentUuid": "9a7c8529-9540-4b0e-8d1d-c0050f55a2a0",
        },
        "ed4372f2-a176-495e-95a1-8afa55cd29b9": {
            "name": "Дом, дача, коттедж",
            "type": "house-cottage",
            "uuid": "ed4372f2-a176-495e-95a1-8afa55cd29b9",
            "parentUuid": "18b8263b-0631-4153-b1c7-57428af036cc",
        },
        "b9d9636c-64ce-4cb3-99a2-6c606096e519": {
            "name": "Продам",
            "type": "sell-off",
            "uuid": "b9d9636c-64ce-4cb3-99a2-6c606096e519",
            "parentUuid": "ed4372f2-a176-495e-95a1-8afa55cd29b9",
        },
        "60e9adf9-a401-4357-b0ba-02a171546362": {
            "name": "Сдам",
            "type": "rent",
            "uuid": "60e9adf9-a401-4357-b0ba-02a171546362",
            "parentUuid": "ed4372f2-a176-495e-95a1-8afa55cd29b9",
        },
        "ed5028fc-285b-44f1-849d-2b9fc8bf8822": {
            "name": "На длительный срок",
            "type": "for-a-long-time",
            "uuid": "ed5028fc-285b-44f1-849d-2b9fc8bf8822",
            "parentUuid": "60e9adf9-a401-4357-b0ba-02a171546362",
        },
        "94499dfd-5ae1-43c6-aaaa-602fcea4ba46": {
            "name": "Посуточно",
            "type": "daily-rent",
            "uuid": "94499dfd-5ae1-43c6-aaaa-602fcea4ba46",
            "parentUuid": "60e9adf9-a401-4357-b0ba-02a171546362",
        },
        "d2e1ef59-cacf-4d59-b6d9-76e7f7590f39": {
            "name": "Земельный участок",
            "type": "land-plot",
            "uuid": "d2e1ef59-cacf-4d59-b6d9-76e7f7590f39",
            "parentUuid": "18b8263b-0631-4153-b1c7-57428af036cc",
        },
        "b89bf85f-d8fa-429c-b34f-9ccf6074673d": {
            "name": "Продам",
            "type": "sell-off",
            "uuid": "b89bf85f-d8fa-429c-b34f-9ccf6074673d",
            "parentUuid": "d2e1ef59-cacf-4d59-b6d9-76e7f7590f39",
        },
        "231cd517-7421-4ffc-856b-d7814289061e": {
            "name": "Сдам",
            "type": "rent",
            "uuid": "231cd517-7421-4ffc-856b-d7814289061e",
            "parentUuid": "d2e1ef59-cacf-4d59-b6d9-76e7f7590f39",
        },
        "f25725bd-0417-47ca-9f40-da141c093f19": {
            "name": "На длительный срок",
            "type": "for-a-long-time",
            "uuid": "f25725bd-0417-47ca-9f40-da141c093f19",
            "parentUuid": "231cd517-7421-4ffc-856b-d7814289061e",
        },
        "c7a1b6e4-5663-421e-a26d-f241d7411269": {
            "name": "Посуточно",
            "type": "daily-rent",
            "uuid": "c7a1b6e4-5663-421e-a26d-f241d7411269",
            "parentUuid": "231cd517-7421-4ffc-856b-d7814289061e",
        },
        "68f25add-7ce9-4ab5-9263-6af2d26219e3": {
            "name": "Гараж и машинометсо",
            "type": "garage-parking-meter",
            "uuid": "68f25add-7ce9-4ab5-9263-6af2d26219e3",
            "parentUuid": "18b8263b-0631-4153-b1c7-57428af036cc",
        },
        "6dc21399-6784-40d7-81e8-6963e5be43dd": {
            "name": "Продам",
            "type": "sell-off",
            "uuid": "6dc21399-6784-40d7-81e8-6963e5be43dd",
            "parentUuid": "68f25add-7ce9-4ab5-9263-6af2d26219e3",
        },
        "cc1c7efa-7cb5-48cd-9d46-24366604bee7": {
            "name": "Сдам",
            "type": "rent",
            "uuid": "cc1c7efa-7cb5-48cd-9d46-24366604bee7",
            "parentUuid": "68f25add-7ce9-4ab5-9263-6af2d26219e3",
        },
        "a03070c1-9156-47a3-9f50-192691387380": {
            "name": "На длительный срок",
            "type": "for-a-long-time",
            "uuid": "a03070c1-9156-47a3-9f50-192691387380",
            "parentUuid": "cc1c7efa-7cb5-48cd-9d46-24366604bee7",
        },
        "078d32a2-411e-4c8b-8370-579636649171": {
            "name": "Посуточно",
            "type": "daily-rent",
            "uuid": "078d32a2-411e-4c8b-8370-579636649171",
            "parentUuid": "cc1c7efa-7cb5-48cd-9d46-24366604bee7",
        },
        "306ec998-ba44-4365-845c-be7200b94065": {
            "name": "Коммерческая недвижимость",
            "type": "commercial-real-estate",
            "uuid": "306ec998-ba44-4365-845c-be7200b94065",
            "parentUuid": "18b8263b-0631-4153-b1c7-57428af036cc",
        },
        "a12e2513-1d0f-47da-bce5-32949ab87cff": {
            "name": "Продам",
            "type": "sell-off",
            "uuid": "a12e2513-1d0f-47da-bce5-32949ab87cff",
            "parentUuid": "306ec998-ba44-4365-845c-be7200b94065",
        },
        "35ab1806-f992-443c-a668-35b2230f22e2": {
            "name": "Сдам",
            "type": "rent",
            "uuid": "35ab1806-f992-443c-a668-35b2230f22e2",
            "parentUuid": "306ec998-ba44-4365-845c-be7200b94065",
        },
        "753df103-4764-4273-82be-3cc3d0eddc46": {
            "name": "На длительный срок",
            "type": "for-a-long-time",
            "uuid": "753df103-4764-4273-82be-3cc3d0eddc46",
            "parentUuid": "35ab1806-f992-443c-a668-35b2230f22e2",
        },
        "bd391ca9-29dd-4cb6-b6a3-bf7113d33705": {
            "name": "Посуточно",
            "type": "daily-rent",
            "uuid": "bd391ca9-29dd-4cb6-b6a3-bf7113d33705",
            "parentUuid": "35ab1806-f992-443c-a668-35b2230f22e2",
        },
        "f851ec58-3905-47ab-9fb3-974e6af48c09": {
            "name": "Недвижимость за рубежом",
            "type": "real-estate-abroad",
            "uuid": "f851ec58-3905-47ab-9fb3-974e6af48c09",
            "parentUuid": "18b8263b-0631-4153-b1c7-57428af036cc",
        },
        "8ce91801-b563-4f07-bc0d-ca5b6107745c": {
            "name": "Продам",
            "type": "sell-off",
            "uuid": "8ce91801-b563-4f07-bc0d-ca5b6107745c",
            "parentUuid": "f851ec58-3905-47ab-9fb3-974e6af48c09",
        },
        "bf8689de-ecc5-4c38-ad49-cbcd762689c8": {
            "name": "Сдам",
            "type": "rent",
            "uuid": "bf8689de-ecc5-4c38-ad49-cbcd762689c8",
            "parentUuid": "f851ec58-3905-47ab-9fb3-974e6af48c09",
        },
        "fef35cbb-99c4-4283-ad09-4890f8024520": {
            "name": "На длительный срок",
            "type": "for-a-long-time",
            "uuid": "fef35cbb-99c4-4283-ad09-4890f8024520",
            "parentUuid": "bf8689de-ecc5-4c38-ad49-cbcd762689c8",
        },
        "d43e93c6-3829-4d4e-9c6d-5167140af61c": {
            "name": "Посуточно",
            "type": "daily-rent",
            "uuid": "d43e93c6-3829-4d4e-9c6d-5167140af61c",
            "parentUuid": "bf8689de-ecc5-4c38-ad49-cbcd762689c8",
        },
        "408fd6bf-13b5-420d-a47a-983c5e14abcf": {
            "name": "Багги",
            "type": "buggy",
            "uuid": "408fd6bf-13b5-420d-a47a-983c5e14abcf",
            "parentUuid": "60b490b2-3f18-4b5c-943f-f3cb16b5bb83",
        },
        "dfa16f58-b9ee-4f08-9e99-8c6e00fe886d": {
            "name": "Вездеходы",
            "type": "terrain-vehicles",
            "uuid": "dfa16f58-b9ee-4f08-9e99-8c6e00fe886d",
            "parentUuid": "60b490b2-3f18-4b5c-943f-f3cb16b5bb83",
        },
        "950ef4f4-a845-4924-aab7-c85535410e2c": {
            "name": "Картинг",
            "type": "karting",
            "uuid": "950ef4f4-a845-4924-aab7-c85535410e2c",
            "parentUuid": "60b490b2-3f18-4b5c-943f-f3cb16b5bb83",
        },
        "53019290-7ce3-40cf-8017-ed0b3067b491": {
            "name": "Квадроциклы",
            "type": "atvs",
            "uuid": "53019290-7ce3-40cf-8017-ed0b3067b491",
            "parentUuid": "60b490b2-3f18-4b5c-943f-f3cb16b5bb83",
        },
        "2cd9d6af-cfbc-497e-ad06-25e251e90b1e": {
            "name": "Мопеды и скутеры",
            "type": "mopeds-scooters",
            "uuid": "2cd9d6af-cfbc-497e-ad06-25e251e90b1e",
            "parentUuid": "60b490b2-3f18-4b5c-943f-f3cb16b5bb83",
        },
        "1d835a3c-942b-4058-ac25-e7b8d564422b": {
            "name": "Мотоциклы",
            "type": "motorcycles",
            "uuid": "1d835a3c-942b-4058-ac25-e7b8d564422b",
            "parentUuid": "60b490b2-3f18-4b5c-943f-f3cb16b5bb83",
        },
        "6a076e0a-c80b-4f85-b800-5676bf9d391d": {
            "name": "Снегоходы",
            "type": "snowmobiles",
            "uuid": "6a076e0a-c80b-4f85-b800-5676bf9d391d",
            "parentUuid": "60b490b2-3f18-4b5c-943f-f3cb16b5bb83",
        },
        "9e40526b-18cd-4ab5-9f64-a0749cb755c5": {
            "name": "Автобусы",
            "type": "the-buses",
            "uuid": "9e40526b-18cd-4ab5-9f64-a0749cb755c5",
            "parentUuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
        },
        "4619932c-24b2-4c59-9cfc-442089e01be0": {
            "name": "Автодома",
            "type": "motorhome",
            "uuid": "4619932c-24b2-4c59-9cfc-442089e01be0",
            "parentUuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
        },
        "f0f67973-aff6-4b37-8d5b-6fb391943af0": {
            "name": "Автокраны",
            "type": "truck-cranes",
            "uuid": "f0f67973-aff6-4b37-8d5b-6fb391943af0",
            "parentUuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
        },
        "916e6c5d-7874-49e7-867a-beea3d7906dc": {
            "name": "Бульдозеры",
            "type": "bulldozers",
            "uuid": "916e6c5d-7874-49e7-867a-beea3d7906dc",
            "parentUuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
        },
        "5303bfe3-3ecf-44ca-9246-28409a64b113": {
            "name": "Грузовики",
            "type": "trucks",
            "uuid": "5303bfe3-3ecf-44ca-9246-28409a64b113",
            "parentUuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
        },
        "942ec923-2d96-4a07-89c7-25e85e64b6d3": {
            "name": "Коммунальная техника",
            "type": "utility-equipment",
            "uuid": "942ec923-2d96-4a07-89c7-25e85e64b6d3",
            "parentUuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
        },
        "32bfe9e0-0052-4ff6-9cf4-8728cbfd318e": {
            "name": "Лёгкий коммерческий транспорт",
            "type": "light-commercial-transport",
            "uuid": "32bfe9e0-0052-4ff6-9cf4-8728cbfd318e",
            "parentUuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
        },
        "d810bd48-a72a-48f4-a77e-cdbbfd4f9dae": {
            "name": "Навесное оборудование",
            "type": "attachments",
            "uuid": "d810bd48-a72a-48f4-a77e-cdbbfd4f9dae",
            "parentUuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
        },
        "e654b0b5-7f4b-4aab-a5f1-99200cdaf2a8": {
            "name": "Погрузчики",
            "type": "loaders",
            "uuid": "e654b0b5-7f4b-4aab-a5f1-99200cdaf2a8",
            "parentUuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
        },
        "a70ff755-26b4-458a-ba14-873a86198bd1": {
            "name": "Прицепы",
            "type": "trailers",
            "uuid": "a70ff755-26b4-458a-ba14-873a86198bd1",
            "parentUuid": "c6326bf8-5ca5-4cbc-adce-34467c4bc815",
        }
    },
}

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        getCategoryTreeACTION: (state, action) => {

        },
    }
})

export const categorySliceActions = categorySlice.actions
export const categorySliceReducer = categorySlice.reducer