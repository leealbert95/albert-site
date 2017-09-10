import React, { Component } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class Uploads extends Component {

	constructor(props) {
		super(props);

		this.state = {
			imagefile: '',
			address: '',
			caption: '',
			date: '',
			tags: '',
			coordinates: null,
		}
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.handleFile = this.handleFile.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleLocationSelect = this.handleLocationSelect.bind(this);
		this.handleCaptionChange = this.handleCaptionChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleTagChange = this.handleTagChange.bind(this);
		this.deleteAll = this.deleteAll.bind(this);
	}

	handleFile(file) {
		console.log("handleFile")
		this.setState({
			imagefile: file,
		}) 
	}

	handleLocationChange(address) {
		this.setState({
			address: address
		});
		console.log(address);
	}

	handleLocationSelect(address) {
		this.setState({
			address
		});
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then(({ lat, lng }) => {
				var coordinates = { lat: lat, lng: lng }
				this.setState({
					coordinates: coordinates 
				});
			});
	}	

	handleCaptionChange(caption) {
		this.setState({
			caption: caption,
		});
		console.log(caption);
	}

	handleDateChange(date) {
		this.setState({
			date: date,
		});
		console.log(date);
	}

	handleTagChange(tags) {
		this.setState({
			tags: tags,
		});
		console.log(tags);
	}


	onFormSubmit(e) {
		e.preventDefault();
		if (this.state.imagefile === '') {
			alert("You forgot to upload the image!");
			return;
		}
		console.log('FormSubmit');

		const data = new FormData();
		data.append('file', this.state.imagefile);
		data.append('lat', this.state.coordinates.lat);
		data.append('lng', this.state.coordinates.lng);
		data.append('caption', this.state.caption);
		data.append('date', this.state.date)
		data.append('location', this.state.address);
		data.append('tags', this.state.tags);

		fetch('api/photos/uploads', {
			method: 'POST',
			body: data
		})

		this.setState({
			imagefile: '',
			address: '',
			caption: '',
			date: '',
			tags: '',
			coordinates: null, 
		})
	}

	deleteAll(e) {
		e.preventDefault();
		console.log('Delete');
		if (window.confirm('Are you sure you want to delete all photos?')) {
			console.log('delete');
			fetch('api/photos/delete', {
				method: 'DELETE'
			});
		}
	}

	render() {
		const inputProps = {
			type: "text",
			value: this.state.address,
			onChange: this.handleLocationChange,
			placeholder: "Search Places",
			autoFocus: true,
			name: "Demo_input",
			id: "input-location-id"
		}

		const cssClasses = {
      root: 'form-group',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container',
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small>{formattedSuggestion.secondaryText}</small>
      </div>); 

		return (
			<div>
				<form onSubmit={(e) => this.onFormSubmit(e)} encType="multipart/form-data">  
				  <label htmlFor="file">Select your image:</label>
				  <input type="file" id="FileUpload" onChange={(e) => this.handleFile(e.target.files[0])}/>
				  <span className="hint">Supported files: jpg, jpeg, png.</span>
				  <div style={{ height: 10 }}/>
				  <label>Select location</label>
				  <PlacesAutoComplete 
				  	inputProps={inputProps}
				  	classNames={cssClasses}
				  	autocompleteItem={AutocompleteItem}
				  	onSelect={this.handleLocationSelect}
				  />
				  <div style={{ height: 10 }}/>
				  <input type="text" placeholder="Enter caption here" value={this.state.caption} onChange={(e) => this.handleCaptionChange(e.target.value)}/>
				  <div style={{ height: 10 }}/>
				  <input type="text" placeholder="Enter date (MM/DD/YYYY)" value={this.state.date} onChange={(e) => this.handleDateChange(e.target.value)}/>
				  <div style={{ height: 10 }}/>
				  <input type="text" placeholder="Enter tags separated by a space" value={this.state.tags} onChange={(e) => this.handleTagChange(e.target.value)}/>
				  <div style={{ height: 10 }}/>
				  <button type="submit">upload</button>
				</form>
				<div style={{ height: 50 }}/>
				<button type="button" onClick={(e) => this.deleteAll(e)}>Delete all photos</button>
			</div>
		);
	}
}

export default Uploads