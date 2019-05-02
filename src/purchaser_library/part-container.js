import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import GridCard from './grid/grid-card';
import ListCard from './list/list-card';

let loadTimeMin = 1000;
let loadTimeMax = 3000;

// Possible values for time/quantity

let times = [
  { value: '2wks',  display: '2 Weeks'  },
  { value: '3wks',  display: '3 Weeks'  },
  { value: '4wks',  display: '4 Weeks'  },
  { value: '5wks',  display: '5+ Weeks' }
];

let quantities = [
  { value: 1,      display: '1'       },
  { value: 10,     display: '10'      },
  { value: 100,    display: '100'     },
  { value: 1000,   display: '1,000'   },
  { value: 10000,  display: '10,000'  },
  { value: 100000, display: '100,000' }
];

class PartContainer extends React.Component {
  constructor( props ){
    super( props );
    this.extractProcesses = () => {
      var i;
      var array = [];
      var origin = this.props.part.secondaryProcesses;
      for( i = 0; i < origin.length; i++ ){
        array.push( origin[i].name );
      }
      return( array.join(", ") )
    }

    // FUNCTIONS TO PARSE DATABASE DATA AND MAKE IT READABLE
    this.secondaryProcesses = ( this.props.part.secondaryProcesses ? this.extractProcesses() : "" );
    this.material = (( this.props.part.material.type || null ) + ( this.props.part.material.grade ? ( " " + this.props.part.material.grade ) : null ));
    this.machineTypes = ( this.props.part.machineTypes && this.props.part.machineTypes.length > 0 ) ? this.props.part.machineTypes.join(", ") : undefined;
    this.materialAndMachineTypes = ( this.material && this.machineTypes ) ? [ this.material, this.machineTypes ].join(", ") : ( this.material || this.machineTypes );

    this.state = {
      selectedTime: times[2],          // Which of the possible options in times[] is selected
      timeOpen: false,                 // Is the time input open?
      selectedQuantity: quantities[3], // Which of the possible options in quantities[] is selected
      quantityOpen: false,             // Is the quantity input open?
      priceUnavailableOpen: false,     // Is the "Predicted Price Unavaialble" explainer popover open?
      hover: false,                    // Is the card being hovered?
      loading: false,                  // Is the pricing data still being calculated?
      displayLoader: false,            // Should the full-card loader be displayed?
      scrimOpacity: 0,                 // How opaque is the scrim?
    }
  }

  handleMouseOver = () => {
    this.setState({ hover: true });
  }

  handleMouseOut = () => {
    this.setState({ hover: false });
  }

  handleTimeClick = () => {
    if ( this.state.timeOpen ) {
      this.setState({timeOpen: false, quantityOpen: false, scrimOpacity: '0.0'});
    } else {
      this.setState({timeOpen: true, quantityOpen: false, scrimOpacity: '0.7'});
    }
  }

  handleQuantityClick = () => {
    if ( this.state.quantityOpen ) {
      this.setState({quantityOpen: false, timeOpen: false, scrimOpacity: '0.0'});
    } else {
      this.setState({quantityOpen: true, timeOpen: false, scrimOpacity: '0.7'});
    }
  }

  handlePopoverClick = () => {
    if ( this.state.priceUnavailableOpen ) {
      this.setState({priceUnavailableOpen: false, scrimOpacity: '0.0'})
    } else {
      this.setState({priceUnavailableOpen: true, scrimOpacity: '0.7'})
    }
  }

  handlePopoverClose = () => {
    this.setState({priceUnavailableOpen: false, scrimOpacity: '0.0'})
  }

