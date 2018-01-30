import styled from 'styled-components';

const Grid = styled.div.attrs({
})`
  width:100%;
  display:grid;
  grid-template-rows: ${props => props.gridrows};
  grid-template-columns: ${props => props.gridcolumns};
  grid-template-areas: ${props => props.gridareas};
  grid-row-gap: ${props => props.gridrowgap};
  grid-column-gap: ${props => props.gridcolumngap};
  grid-auto-flow:column;
`

export default Grid
