import React from 'react'

import PropTypes from 'prop-types'

function Menu({classes = '', children}) {
  return (
    <div className={`menu ${classes}`}>
      {children}
    </div>
  )
};

Menu.prototype = {
    classes: PropTypes.string,
    children: PropTypes.any,
}

export default Menu
