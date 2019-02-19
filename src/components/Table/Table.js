import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Table = ({ data }) => <div>Table Goes Here</div>;

Table.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
