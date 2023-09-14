import { styled } from "styled-components"
// es un npm para solucionar el probelma de map
import { v4 } from "uuid";

const StyledTabs = styled.div`
display: flex;
gap:20px;
margin-bottom: 20px;
`;

const StyledTab = styled.button`
font-size: 1.5rem;
border: none;
background-color: white;
cursor: pointer;

${props => props.active ? `
color:black;
border-bottom:2px solid black
`: `
color:#999;
`}
`

export default function Tabs({ tabs, active, onChange }) {

  return (
    <StyledTabs>
      {tabs.map(tabName => (
        <StyledTab
        key={v4()}
          active={tabName === active}
          onClick={() => { onChange(tabName) }}>
          {tabName}
        </StyledTab>
      ))}
    </StyledTabs>
  )
}
