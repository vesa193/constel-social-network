interface IErrors {
    [key: string]: string;
}

const validateInfo = (values: any) => {
    const errors: IErrors = {};

    console.log('values', values);

    if (!values.email.includes('@')) {
        errors.email = 'Email is incorrect, `@` character is missing';
    }

    if (values?.password?.length < 6) {
        errors.password =
            'Password is incorrect, should contain `6` or more characters';
    }

    return errors;
};

export { validateInfo };
