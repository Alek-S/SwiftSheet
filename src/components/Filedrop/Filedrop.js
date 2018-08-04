import React, {Component} from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'


/** @class 
 * @name Filedrop
 * Area for drag & drop file uploads of csv
 * 
 * @returns {JSX}
*/
export default class Filedrop extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			file: null,
			rejectedFile: [], 
		};
	  }

	onDrop = (file, rejectedFile) => {
		// do stuff with files...
		this.setState({ file, rejectedFile });
	}

	render(){
		return(
			<section>
				<Dropzone onDrop={this.onDrop} accept="text/csv">
					<p>Drag & Drop your file here</p>
				</Dropzone>
			</section>
		)
	}
}
