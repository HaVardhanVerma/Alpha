import React from 'react';

import Halmet from 'react-helmet';
import PropTypes from 'prop-types';

function PageTitle({title}) {
  return (
    <Halmet>
      <title>{title}</title>
    </Halmet>
  )
};

PageTitle.propTypes = {
  title: PropTypes.string,
}

export default PageTitle
