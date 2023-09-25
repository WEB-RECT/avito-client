export interface ICard {
    images_url: string[];
    name: string;
    price: string;
    address: string;
    dateUnix: number;
    uuid: string;
    published?: boolean;
    favoritesCount?: string;
    cardVisible?: string;
    id: string;
    category_path: string;
    city: {
        ru: string;
        en: string;
    };
}

export interface ICardDefault {
    category_path: string;
    images_url: {
        data: string[];
    };
    user_uuid: string;
    date_unix: number;
    uuid: string;
    params: any;
    id: number;
    published: boolean;
    city: {
        ru: string;
        en: string;
    };
}