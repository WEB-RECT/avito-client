
interface IValidate {
    status: boolean;
    text: string;
}

interface IValidateFormItem {
    (value: string, type: string): IValidate;
}

export const validateFormItem: IValidateFormItem = (value, type) => {

    const currentValue: IValidate = {
        status: false,
        text: '',
    }

    if (type === 'name') {
        if (value && value.length <= 256) {
            currentValue.status = true
            currentValue.text = ''
        } else {
            currentValue.status = false
            currentValue.text = 'Ошибка валидации Name'
        }
    }

    if (type === 'email') {

        const validateReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const reg = new RegExp(validateReg)

        if (reg.test(value)) {
            currentValue.status = true
            currentValue.text = ''
        } else {
            currentValue.status = false
            currentValue.text = 'Ошибка валидации Email'
        }

    }

    if (type === 'password') {

        const validateReg = /^(?=.*[0-9])(?=.*[!@#$%^&*_-])[a-zA-Z0-9!@#$%^&*_-]{6,16}$/
        const reg = new RegExp(validateReg)

        if (reg.test(value)) {
            currentValue.status = true
            currentValue.text = ''
        } else {
            currentValue.status = false
            currentValue.text = `Ошибка валидации <b>Password</b>. <br /> Подтвердить, что есть символы: <b>(!@#$%^&*_-)</b> <br /> Подтвердить, что есть цифры <b>(0-9)</b> <br /> Подтвердить, что строка по длине <b>(6-16)</b>`
        }

    }

    return currentValue
}