import PropTypes from 'prop-types'
import { avatars } from '../lib/appwriter'

import React from 'react'

function Avatar({name}) {
  return (
    <figure>
        <img src={avatars.getInitials(name, 48, 48)} alt={name} width={48} height={48} />
    </figure>
  )
}

Avatar.prototype = {
    name: PropTypes.string,
}

export default Avatar
