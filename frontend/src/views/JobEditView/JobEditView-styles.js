import styled from 'styled-components';

const Styles = styled.div`
.job-form {
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 5%;
}

@media only screen and (max-width: 600px) {
  .job-form {
    display: block;
  }
}

.job-form textarea {
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 12px;
  background-color: #eee;
  width: 100%;
}

.selector {
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 12px;
  background-color: #eee;
  width: 100%;
}
`;

export default Styles;
