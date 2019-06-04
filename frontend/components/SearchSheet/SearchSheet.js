import React, { useState } from 'react';
import { FormCard, SubmitButton, StyledForm } from '../../defaultStyle';
import { Link } from 'react-router-dom';

const SearchSheet = () => {
	const [value, setValue] = useState('');
	const handleChange = e => {
		setValue(e.target.value);
	};

	return (
		<FormCard>
			<StyledForm>
				<input
					type="text"
					placeholder="search by sheet ID"
					value={value}
					onChange={handleChange}
				/>
				<Link to={`/${value}`}>
					<SubmitButton>Submit</SubmitButton>
				</Link>
			</StyledForm>
		</FormCard>
	);
};

export default SearchSheet;
