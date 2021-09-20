import React, { Component } from "react";
import logo from "../assets/img/logo_temp.jpg";
import styled from "styled-components";
import { withTranslation, Trans } from 'react-i18next';

class ErrorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <ErrorComponentStyle className="container-error-component">
      <img src={logo} alt="Logo"/>
      <button type='button' className='btn default-bg-color btn-rounded' 
          onClick={() => {
            // var user = get("session_user");
            // if(user) {
            // }
            // else
            this.props.history.push(`/`);
          }}>
          {this.props.t("Try again")}
      </button>
    </ErrorComponentStyle>;
  }
}
const ErrorComponentStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: max-content;
    left: 50%;
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
    img{
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        max-width: 250px;
        min-width: 200px;
    }
    button{
        color: white;
    }
`;
export default withTranslation('translations')(ErrorComponent);
