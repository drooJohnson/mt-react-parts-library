import React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import styled from 'styled-components';

const MTSelect = styled(ReactSelect)`

// handle disabled state
&.is-disabled {
  .Select-arrow-zone {
    cursor: default;
    pointer-events: none;
  }

  > .Select-control {
    background-color: #FFFFFF;
    &:hover {
      box-shadow: none;
    }
  }
}

&.is-searchable {
  &.is-open > .Select-control {
    cursor: text;
  }

  &.is-focused:not(.is-open) > .Select-control {
    cursor: text;
  }
}

&.is-open > .Select-control {
  @include border-bottom-radius( 0 );
  background: #FFFFFF;
  border-color: #c6c6c6;

  // flip the arrow so its pointing up when the menu is open
  .Select-arrow {
    top: -2px;
    border-color: transparent transparent $select-arrow-color;
    border-width: 0 $select-arrow-width $select-arrow-width;
  }
}

&.is-focused > .Select-control {
  background: #FFFFFF;
}

&.is-focused:not(.is-open) > .Select-control {
  border-color: #00e7b2;
  box-shadow: 0 0 2px 0 #00e7b2;
}


&.has-value.is-clearable.Select--single > .Select-control .Select-value {
  padding-right: ($select-clear-width + $select-arrow-width * 5);
}

&.has-value.Select--single > .Select-control .Select-value,
&.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value {
  .Select-value-label {
    color: $select-text-color;
  }
  a.Select-value-label {
    cursor: pointer;
    text-decoration: none;

    &:hover,
    &:focus {
      color: $select-link-hover-color;
      outline: none;
      text-decoration: underline;
    }

    &:focus {
      background: #FFFFFF;
    }
  }
}

// fake-hide the input when the control is pseudo-focused
&.has-value.is-pseudo-focused .Select-input {
  opacity: 0;
}

&.is-open .Select-arrow,
.Select-arrow-zone:hover > .Select-arrow {
  border-top-color: $select-arrow-color-hover;
}
&.Select--rtl {
  direction: rtl;
  text-align: right;
}

// base

.Select-control {
background-color: #FFFFFF;
border-color: #c6c6c6;
border-radius: 2px;
border: $selectInput-border-width solid #c6c6c6;
color: $select-text-color;
cursor: default;
display: table;
border-spacing: 0;
border-collapse: separate;
height: $selectInput-height;
outline: none;
overflow: hidden;
position: relative;
width: 100%;

&:hover {
  box-shadow: $selectInput-hover-box-shadow;
}

.SelectInput:focus {
  outline: none;
  background: #FFFFFF;
}
}

// placeholder
.Select-placeholder,
.Select--single > .Select-control .Select-value {
bottom: 0;
color: $selectInput-placeholder;
left: 0;
line-height: $selectInputInternal-height;
padding-left: $select-padding-horizontal;
padding-right: $select-padding-horizontal;
position: absolute;
right: 0;
top: 0;

// crop text
max-width: 100%;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}


// the <input> element users type in

.Select-input {
height: $selectInputInternal-height;
padding-left: $select-padding-horizontal;
padding-right: $select-padding-horizontal;
vertical-align: middle;

> input {
  width: 100%;
  background: none transparent;
  border: 0 none;
  box-shadow: none;
  cursor: default;
  display: inline-block;
  font-family: inherit;
  font-size: inherit;
  // height: $selectInputInternal-height;
  margin: 0;
  outline: none;
  // padding: 0;
  line-height: 17px;  /* For IE 8 compatibility */
  padding: (($selectInputInternal-height - 14) / 2 - 2) 0 (($selectInputInternal-height - 14) / 2 + 2);  /* For IE 8 compatibility */
  -webkit-appearance: none;

  .is-focused & {
    cursor: text;
  }
}

}

// fake input
.Select-control:not(.is-searchable) > .Select-input {
outline: none;
}

// loading indicator
.Select-loading-zone {
cursor: pointer;
display: table-cell;
position: relative;
text-align: center;
vertical-align: middle;
width: $select-loading-size;
}
.Select-loading {
@include Select-spinner($select-loading-size, $select-loading-color-bg, $select-loading-color);
vertical-align: middle;
}


// the little cross that clears the field

.Select-clear-zone {
@include animation( Select-animation-fadeIn 200ms );
color: $select-clear-color;
cursor: pointer;
display: table-cell;
position: relative;
text-align: center;
vertical-align: middle;
width: $select-clear-width;

&:hover {
  color: $select-clear-hover-color;
}
}
.Select-clear {
display: inline-block;
font-size: $select-clear-size;
line-height: 1;
}
.Select--multi .Select-clear-zone {
width: $select-clear-width;
}

.Select--multi .Select-multi-value-wrapper {
display: inline-block;
}
.Select .Select-aria-only {
position: absolute;
display: inline-block;
height: 1px;
width: 1px;
margin: -1px;
clip: rect(0,0,0,0);
overflow: hidden;
float: left;
}


// arrow indicator

.Select-arrow-zone {
cursor: pointer;
display: table-cell;
position: relative;
text-align: center;
vertical-align: middle;
width: ($select-arrow-width * 5);
padding-right: $select-arrow-width;

.Select--rtl & {
  padding-right: 0;
  padding-left: $select-arrow-width;
}
}

.Select-arrow {
border-color: $select-arrow-color transparent transparent;
border-style: solid;
border-width: $select-arrow-width $select-arrow-width ($select-arrow-width / 2);
display: inline-block;
height: 0;
width: 0;
position: relative;
}

.Select-menu-outer {
	border-bottom-radius: 2px;
	background-color: ;
	border: 1px solid #c6c6c6;
	border-top-color: #e2e2e2;
	box-shadow: $select-menu-box-shadow;
	box-sizing: border-box;
	margin-top: -1px;
	max-height: $select-menu-max-height;
	position: absolute;
	left: 0;
	top: 100%;
	width: 100%;
	zIndex: $select-menu-zindex;
	-webkit-overflow-scrolling: touch;
}


// wrapper

.Select-menu {
	max-height: ($select-menu-max-height - 2px);
	overflow-y: auto;
}


// options

.Select-option {
	box-sizing: border-box;
	background-color: $select-option-bg;
	color: $select-option-color;
	cursor: pointer;
	display: block;
	padding: $select-padding-vertical $select-padding-horizontal;

	&:last-child {
		border-bottom-radius: 2px;
	}

	&.is-selected {
		background-color: $select-option-selected-bg;
		color: $select-option-selected-color;
	}

	&.is-focused {
		background-color: $select-option-focused-bg;
		color: $select-option-focused-color;
	}

	&.is-disabled {
		color: $select-option-disabled-color;
		cursor: default;
	}

}


// no results

.Select-noresults {
	box-sizing: border-box;
	color: $select-noresults-color;
	cursor: default;
	display: block;
	padding: $select-padding-vertical $select-padding-horizontal;
}

`

const Select = (props) => (
  <MTSelect optionClassName="mt-select-option" className="mt-select"/>
)

export default Select;
