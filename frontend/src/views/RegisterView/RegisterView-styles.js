import styled from 'styled-components';

const Styles = styled.div`
.form-wrapper input[type=submit] {
  color: #fff;
  background-color: #e24f54;
  padding: 10px 25px;
  border-radius: 100px;
  border: none;
  width: 100%;
}

.signup-form > * {
  margin: 15px 0;
}

.sign-up {
  display: flex;
  justify-content: center;
}

.form-wrapper {
  margin-top: 5%;
  background-color: #fff;
  width: 50vw;
  max-width: 300px;
  border-radius: 8px;
}

.form-wrapper > h1 {
  text-align: center;
}

.spinner-wrapper {
  display: flex;
  justify-content: center;
}

.spinner-wrapper > * {
  margin: 0 10px;
  height: 10vh;
  line-height: 10vh;
}
`;

export default Styles;
