import styled from 'styled-components';

import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFile from '@fortawesome/fontawesome-free-solid/faFile';

const FileAreaWrapper = styled.div`
  width:100%;
  border:1px solid #cccccc;
  color:#333333;
  margin-bottom:20px;
  display:flex;
  padding:16px;
  flex-direction:${props => props.data ? "row" : "column"};
  align-items:center;
  justify-content:center;
  &:last-of-type{
    margin-bottom:0;
  }
`

const FileAreaHeader = styled.h4`
  font-size:14px;
  font-weight:bold;
  text-align:center;
`

const FileAreaText = styled.span`
  color:#333333;
`

const OtherFilesWrapper = styled.div`
  width:100%;
  border:1px solid #ececec;
  background-color:#fafafa;
  height:90px;
  color:#333333;
  display:flex;
  padding:16px;
  flex-direction:${props => props.data ? "row" : "column"};
  align-items:center;
  justify-content:center;
`

const OtherFilesText = styled.span`
  color:#999999;
  font-weight:bold;
  font-size:13px;
  text-align:center;
  text-transform:uppercase;
`

const PrintArea = (props) => (
  <FileAreaWrapper>
    {
      !props.data ?
      <React.Fragment>
        <FileAreaHeader>Upload 2D Print</FileAreaHeader>
        <FileAreaText>Currently we accept 2D drawings in PDF format</FileAreaText>
      </React.Fragment>
      :
      <span>TODO: POPULATED PRINT AREA</span>
    }
  </FileAreaWrapper>
)

const ModelArea = (props) => (
  <FileAreaWrapper>
    {
      !props.data ?
      <React.Fragment>
        <FileAreaHeader>Upload 3D Model</FileAreaHeader>
        <FileAreaText>Currently we accept 3D models in these formats: STEP, STP, DXF</FileAreaText>
      </React.Fragment>
      :
      <span>TODO: POPULATED MODEL AREA</span>
    }
  </FileAreaWrapper>
)

const OtherFilesArea = (props) => (
  <OtherFilesWrapper>
    <OtherFilesText>
      <FontAwesomeIcon icon={faFile} style={{marginRight:'8px'}}/>
      Drag your files here or click to upload
    </OtherFilesText>
  </OtherFilesWrapper>
)

export {PrintArea, ModelArea, OtherFilesArea};
