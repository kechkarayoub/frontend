import React, {Component} from "react";
import styles from "styled-components";
import LogoImage from "../../../components/LogoImage";
import { withTranslation } from 'react-i18next';
import LanguageSelect from "../../../components/LanguageSelect/index";
import { colors } from "../../../assets/variables/colors";
import { get } from "../../../services/storage";
import {images} from "../_resources";
import HKButtonIcon from '../../../components/HKButtonIcon';
import moment from "moment"
// import { Link } from "react-router-dom";
class HomeHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      current_language: get("current_language") || "en",
    };
  }

  static getDerivedStateFromProps(props, state) {
    var current_language = get("current_language") || "en";
    if(current_language != state.current_language){
      var new_state = {current_language: current_language};
      return new_state;
    }
    return null;
  }

  render(){
    const {current_language} = this.state;
    return (
      <>
        <HomeHeaderStyle>
          <div className={`header-top ${current_language == "ar" ? "rtl" : ""}`}>
            <div className={`left`}>
            </div>
            <div className={`right ${current_language == "ar" ? "rtl" : ""}`}>
              <LanguageSelect />
              <HKButtonIcon image={images.sign_in} alt={this.props.t("Sign in icon")} />
              <HKButtonIcon image={images.sign_up} alt={this.props.t("Sign up icon")} />
            </div>
          </div>
          <div className={`header-bottom ${current_language == "ar" ? "rtl" : ""}`}>
            <div className={`left `}>
              <LogoImage style={{
                  cursor: "pointer",
                  maxWidth: "150px",
                  minWidth: "100px",
                }}
                on_click={() => {
                  this.props.history.push(`/`);
                }} 
              />
            </div>
            <div className={`right `}>

            </div>
          </div>
        </HomeHeaderStyle>
      </>
    );
  }
};
const HomeHeaderStyle = styles.header`
  width: 100%;
  .header-bottom{
    display: flex;
    justify-content: space-between;
    .left{
      padding: 10px 20px;
    }
    .right{

    }
  }
  .header-top{
    background: ${colors.default_color};
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    .left{
      display: flex;
      justify-content: space-between;
    }
    .right{
      display: flex;
      justify-content: space-between;
    }
  }
  @media(max-width: 1199px){
    
  }  

  @media(max-width: 767px){
    overflow-x: inherit;
  }
`;

export default withTranslation('translations')(HomeHeader);