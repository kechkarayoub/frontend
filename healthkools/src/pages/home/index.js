import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import $ from "jquery";
import styled from "styled-components";
import BlocFeeds from "./components/BlocFeeds";
import Footer from "../../components/Footer";
import HomeHeader from "./components/HomeHeader";
import { get } from "../../services/storage";
import { general_information_api_get } from "../../services/api";

window.jQuery = $;

export class Home extends Component {
  constructor(props) {
    super(props);
    general_information_api_get();
    this.state = {
      current_language: get("current_language"),
    };
  }

  componentDidMount() {
    // if(window.scrollTo)
    //   window.scrollTo(0, 0);
  }
  static getDerivedStateFromProps(props, state) {
    var current_language = get("current_language");
    if(current_language !== state.current_language){
      var new_state = {current_language: current_language};
      return new_state;
    }
    return null;
  }
  componentWillUnmount() {
  }

  render() {
    const {current_language} = this.state;
    var direction_class = current_language === "ar" ? "rtl" : "ltr";
    return (
      <HomeStyle className="home-container">
        <HomeHeader {...this.props}/>
        <section className="one">
          <div className="container">
            <div className={`row ${direction_class}`}>
              <div className="col-xl-8 col-lg-12 ">
                {/* <Carousel
                  handleOpenModalConnexion={() =>
                    this.setState({ openConnexion: true })
                  }
                  handleOpenModalRegister={()  => this.setState({openRegister:true})}
                /> */}
              </div>
              <div className="col-xl-4 col-lg-12 news-feed">
                <BlocFeeds />
              </div>
            </div>
          </div>
        </section>
        <Footer {...this.props}/>
      </HomeStyle>
    );
  }
}
const HomeStyle = styled.div`
  section {
    margin-bottom: 120px;
  }
  @media (max-width: 1199px) {
    section {
      margin-bottom: 150px;
    }
  }
  @media (max-width: 767px) {
    .news-feed{
      padding: 0 20px;
    }
  }
`;
const mapState2Props = state => ({ session: state.session });
export default connect(mapState2Props)(withRouter(Home));
