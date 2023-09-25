import React, {FC} from 'react';
import ContentLoader from "react-content-loader";

interface IProps {
    type: 'card';
}

interface IDataLoaders {
    [key: string]: {
        html: React.ReactNode | any;
    }
}

const dataLoaders: IDataLoaders = {
    ['card']: {
        html: <ContentLoader
            speed={3}
            width={250}
            height={289}
            viewBox="0 0 250 289"
            backgroundColor="#f3f3f3"
            foregroundColor="#d9d9d9"
        >
            <rect x="0" y="0" rx="0" ry="0" width="250" height="180" />
            <rect x="0" y="193" rx="0" ry="0" width="210" height="22" />
            <rect x="0" y="230" rx="0" ry="0" width="163" height="20" />
        </ContentLoader>
    }
}

const PlaceholderLoader: FC<IProps> = ({ type }) => {
    return dataLoaders[type].html
};

export default React.memo(PlaceholderLoader);
