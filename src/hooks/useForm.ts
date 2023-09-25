import { ChangeEvent, useCallback, useState } from 'react';

const useForm = (initialState: any, fieldName?: string) => {
    const [fields, setFields] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    console.log('fields', fields);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setErrors(initialState);
            setFields({
                ...fields,
                [e.target.name]: e.target.value,
            });
        },
        [fields]
    );

    const handleReset = () => {
        setFields(initialState);
        setErrors(initialState);
    };

    const isEmptyValue = (fieldName: string) => {
        return !!fields[fieldName];
    };

    return {
        fields,
        onChange: handleChange,
        onReset: handleReset,
        errors,
        setErrors,
        isEmptyValue,
    };
};

export { useForm };
