import React, {CSSProperties, FC} from 'react';
import './Text.scss'

interface IText {
    tag?: string | any;
    size?: number | null;
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | null;
    color?: 'gray' | null;
    ellipsis?: 'row' | 'column-2';
    onClick?: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
    style?: CSSProperties
}

const Text: FC<IText> = ({
                             tag,
                             size,
                             ellipsis,
                             onClick,
                             children,
                             color,
                             disabled,
                             weight,
                             style,
}) => {

    const CurrentTag = tag || 'div'

    return (
        <CurrentTag
            className={`text ${color ? `text--${color}` : ''} ${ellipsis ? `ellipsis--${ellipsis}` : ''} `}
            onClick={onClick}
            disabled={disabled}
            style={{
                ...style,
                fontWeight: weight,
                fontSize: size,
            }}
        >
            {
                children
            }
        </CurrentTag>
    );
};

export default Text;