  getPartPrices = ( priceScale ) => {
    // CHECK IF PART HAS PRICES AT ALL
    let {prices,pricingAvailable} = this.props.part;
    if (pricingAvailable){
      // GET THE LOW, MEDIAN, AND HIGH PRICES FOR CURRENTLY SELECTED TIME AND QUANTITY.
      // REQUIRES THAT THE "PRICES" OBJECT FROM THE PART IS ALSO PASSED IN, ALONG WITH THE PRICE SCALE.
      // IT ALSO AUTOMATICALLY ENFORCES TWO DECIMAL PLACES, AND ADDS COMMAS WHERE APPROPRIATE IN THE NUMBERS.
      let { value: timeKey } = this.state.selectedTime;
      let { value: quantityKey } = this.state.selectedQuantity;
      return {
        low: ( prices[timeKey][quantityKey][0] * priceScale ).toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        median: ( prices[timeKey][quantityKey][1] * priceScale ).toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        high: ( prices[timeKey][quantityKey][2] * priceScale ).toLocaleString( undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      }
    } else {
      return null;
    }
  }

  triggerFauxLoader = ( value, min, max ) => {
    let timeout = Math.random() * ( max - min ) + min;
    if ( value.time ){
      this.setState({loading: true, displayLoader: true});
      setTimeout(()=> {
        this.setState({selectedTime: value.time})
      }, 50);
      setTimeout(()=> {
        this.setState({displayLoader: false, loading: false})
      }, timeout);
    } else if ( value.quantity ){
      this.setState({loading: true, displayLoader: true});
      setTimeout(()=> {
        this.setState({selectedQuantity: value.quantity})
      }, 50);
      setTimeout(()=> {
        this.setState({displayLoader: false, loading: false})
      }, timeout);
    }
  }

  render(){
    let { part, image, priceDisplay, onScrimClick, hoverOverlayEnabled, libraryLayout, handleTimeChange, handleQuantityChange, staggerDelay } = this.props;
    let passedProps =  {  part,
                          image,
                        handleMouseOver: this.handleMouseOver,
                        handleMouseOut: this.handleMouseOut,
                          handleTimeChange,
                          handleQuantityChange,
                        handleTimeClick: this.handleTimeClick,
                        handleQuantityClick: this.handleQuantityClick,
                        handlePopoverClick: this.handlePopoverClick,
                        handlePopoverClose: this.handlePopoverClose,
                          onScrimClick,
                          hoverOverlayEnabled,
                        materialAndMachineTypes: this.materialAndMachineTypes,
                        secondaryProcesses: this.secondaryProcesses,
                        prices: this.getPartPrices,
                          priceDisplay,
                          times,
                          quantities,
                          submitRef: this
                        }

    switch(libraryLayout){
      case 'grid':
        return (
          <GridCard {...passedProps} staggerDelay={staggerDelay} priceUnavailableOpen={this.state.priceUnavailableOpen} timeOpen={this.state.timeOpen} quantityOpen={this.state.quantityOpen} selectedTime={this.state.selectedTime} selectedQuantity={this.state.selectedQuantity} loading={this.state.loading} hover={this.state.hover} displayLoader={this.state.displayLoader} scrimOpacity={this.state.scrimOpacity} />
        )
      case 'list':
        return (
          <ListCard {...passedProps} staggerDelay={staggerDelay} priceUnavailableOpen={this.state.priceUnavailableOpen} timeOpen={this.state.timeOpen} quantityOpen={this.state.quantityOpen} selectedTime={this.state.selectedTime} selectedQuantity={this.state.selectedQuantity} loading={this.state.loading} hover={this.state.hover} displayLoader={this.state.displayLoader} scrimOpacity={this.state.scrimOpacity} />
        )
      default:
        return undefined
    }
  }
}

PartContainer.propTypes = {
    part: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
    priceDisplay: PropTypes.oneOf(["unit", "quantity"]).isRequired,
    onScrimClick: PropTypes.func.isRequired,
    hoverOverlayEnabled: PropTypes.bool.isRequired,
    libraryLayout: PropTypes.oneOf([ 'grid', 'list' ]).isRequired,
}

export default connect(
  null,
  (dispatch) => ({
    handleTimeChange: ( newValue, originalValue, ref, delay = 0 ) => {
      if ( originalValue !== newValue ){

        ref.triggerFauxLoader({ time: newValue }, loadTimeMin, loadTimeMax );
        ref.setState({ scrimOpacity: '0.0' })
        setTimeout(()=> {
          ref.setState({ quantityOpen: false, timeOpen: false });
        }, delay);
        dispatch({ type: 'HIDE_SCRIM' })

      } else {

        ref.setState({ selectedTime: newValue, scrimOpacity: '0.0' })
        setTimeout(()=> {
          ref.setState({ quantityOpen: false, timeOpen: false });
        }, delay);
        dispatch({ type: 'HIDE_SCRIM' })

      }
    },

    handleQuantityChange: ( newValue, originalValue, ref, delay ) => {
      if ( originalValue !== newValue ){

        ref.triggerFauxLoader({ quantity: newValue }, loadTimeMin, loadTimeMax );
        ref.setState({ scrimOpacity: '0.0' })
        setTimeout(()=> {
          ref.setState({ quantityOpen: false, timeOpen: false });
        }, delay);
        dispatch({ type: 'HIDE_SCRIM' })

      } else {

        ref.setState({ selectedQuantity: newValue, scrimOpacity: '0.0' })
        setTimeout(()=> {
          ref.setState({ quantityOpen: false, timeOpen: false });
        }, delay);
        dispatch({ type: 'HIDE_SCRIM' })

      }
    },

    onScrimClick: ( ref ) => {

      console.log("SCRIM CLICKED");
      dispatch({ type: 'HIDE_SCRIM' })
      ref.setState({ quantityOpen: false, timeOpen: false, priceUnavailableOpen: false, scrimOpacity: '0.0' });

    },

    scrimToggle: ( ref ) => {
      if (ref.state.open === false) {
        ref.setState({open:true})
      } else {
        dispatch({type: 'HIDE_SCRIM'});
        ref.setState({open:false});
      }
    }
  })
)( PartContainer );
