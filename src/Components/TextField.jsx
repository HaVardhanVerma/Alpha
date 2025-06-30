import React from 'react'
import PropTypes from 'prop-types'

function TextField({
    placeholder,
    classes = '',
    label,
    name,
    fieldClasses = '',
    helperText,
    error = false,
    errorText = '',
    ...rest
}) {
  return (
    <div className={`text-field-wrapper ${classes}`}>
        <label htmlFor={name} className={`label-text${error ? ' text-red-600 dark:text-red-400' : ''}`}>
            {label}
        </label>

        <input 
          className={`text-field ${fieldClasses} ${error ? 'ring-red-500 dark:ring-red-400' : ''}`} 
          placeholder={placeholder} 
          id={name} 
          name={name} 
          aria-invalid={error}
          aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
          {...rest}
        />

        {error && errorText && <p id={`${name}-error`} className='helper-text text-red-600 dark:text-red-400'>{errorText}</p>}
        {!error && helperText && <p id={`${name}-helper`} className='helper-text'>{helperText}</p>} 
    </div>
  )
}

TextField.propTypes = {
    classes: PropTypes.string,
    helperText: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    fieldClasses: PropTypes.string,
    error: PropTypes.bool,
    errorText: PropTypes.string,
}

export default TextField
