import React, {FC, useEffect, useState} from 'react';
import './ImagesSlider.scss'
import Icons from "../Icons/Icons";

interface IProps {
    imagesList: string[]
}

const ImagesSlider: FC<IProps> = ({ imagesList }) => {

    const [state, setState] = useState<string[]>(imagesList || [])
    const [activeState, setActiveState] = useState<number>(0)

    useEffect(() => {
        if (imagesList) {
            setState(imagesList)
        }
    }, [imagesList])

    const sliderMinus = () => {
        setActiveState(prev => {

            let currentPrev = prev

            if (currentPrev > 0) {
                currentPrev--
            }

            return currentPrev
        })
    }

    const sliderPlus = () => {
        setActiveState(prev => {

            let currentPrev = prev

            if (currentPrev < state.length - 1) {
                currentPrev++
            }

            return currentPrev
        })
    }

    return (
        <div className="images-slider">
            <div className="images-slider-main">
                <div className="images-slider-main-wrapper">
                    {
                        state[activeState] &&
                            <>
                                <div
                                    className="images-slider-main-bg"
                                    style={{
                                        background: `url(${state[activeState]})`
                                    }}
                                >
                                </div>
                                <div className="images-slider-main-visible">
                                    <img src={state[activeState]} alt=""/>
                                </div>
                            </>
                    }
                </div>
                {
                    state.length > 0 &&
                    <div className="images-slider-main-arrow">
                        <div
                            className="left"
                            onClick={() => sliderMinus()}
                        >
                            <Icons
                                iconType="arrowLeft"
                            />
                        </div>
                        <div
                            className="right"
                            onClick={() => sliderPlus()}
                        >
                            <Icons
                                iconType="arrowRight"
                            />
                        </div>
                    </div>
                }
            </div>
            <div className="images-slider-bullets">
                {
                    state.length > 0 &&
                    state.map((item, indexItem) => (
                        <div
                            key={item + indexItem}
                            className={`item ${activeState === indexItem ? 'active' : ''}`}
                            onMouseEnter={() => setActiveState(indexItem)}
                        >
                            <img src={item} alt=""/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default React.memo(ImagesSlider);
