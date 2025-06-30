import React from 'react'
import logoDark from '../assets/logo-dark.svg';
import logoLight from '../assets/logo-light.svg';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Logo({classes = ''}) {
  return (
    <div>
        <Link 
          to='/'
          className={`min-w-max max-w-max h-[24px] ${classes}`}
        >
          <img 
            src={logoLight}
            width={133}
            height={24}
            alt="fusion logo" 
            className='dark:hidden'
          />

          <img 
            src={logoDark} width={133}
            height={24}
            alt="fusion logo" 
            className='hidden dark:block'
          />

        </Link>
    </div>
  )
};

Logo.prototype = {
    classes: PropTypes.string,
}

export default Logo
