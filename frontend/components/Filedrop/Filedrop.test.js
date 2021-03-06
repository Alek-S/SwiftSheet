import React from 'react';
import Filedrop from './Filedrop';
import theme from '../../theme';
import Dropzone from 'react-dropzone';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render, getByLabelText } from '@testing-library/react';

describe('Filedrop', () => {
	test('matches the snapshot', () => {
		const tree = shallow(<Filedrop theme={theme} />);
		expect(toJson(tree)).toMatchSnapshot();
	});

	test('should handle select change', () => {
		const setExpireIn = jest.fn();
		const { getByLabelText } = render(
			<ThemeProvider theme={theme}>
				<Filedrop setExpireIn={setExpireIn} />
			</ThemeProvider>
		);
		const select = getByLabelText('expire-in-select');

		fireEvent.change(select, { target: { value: 1 } });

		expect(select.value).toBe('1');
		expect(setExpireIn).toHaveBeenCalledWith(1);
	});

	test('should handle header toggle', () => {
		const setHeader = jest.fn();
		const setErrorMessage = jest.fn();

		const { getByLabelText } = render(
			<ThemeProvider theme={theme}>
				<Filedrop setHeader={setHeader} setErrorMessage={setErrorMessage} />
			</ThemeProvider>
		);
		const toggleHeaderButton = getByLabelText('toggle-header-button');

		fireEvent.click(toggleHeaderButton);

		expect(setHeader).toHaveBeenCalledWith(true);
		expect(setErrorMessage).toHaveBeenCalledWith(undefined);
	});

	test('invoke onDragEnter when dragenter event occurs', async () => {
		const file = new File([JSON.stringify({ ping: true })], 'ping.json', {
			type: 'application/json',
		});
		const data = mockData([file]);
		const onDragEnter = jest.fn();

		const ui = (
			<Dropzone onDragEnter={onDragEnter}>
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps()}>
						<input {...getInputProps()} />
					</div>
				)}
			</Dropzone>
		);
		const { container } = render(ui);
		const dropzone = container.querySelector('div');

		dispatchEvt(dropzone, 'dragenter', data);
		await flushPromises(ui, container);

		expect(onDragEnter).toHaveBeenCalled();
	});

	function flushPromises(ui, container) {
		return new Promise(resolve =>
			setImmediate(() => {
				render(ui, { container });
				resolve(container);
			})
		);
	}

	function dispatchEvt(node, type, data) {
		const event = new Event(type, { bubbles: true });
		Object.assign(event, data);
		fireEvent(node, event);
	}

	function mockData(files) {
		return {
			dataTransfer: {
				files,
				items: files.map(file => ({
					kind: 'file',
					type: file.type,
					getAsFile: () => file,
				})),
				types: ['Files'],
			},
		};
	}
});
