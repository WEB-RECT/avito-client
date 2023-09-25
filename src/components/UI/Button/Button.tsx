import React, {CSSProperties} from 'react';
import './Button.scss'

interface IButton {
    children?: React.ReactNode;
    buttonType?: 'gray';
    onClick?: () => void;
    disabled?: boolean;
    size?: 'small';
    style?: CSSProperties
}

const Button = ({ children, onClick, disabled, size, buttonType, style }: IButton) => {

    return (
        <button
            className={`button ${size ? `button--${size}` : ''} ${buttonType === 'gray' ? 'button--gray' : ''}`}
            onClick={onClick}
            disabled={disabled}
            style={{
                opacity: disabled ? '0.5' : '1',
                pointerEvents: disabled ? 'none' : 'visible',
                ...style,
            }}
        >
            {
                children
            }
        </button>
    );
};

export default React.memo(Button);
