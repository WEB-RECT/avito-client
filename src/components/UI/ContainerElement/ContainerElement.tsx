import React, {FC} from 'react';

interface IProps {
    children: React.ReactNode;
    size?: 'max';
}

const ContainerElement: FC<IProps> = ({ children, size }) => {
    return (
        <div className={`container ${size ? `container-${size}` : ''}`}>
            {
                children
            }
        </div>
    );
};

export default React.memo(ContainerElement);
