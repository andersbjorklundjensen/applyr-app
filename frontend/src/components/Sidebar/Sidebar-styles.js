import styled from 'styled-components';

const Styles = styled.div`
.navigation {
  display: flex;
  flex-direction: column;
}

.navigation > a {
  padding: 15px 20px;
}

.active {
  background-color: #eee;
  font-weight: bold;
}
`;

export default Styles;
