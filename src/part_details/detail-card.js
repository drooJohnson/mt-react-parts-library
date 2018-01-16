import styled from 'styled-components';
import Button from '../components/buttons';

import React from 'react';
import ReactDOM from 'react-dom';

const Card = styled.div`
  background-color:#ffffff;
  padding:24px;
  margin-bottom:12px;
  line-height:20px;
`

const FlexCard = Card.extend`
  display:flex;
`

const PartDetailHeading = styled.h2`
  font-size:32px;
  line-height:36px;
  margin-bottom:14px;
`

const PartDetailDescription = styled.p`
  font-size:14px;
  line-height: 18px;
  color:#999999;
  font-style:italic;
`

const DetailHeaderPanel = (props) => (
  <FlexCard>
    <div>
      <PartDetailHeading>{props.name}</PartDetailHeading>
      <PartDetailDescription>Only visible to your company</PartDetailDescription>
    </div>
    <div style={{marginLeft:'auto'}}>
      <Button nature='default'>Edit</Button>
      <Button nature='default'>Duplicate</Button>
      <Button nature='default'>Archive</Button>
      <Button nature='default'>Add To Estimate</Button>
    </div>
  </FlexCard>
)

const PanelHeading = styled.h5`
  font-weight:bold;
  line-height:15.4px;
  font-size:14px;
  margin-bottom:24px;
  display:block;
`

const DetailsTable = styled.dl`
  font-size:14px;
  line-height:20px;
  margin-bottom:0;
  margin-left:0;
  margin-top:0;
  margin-right:0;
  display:grid;
  grid-auto-flow:row;
  grid-template-columns:auto 1fr;
  grid-column-gap:20px;
  grid-row-gap:10px;
`

const DetailName = styled.dt`
  font-weight:bold;
  dispay:inline-block;
  vertical-align:top;
  margin:0;
`

const DetailValue = styled.dd`
  dispay:inline-block;
  vertical-align:top;
  margin:0;
`

const Detail = (props) => (
  <React.Fragment>
    <DetailName>{props.name}</DetailName>
    <DetailValue>{props.value}</DetailValue>
  </React.Fragment>
)

const DetailsPanel = (props) => (
  <Card>
    <PanelHeading>{props.name}</PanelHeading>
    {props.children}
  </Card>
)

const DetailsDataTable = (props) => (
  <DetailsTable>
    {props.details.map((detail)=>(
      <Detail name={detail.name} value={detail.value}/>
    ))}
  </DetailsTable>
)

const PartDetailsPanel = (props) => (
  <DetailsPanel name={props.name}>
    <DetailsDataTable details={props.details}/>
  </DetailsPanel>
)

export {DetailHeaderPanel, DetailsPanel, PartDetailsPanel};
