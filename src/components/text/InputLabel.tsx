import styles from './InputLabel.module.css';

type InputLabelProps = {
    htmlFor: string;
    label: string;
};

const InputLabel = ({ htmlFor, label }: InputLabelProps) => {
    return (
        <label className={styles.label} {...(htmlFor && { htmlFor: htmlFor })}>
            {label}
        </label>
    );
};

InputLabel.displayName = 'InputLabel';
export default InputLabel;
