import React from 'react';
import PropTypes from 'prop-types';

const HandlerAction = props => {
    return (
        <div>
            {props.children}
        </div>
    );
};

HandlerAction.propTypes = {
    path: PropTypes.string.isRequired
};

export default HandlerAction;
