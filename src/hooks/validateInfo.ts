import { configApp } from '@/config';

interface IErrors {
    [key: string]: string;
}

const validateInfo = (values: any) => {
    const errors: IErrors = {};

    if (!values.email.includes('@')) {
        errors.email = "The email needs to contain the '@' symbol.";
    }

    if (values?.password?.length < configApp.MIN_CHARACTERS) {
        errors.password =
            'The password needs to be at least 6 characters long.';
    }

    return errors;
};

export { validateInfo };
