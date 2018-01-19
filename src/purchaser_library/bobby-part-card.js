import React from 'react';
import PropTypes from 'prop-types';

import DropDown from '../components/dropdown';
import Select from '../components/select';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/buttons';
import zIndex from '../utils/z-index.js';

const CardOverlay = styled.div`
  display:none;
  justify-content:center;
  align-items:center;
  position: absolute;
  top: 0;bottom: 0;left: 0;right: 0;
  height:100%;
  width:100%;
  background-color:rgba(0,0,0,0.3);
`

const CardItem = styled.div`
  width: 100%;
  &:hover{
    ${CardOverlay} {
      display: flex;
    }
  }
`

const Card = styled.div`
  background-color:white;
  height:100%;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.05);
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`

const CardPart = Card.extend`
  position:relative;
  display: flex;
`

const OverlayLink = styled(Link)`
  text-decoration:none;
`

const OverlayButton = (props) => (
  <OverlayLink to={`/parts/${props.id}`}><Button {...props}>View Part</Button></OverlayLink>
)

const badges = {
  primary:{
    borderColor:'#000000',
    backgroundColor:'#00AAFF',
    textColor:'#FFFFFF',
  },
  caution:{
    borderColor:'#e69900',
    backgroundColor:'#FFAA00',
    textColor:'#FFFFFF',
  },
  error:{
    borderColor:'#000000',
    backgroundColor:'#00AAFF',
    textColor:'#FFFFFF',
  },
  info:{
    borderColor:'#000000',
    backgroundColor:'#00AAFF',
    textColor:'#FFFFFF',
  },
  success:{
    borderColor:'#000000',
    backgroundColor:'#00AAFF',
    textColor:'#FFFFFF',
  }
}

const PartBadge = styled.div`
  padding:6px 10px;
  border-radius:14px;
  line-height:11px;
  font-size:11px;
  display:inline-block;
  letter-spacing:1px;
  border:solid 1px black;
  flex-grow:0;
  /* Adapt Colors based on badge type prop */
  background-color: ${props => props.nature ? badges[props.nature].backgroundColor : null};
  border-color: ${props => props.nature ? badges[props.nature].borderColor : null};
  color: ${props => props.nature ? badges[props.nature].textColor : null};
`
PartBadge.propTypes = {
  nature: PropTypes.oneOf(['primary','caution','error','info','success','default'])
}

const PartName = styled.h3`
  font-weight:bold;
  font-size:18px;
  margin-bottom:8px;
`

const GreyDetail = styled.p`
  font-size:11px;
  line-height:11px;
  color:#797979;
  margin-bottom:4px;
  margin-top:0;
  min-height:11px;
  &:last-of-type{
    margin-bottom:0;
  }
`

const CardTop = styled.div`
  width:100%;
  height:264px;
  background-color:#fafafa;
  border-bottom:1px solid #ededed;
  background-image:${props => props.image ? "url(" + props.image + ")" : "none"};
  background-size:cover;
  position:relative;
`

const CardBottom = styled.div`
  padding:16px;
`

const CardFooter = styled.div`
  margin-top:24px;
  width:100%;
`

const PriceRow = styled.div`
  width:100%;
  margin-bottom:16px;
`

const ControlRow = styled.div`
  width:100%;
  margin-bottom:32px;
`

const Price = styled.div`
  font-size:18px;
  color:#2196F3;
  display:inline-block;
`

const Each = styled.div`
  font-size:14px;
  color:#797979;
  display:inline-block;
  margin-left:6px;
`

class BobbyPartCard extends React.Component {
  constructor(props){
    super(props);
    this.extractProcesses = () => {
      var i;
      var array = [];
      var origin = this.props.part.secondaryProcesses;
      for(i = 0; i < origin.length; i++){
        array.push(origin[i].name);
      }
      return(
        array.join(", ")
      )
    }
    this.secondaryProcesses = ( this.props.part.secondaryProcesses ? this.extractProcesses() : "" );
    this.material = (( this.props.part.material.type || null ) + ( this.props.part.material.grade ? ( " " + this.props.part.material.grade ) : null ));
    this.machineTypes = (this.props.part.machineTypes && this.props.part.machineTypes.length > 0) ? this.props.part.machineTypes.join(", ") : undefined;
    this.materialAndMachineTypes = (this.material && this.machineTypes) ? [this.material,this.machineTypes].join(", ") : (this.material||this.machineTypes);
  }
  /*secondaryProcesses = (part) => {
    if (part.secondaryProcesses) {
      var i;
      var array = [];
      var origin = part.secondaryProcesses;
      console.log(part.secondaryProcesses);
      for(i = 0; i < origin.length; i++){
        array.push(origin[i].name);
      }
      return(
        array.join(", ")
      )
    } else {
      return
    }
  }
  materialAndMachineType = (part) => {
    var materialStr, machineTypesStr, output;
    if ( part.material ) {
      let { type, grade } = part.material;
      materialStr = (( type || "" ) + ( grade ? ( " " + grade ) : "" ));
    }
    if ( part.machineTypes ) {
      machineTypesStr = (part.machineTypes.join( ", " ));
    }
    if ( materialStr && machineTypesStr ) {
      output = ( materialStr + ", " + machineTypesStr );
    } else {
      output = (materialStr || machineTypesStr);
    }

    return output;
  }*/
  render(){
    const part = this.props.part;
    return (
      <CardItem>
        <CardPart>
          <CardTop image={this.props.image}>
            <CardOverlay>
              <OverlayButton id={part.id} nature="primary"/>
            </CardOverlay>
          </CardTop>
          <CardBottom>
            <PartName>{part.partNumber}</PartName>
            <GreyDetail>{this.materialAndMachineTypes}</GreyDetail>
            <GreyDetail>{this.secondaryProcesses}</GreyDetail>
            <CardFooter>
              <PriceRow>
                <Price>$Price</Price><Each>ea</Each>
              </PriceRow>
              <ControlRow><DropDown value="1,000"/><div style={{content:'',display:'inline-block',width:'8px'}}/><DropDown value="4 Wks"/></ControlRow>
              { false ? <ControlRow><Select value="1,000"/><Select value="4 Wks"/></ControlRow> : null }
              <Button nature="default" width="stretch">Add to Estimate</Button>
            </CardFooter>
          </CardBottom>
        </CardPart>
      </CardItem>
    )
  }
}

export default BobbyPartCard;
