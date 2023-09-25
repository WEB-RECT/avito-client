import React, {createContext, FC, useEffect, useState} from 'react';
import {IDropdownContext, IDropdownState} from "../../../Types/Types";

interface Props {
    children: React.ReactNode;
    position?: 'bottom-left' | 'bottom-right';
    onChange?: (state: IDropdownState) => void
}

export const DropdownContext = createContext({} as IDropdownContext)

const Dropdown: FC<Props> = ({ children, position, onChange}) => {

    const [state, setState] = useState<IDropdownState>({
        show: false,
        rect: {} as DOMRect,
    })

    useEffect(() => {

        if (state.show) {

            const hiddenDropdownDocument = (e: Event) => {

                const target = e.target as HTMLElement
                const targetClosest = target.closest(`[data-dropdown="true"]`)
                const targetClosestToClick = target.closest(`[data-close-dropdown-to-click="true"]`)

                if (!targetClosest || targetClosestToClick) {
                    setState(prev => {
                        return {
                            ...prev,
                            show: false,
                        }
                    })
                }
            }

            const hiddenDropdownWindow = () => {
                setState(prev => {
                    return {
                        ...prev,
                        show: false,
                    }
                })
            }

            document.addEventListener('click', hiddenDropdownDocument)
            window.addEventListener('resize', hiddenDropdownWindow)
            window.addEventListener('scroll', hiddenDropdownWindow)

            return () => {
                document.removeEventListener('click', hiddenDropdownDocument)
                window.removeEventListener('resize', hiddenDropdownWindow)
                window.removeEventListener('scroll', hiddenDropdownWindow)
            }

        }

    }, [state])

    useEffect(() => {
        if (onChange) {
            onChange(state)
        }
    }, [state])

    const hiddenDropdown = () => {
        setState(prev => {
            return {
                ...prev,
                show: false,
            }
        })
    }

    const changeStateDropdown = (rect: DOMRect) => {
        setState(prev => {
            return {
                ...prev,
                show: !prev.show,
                rect,
            }
        })
    }

    return (
        <DropdownContext.Provider
            value={{ state, hiddenDropdown, changeStateDropdown, position }}
        >
            {
                children
            }
        </DropdownContext.Provider>
    );
};

export default React.memo(Dropdown);
