import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import ScrollLock from 'react-scrolllock';

import defaultTheme from './theme';
import Arrow from './components/Arrow';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import PaginatedThumbnails from './components/PaginatedThumbnails';
import Portal from './components/Portal';

import { bindFunctions, canUseDom, deepMerge } from './utils';

class Lightbox extends Component {
	constructor (props) {
		super(props);
		this.theme = deepMerge(defaultTheme, props.theme);
		bindFunctions.call(this, [
			'gotoNext',
			'gotoPrev',
			'closeBackdrop',
			'handleKeyboardInput',
			'onClickImage',
		]);
		this.state = {
			currentImage: 0,
		}
	}
	getChildContext () {
		return {
			theme: this.theme,
		};
	}
	componentDidMount () {
		if (this.props.isOpen && this.props.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		}
	}
	componentWillReceiveProps (nextProps) {
		if (!canUseDom) return;

		// preload images
		this.preloadImageWrapper(nextProps); 

		// add/remove event listeners
		if (!this.props.isOpen && nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		}
		if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}

		if (this.props.currentImage != nextProps.currentImage) {
			this.setState({
				currentImage: nextProps.currentImage
			})
		}
	}
	componentWillUnmount () {
		console.log('Lightbox unmount');
		if (this.props.enableKeyboardInput) {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}
	}

	// ==============================
	// METHODS
	// ==============================

	preloadImageWrapper(nextProps) {
		if (nextProps.preloadNextImage) {
			const currentIndex = this.state.currentImage;
			const nextIndex = nextProps.currentImage + 1;
			const prevIndex = nextProps.currentImage - 1;
			let preloadIndex;

			if (currentIndex && nextProps.currentImage > currentIndex) {
				preloadIndex = nextIndex;
			} else if (currentIndex && nextProps.currentImage < currentIndex) {
				preloadIndex = prevIndex;
			}

			// if we know the user's direction just get one image
			// otherwise, to be safe, we need to grab one in each direction
			if (preloadIndex) {
				this.preloadImage(preloadIndex);
			} else {
				this.preloadImage(prevIndex);
				this.preloadImage(nextIndex);
			}
		}
	}

	preloadImage (idx) {
		const image = this.props.images[idx];

		if (!image) return;

		const img = new Image();

		img.src = image.src;

		if (image.srcset) {
			img.srcset = image.srcset.join();
		}
	}
	gotoNext (event) {
		if (this.state.currentImage === (this.props.images.length - 1)) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
            currentImage: this.state.currentImage + 1
        });
	}
	gotoPrev (event) {
		if (this.state.currentImage === 0) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
            currentImage: this.state.currentImage - 1
        });
	}
	onClickImage () {
        this.gotoNext();
    }
	onClickThumbnail () {
		return (index) => {
	        this.setState({
	            currentImage: index
	        });
	    }
	}
	closeBackdrop (event) {
		if (event.target.id === 'lightboxBackdrop') {
			this.setState({
	            currentImage: 0
	        });
			this.props.onClose();
		}
	}
	handleKeyboardInput (event) {
		if (event.keyCode === 37) { // left
			this.gotoPrev(event);
			return true;
		} else if (event.keyCode === 39) { // right
			this.gotoNext(event);
			return true;
		} else if (event.keyCode === 27) { // esc
			this.props.onClose();
			return true;
		}
		return false;

	}

	// ===
	// ===========================
	// RENDERERS
	// ==============================

	renderArrowPrev () {
		if (this.state.currentImage === 0) return null;

		return (
			<Arrow
				direction="left"
				icon="arrowLeft"
				onClick={this.gotoPrev}
				title={this.props.leftArrowTitle}
				type="button"
			/>
		);
	}
	renderArrowNext () {
		if (this.state.currentImage === (this.props.images.length - 1)) return null;

		return (
			<Arrow
				direction="right"
				icon="arrowRight"
				onClick={this.gotoNext}
				title={this.props.rightArrowTitle}
				type="button"
			/>
		);
	}
	renderDialog () {
		const {
			backdropClosesModal,
			images,
			customControls,
			isOpen,
			onClose,
			onButtonClick,
			showCloseButton,
			showThumbnails,
			width,
			getCoordinates,
		} = this.props;

		if (!isOpen) return <span key="closed" />;
		getCoordinates(images[this.state.currentImage].coordinates);

		let offsetThumbnails = 0;
		if (showThumbnails) {
			offsetThumbnails = this.theme.thumbnail.size + this.theme.container.gutter.vertical;
		}

		return (
			<Container
				key="open"
				onClick={!!backdropClosesModal && this.closeBackdrop}
				onTouchEnd={!!backdropClosesModal && this.closeBackdrop}
			>
				<div className={css(classes.content)} style={{ marginBottom: offsetThumbnails, maxWidth: width }}>
					<Header
						date={images[this.state.currentImage].date}
						location={images[this.state.currentImage].location}
						separator=' | '
						onButtonClick={onButtonClick}
						customControls={customControls}
						onClose={onClose}
						showCloseButton={showCloseButton}
						closeButtonTitle={this.props.closeButtonTitle}
					/>
					{this.renderImages()}
				</div>
				{this.renderThumbnails()}
				{this.renderArrowPrev()}
				{this.renderArrowNext()}
				<ScrollLock />
			</Container>
		);
	}
	renderImages () {
		const {
			images,
			imageCountSeparator,
			showImageCount,
			showThumbnails,
		} = this.props;

		if (!images || !images.length) return null;

		const image = images[this.state.currentImage];

	

		let srcset;
		let sizes;

		if (image.srcset) {
			srcset = image.srcset.join();
			sizes = '100vw';
		}

		const thumbnailsSize = showThumbnails ? this.theme.thumbnail.size : 0;
		const heightOffset = `${this.theme.header.height + this.theme.footer.height + thumbnailsSize
			+ (this.theme.container.gutter.vertical)}px`;

		return (
			<figure className={css(classes.figure)}>
				{/*
					Re-implement when react warning "unknown props"
					https://fb.me/react-unknown-prop is resolved
					<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
				*/}
				<img
					className={css(classes.image)}
					onClick={this.onClickImage}
					sizes={sizes}
					alt={image.alt}
					src={image.src}
					srcSet={srcset}
					style={{
						cursor: this.props.onClickImage ? 'pointer' : 'auto',
						maxHeight: `calc(100vh - ${heightOffset})`,
					}}
				/>
				<Footer
					caption={images[this.state.currentImage].caption}
					countCurrent={this.state.currentImage + 1}
					countSeparator={imageCountSeparator}
					countTotal={images.length}
					showCount={showImageCount}
				/>
			</figure>
		);
	}
	renderThumbnails () {
		const { images, currentImage, showThumbnails, thumbnailOffset } = this.props;

		if (!showThumbnails) return;

		return (
			<PaginatedThumbnails
				currentImage={this.state.currentImage}
				images={images}
				offset={thumbnailOffset}
				onClickThumbnail={this.onClickThumbnail()}
			/>
		);
	}
	render () {
		return (
			<Portal>
				{this.renderDialog()}
			</Portal>
		);
	}
}

