import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';

const SearchArea = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 6px;
  position: relative;
  overflow: hidden;
`

const Input = styled.input`
  font-size: 14px;
  line-height: 20px;
  color: #000;
  padding: 5px 17px;
  padding-left: 22px;
  height: 40px;
  display: block;
  border: 1px solid #ccc;
  margin: 0 0 14px;
  width: 100%;
  font-family: proxima-nova-reg,Arial,Helvetica,sans-serif;
  background: #fff;
  -webkit-appearance: none;
  border-radius: 0;
  box-shadow: none;
  -webkit-box-shadow: none;
  outline: none;
  border: none;
  margin: 0;
  height: 30px;
  &::placeholder{
    color:#cccccc;
  }
`

class Search extends React.Component{
  render(){
    return (
      <SearchArea>
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            position:'absolute',
            top:'50%',
            marginTop:'-8px',
            left:'6px',
            lineHeight:'1',
          }}
        />
        <Input placeholder="Search"/>
      </SearchArea>
    )
  }
}

export default Search
