import React, {FC, useEffect, useState} from 'react';
import './Crumbs.scss'
import Text from "../Typography/Text";
import ContainerElement from "../ContainerElement/ContainerElement";
import {useAppSelector} from "../../../customHook/redux";
import {TUuid} from "../../../Types/Types";
import {newObject} from "../../../functions/object/newObject";
import {categoryTreeListGET} from "../../../store/selectors";
import lodash from "lodash";

interface IProps {
    propsCategoryPath: TUuid[];
    getCategoryPath?: (value: TUuid[]) => void;
}

const Crumbs: FC<IProps> = ({ propsCategoryPath, getCategoryPath }) => {

    const categoryTreeList = useAppSelector(categoryTreeListGET)

    const [state, setState] = useState<TUuid[]>(propsCategoryPath || [])

    useEffect(() => {
        if (!lodash.isEqual(propsCategoryPath, state)) {
            setState(propsCategoryPath)
        }
    }, [propsCategoryPath])

    useEffect(() => {
        if (getCategoryPath && !lodash.isEqual(propsCategoryPath, state)) {
            getCategoryPath(state)
        }
    }, [state])

    return (
        <div className="crumbs">
            {
                state &&
                state.map((item, indexItem) => (
                    <Text
                        key={item + indexItem}
                        color={state.length - 1 === indexItem ? 'gray' : null}
                    >
                        {
                            indexItem !== 0 &&
                            <span>
                                -
                            </span>
                        }
                        {
                            categoryTreeList[item]?.name || item
                        }
                    </Text>
                ))
            }
        </div>
    );
};

export default React.memo(Crumbs);
