import React, {FC, FormEvent} from 'react';
import './Form.scss'

interface IForm {
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

const Form: FC<IForm> = ({ onSubmit, children }) => {
    return (
        <>
            <form
                className="form"
                onSubmit={(e) => onSubmit && onSubmit(e)}
            >
                {
                    children
                }
            </form>
        </>
    );
};

export default Form;
