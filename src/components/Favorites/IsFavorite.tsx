import React, {FC, useContext, useEffect, useState} from 'react';
import Icons from "../UI/Icons/Icons";
import {useActions, useAppSelector} from "../../customHook/redux";
import {useAddFavoritesAPIMutation, useRemoveFavoriteAPIMutation} from "../../services/CardServices";
import {favoriteListGET} from "../../store/selectors";
import {AuthContext} from "../Auth/Auth";

interface IProps {
    cardUuid: string | null | undefined;
}

interface ICurrentFavorite {
    status: boolean,
    idFavorite: number | null
}

const IsFavorite: FC<IProps> = ({ cardUuid }) => {

    const {sessionAuth} = useContext(AuthContext)

    const [addFavoritesAPI] = useAddFavoritesAPIMutation()
    const [removeFavoriteAPI] = useRemoveFavoriteAPIMutation()

    const { addFavoriteACTION, removeFavoriteACTION } = useActions()

    const favoriteList = useAppSelector(favoriteListGET)

    const [currentFavorite, setCurrentFavorite] = useState<ICurrentFavorite>({
        status: false,
        idFavorite: null
    })

    // проверка favorite
    useEffect(() => {
        if (cardUuid) {
            if (favoriteList[cardUuid]) {
                setCurrentFavorite({
                    status: true,
                    idFavorite: favoriteList[cardUuid].id
                })
            } else {
                setCurrentFavorite({
                    status: false,
                    idFavorite: null
                })
            }
        }
    }, [cardUuid, favoriteList])

    const changeFavoriteCard = async (cardUuid: string | null | undefined) => {

        if (!cardUuid) {
            return
        }

        if (currentFavorite.status && typeof currentFavorite.idFavorite === 'number') {

            const resultFavorite = await removeFavoriteAPI(currentFavorite.idFavorite).unwrap()

            if (resultFavorite.status) {
                removeFavoriteACTION(cardUuid)
            }

        } else {

            const resultFavorite = await addFavoritesAPI({cardUuid}).unwrap()

            if (resultFavorite.status && resultFavorite.data) {
                addFavoriteACTION(resultFavorite.data[0])
            }

        }
    }

    return (
        <div
            className="is-favorite"
            onClick={() => changeFavoriteCard(cardUuid)}
            style={{
                opacity: sessionAuth ? 1 : 0.5,
                pointerEvents: sessionAuth ? 'visible' : 'none',
            }}
        >
            <Icons
                iconType={currentFavorite.status ? 'isFavorite' : 'favorite'}
            />
        </div>
    );
};

export default React.memo(IsFavorite);