Lightbox.propTypes = {
	backdropClosesModal: PropTypes.bool,
	closeButtonTitle: PropTypes.string,
	currentImage: PropTypes.number,
	customControls: PropTypes.arrayOf(PropTypes.node),
	enableKeyboardInput: PropTypes.bool,
	imageCountSeparator: PropTypes.string,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcset: PropTypes.array,
			caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			location: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			date: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			thumbnail: PropTypes.string,
			coordinates: 
				PropTypes.shape({
		            lat: PropTypes.number.isRequired,
		            lng: PropTypes.number.isRequired
		        }),
		})
	).isRequired,
	isOpen: PropTypes.bool,
	leftArrowTitle: PropTypes.string,
	onClickImage: PropTypes.func,
	onClickNext: PropTypes.func,
	onClickPrev: PropTypes.func,
	onClose: PropTypes.func.isRequired,
	preloadNextImage: PropTypes.bool,
	rightArrowTitle: PropTypes.string,
	showCloseButton: PropTypes.bool,
	showImageCount: PropTypes.bool,
	showThumbnails: PropTypes.bool,
	theme: PropTypes.object,
	thumbnailOffset: PropTypes.number,
	width: PropTypes.number,
};
Lightbox.defaultProps = {
	closeButtonTitle: 'Close (Esc)',
	currentImage: 0,
	enableKeyboardInput: true,
	imageCountSeparator: ' of ',
	leftArrowTitle: 'Previous (Left arrow key)',
	onClickShowNextImage: true,
	preloadNextImage: true,
	rightArrowTitle: 'Next (Right arrow key)',
	showCloseButton: true,
	showImageCount: true,
	theme: {},
	thumbnailOffset: 2,
	width: 1024,
};
Lightbox.childContextTypes = {
	theme: PropTypes.object.isRequired,
};

const classes = StyleSheet.create({
	content: {
		position: 'relative',
	},
	figure: {
		margin: 0, // remove browser default
	},
	image: {
		display: 'block', // removes browser default gutter
		height: 'auto',
		margin: '0 auto', // maintain center on very short screens OR very narrow image
		maxWidth: '100%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',
	},
});

export default Lightbox;
