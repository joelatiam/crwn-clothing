import './form-input.styles.scss';

const FormInput = ({label, inputOptions}) => {
    
    const {value=''} = inputOptions;
    return (
        <div className='group'>
            <input
                className='form-input'
                {...inputOptions}
            />
            {label && (
                <label className={`${value.length ? 'shrink' : ''}form-input-label`}>
                {label}
            </label>
            )}
        </div>
    )
};

export default FormInput;
