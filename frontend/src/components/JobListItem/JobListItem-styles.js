import styled from 'styled-components';

const Styles = styled.div`
.job-location {
  font-size: 25px;
}

.job-list-item {
  background-color: #eee;
  padding: 10px 20px;
  margin: 20px 0px;
  border-radius: 8px;
  border: 1px solid lightblue;
}

.job-list-item-row > * {
  margin: 0 10px;
  display: inline-block;
}

.job-list-item-row > *:first-child {
  margin-left: 0;
}
`;

export default Styles;
