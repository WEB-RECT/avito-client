import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import './Images.scss'
import Icons from "../../Icons/Icons";
import {useUploadImageAPIMutation} from "../../../../services/ImagesServices";
import {getBase64} from "../../../../functions/files/getBase64";
import {newObject} from "../../../../functions/object/newObject";

const MAX_COUNT_LENGTH_FILE:number = 20
const MAX_SIZE_FILE:number = 5

interface IImages {
    getValueChanged?: (value: string[]) => void;
    defaultValue: string[];
    changePublishedButton?: (value: boolean) => void;
}

const Images: FC<IImages> = ({ getValueChanged, changePublishedButton , defaultValue}) => {

    const [uploadImageAPI, { isLoading, isSuccess, isError }] = useUploadImageAPIMutation()

    const [state, setState] = useState<string[]>(defaultValue || [])
    const [imagesLoading, setImagesLoading] = useState<string[]>([])

    useEffect(() => {
        if (isSuccess || isError) {
            setImagesLoading([])
        }
    }, [isSuccess, isError])

    useEffect(() => {
        if (changePublishedButton) {
            changePublishedButton(isLoading)
        }
    }, [isLoading, changePublishedButton])

    const changeImageList = async (e: ChangeEvent<HTMLInputElement>) => {

        const files = e.currentTarget.files

        if (files && files.length) {

            const checkMaxFile = (state.length + files.length) <= MAX_COUNT_LENGTH_FILE

            if (checkMaxFile) {

                const checkingFilesToSize: string[] = []
                const resultUploads: string[] = []

                await Promise.all(Array.from(files).map(async (item: File) => {
                    if (item) {
                        const size = item.size / 1024 / 1024 // mb

                        if (+size.toFixed(2) < MAX_SIZE_FILE) {
                            const content = await getBase64(item)
                            checkingFilesToSize.push(content)
                        }

                    }
                }))

                setImagesLoading(checkingFilesToSize)

                await Promise.all(checkingFilesToSize.map(async (item) => {

                    const result = await uploadImageAPI(item).unwrap()

                    if (result.status && result.data) {
                        resultUploads.push(result.data)
                    }

                }))

                setState(prev => {

                    const currentPrev = prev.concat(resultUploads)

                    return [
                        ...currentPrev,
                    ]
                })

            }

        }
    }

    const deleteFile = (index: number) => {
        setState(prev => {

            const currentPrev: string[] = newObject(prev)
            delete currentPrev[index]

            const newPrev: string[] = []

            currentPrev.forEach((item) => {
                if (item) {
                    newPrev.push(item)
                }
            })

            return [
                ...newPrev,
            ]
        })
    }

    useEffect(() => {
        if (state && getValueChanged) {
            getValueChanged(state)
        }
    }, [state])

    return (
        <>
            <div className="images-list">
                {
                    state &&
                    state.map((url, indexUrl) => (
                        <div
                            key={`url_${indexUrl}_${url}`}
                            className="item"
                        >
                            <div className="item-close"
                                 onClick={() => deleteFile(indexUrl)}
                            >
                                <Icons
                                   iconType="close"
                                />
                            </div>
                            <img
                                src={url}
                                alt=""
                            />
                        </div>
                    ))
                }
                {
                    imagesLoading &&
                    imagesLoading.map((file, indexFile) => (
                        <div
                            key={`file_${indexFile}_${file}`}
                            className="item"
                        >
                            <div className="item-load">
                                Загрузка...
                            </div>
                            <img
                                src={file}
                                alt=""
                            />
                        </div>
                    ))
                }
                <div className="item-add">
                    <label>
                        <input
                            type="file"
                            accept="image/gif,image/png,image/jpeg,image/pjpeg"
                            onChange={(e) => changeImageList(e)}
                            multiple
                        />
                    </label>
                    <div className="item-add-preview">

                        <Icons iconType="imagesAdd" />

                    </div>
                </div>
            </div>
            <div className="images-list-info">
                <div>
                    Максимальное количество файлов: <b>{state.length}</b> / <b>{MAX_COUNT_LENGTH_FILE}</b>
                </div>
                <div>
                    Максимальный размер файла: <b>{MAX_SIZE_FILE} MB</b>
                </div>
            </div>
        </>
    );
};

export default React.memo(Images);
