import React, {CSSProperties, FC, ReactNode, useState} from 'react';
import ModalReact from 'react-modal';
import "./Modal.scss";
import Icons from "../Icons/Icons";
import Text from "../Typography/Text";

interface IProps {
    isOpen: boolean
    onClickOverlay?: () => void
    children: ReactNode
    label?: string | ReactNode
    modalStyles?: ICustomStyles
}

interface ICustomStyles {
    overlay?: CSSProperties
    content?: CSSProperties
}

const customStyles: ICustomStyles = {
    overlay: {
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000000,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        cursor: 'default',
        padding: '0px',
        borderRadius: '10px',
        background: '#fff',
        border: 'none',
        top: 'unset',
        left: 'unset',
        right: 'unset',
        bottom: 'unset',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '80%',
    },
};

const Modal: FC<IProps> = ({
                               isOpen,
                               onClickOverlay,
                               children,
                               label ,
                               modalStyles,
}) => {

    if (modalStyles) {
        customStyles.overlay = {
            ...customStyles.overlay,
            ...modalStyles.overlay
        }
        customStyles.content = {
            ...customStyles.content,
            ...modalStyles.content
        }
    }

    return (
        <ModalReact
            isOpen={isOpen}
            onRequestClose={onClickOverlay}
            style={customStyles}
            ariaHideApp={false}
        >
            {
                label &&
                <div
                    className="modal-top"
                >
                    <Text
                        size={20}
                        style={{
                            maxWidth: '500px'
                        }}
                    >
                        {
                            label
                        }
                    </Text>
                    <div
                        onClick={onClickOverlay}
                        style={{
                            marginLeft: 20,
                            cursor: "pointer"
                        }}
                    >
                        <Icons
                            iconType="close"
                        />
                    </div>
                </div>
            }
            <div
                className="modal-content"
            >
                {
                    children
                }
            </div>
        </ModalReact>
    );
};

export default React.memo(Modal);
