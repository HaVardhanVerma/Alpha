import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function Button({
    classes = '',
    variant = 'filled',
    color = 'primary',
    children,
    ...rest
}) {
  return (
    <button className={`btn ${variant} ${color} ${classes}`} {...rest}>
      {children}

      <div className='state-layer'></div>
    </button>
  )
}

Button.propTypes = {
  classes: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.any,
}

/**
 * Icon-Btn
 */
export function IconBtn({classes = '', icon, size = '', children, ...rest}) {
  return (
    <motion.button className={`Icon-btn ${size} ${classes}`} {...rest}>

      {children}
      
      {!children && <span className='material-symbols-rounded icon'>{icon}</span>}

      <div className='state-layer'></div>
    </motion.button>
  );
};

IconBtn.propTypes = {
  classes: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any,
}

export function ExtendedFab({herf, text, classes = '', ...rest}) {
  return (
    <Link to={herf} className={`extended-fab ${classes}`} {...rest}>
      <span className="material-symbols-rounded">add</span>

      <span className='truncate'>{text}</span>

      <div className='state-layer'></div>
    </Link>
  )
};

ExtendedFab.propTypes = {
  classes: PropTypes.string,
  text: PropTypes.string,
  herf: PropTypes.string,
}

export default Button;