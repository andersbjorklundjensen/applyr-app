import styled from 'styled-components';

const Styles = styled.div`
.wrapper {
  display: grid;
  grid-template-columns: 20% 70%;
  column-gap: 5%;
}

.title {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

@media only screen and (max-width: 370px) {
  .title {
    display: block;
  }
}
`;

export default Styles;
