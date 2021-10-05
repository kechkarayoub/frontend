import React, { Component } from "react";
import MediaQuery from "react-responsive";
import Slider from "react-slick";
// import Feed from "rss-to-json";
import { withTranslation } from 'react-i18next';
import styled from "styled-components";
import {feeds_api_get, feeds_languages_api_get} from "../../../services/api";
import { colors } from "../../../assets/variables/colors";
import FeedItem from "./FeedItem";
import { get } from "../../../services/storage";
import {get_feeds_url} from "../../../utils/feeds";
import {shuffle} from "../../../utils/index";

 class BlocFeeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds_languages: {},
      data: [],
      current_language: get("current_language"),
    };
    this.feeds_api_done = true;
    this.saved_feeds_api_done = true;
  }

  componentDidMount() {
    this.getSavedFeeds();
  }

  getFeeds = (current_language) => {
    if(this.feeds_api_done){
      this.feeds_api_done = false;
      const api_key = process.env.REACT_APP_RSS2JSON_API_KEY;
      var feeds_url = get_feeds_url(current_language || this.state.current_language);
      feeds_api_get(api_key, feeds_url).then(res => {
        this.feeds_api_done = true;
        var {feeds_languages}  = this.state;
        feeds_languages[current_language || this.state.current_language] = res.items;
        this.setState({
          feeds: res.items,
          feeds_languages: feeds_languages,
        });
      })
      .catch(err => {
        this.feeds_api_done = true;
      });
    }
  }
  getSavedFeeds = (current_language) => {
    if(this.saved_feeds_api_done){
      this.saved_feeds_api_done = false;
      feeds_languages_api_get().then(res => {
        this.saved_feeds_api_done = true;
        var new_state = {};
        if(!res || !res.feeds_languages[current_language || this.state.current_language] || res.feeds_languages[current_language || this.state.current_language].length === 0){
          this.getFeeds(current_language);
        }
        else{
          new_state.loading_feeds = false;
        }
        new_state.feeds_languages = res.feeds_languages;
        this.setState(new_state);
      })
      .catch(err => {
      });
    }
  }
  static getDerivedStateFromProps(props, state) {
    var current_language = get("current_language");
    if(current_language !== state.current_language){
      var new_state = {current_language: current_language};
      return new_state;
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.current_language !== this.state.current_language){
      const {feeds_languages} = this.state;
      var new_state = {};
      if(!feeds_languages[this.state.current_language] || feeds_languages[this.state.current_language].length === 0){
        // new_state.loading_feeds = true;
        // this.setState(new_state);
        this.getFeeds();
      }
    }
  }

  render() {
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };
    const {feeds_languages, current_language} = this.state;
    var feeds_language = feeds_languages[current_language] || [];
    let render_feeds = shuffle(feeds_language).map((feed, idx) => {
      return (
        <FeedItem key={idx} feed={feed}/>
      );
    });
    return (
      <BlocFeedsStyle>
        <h3> { this.props.t("Health news") }</h3>
        <div className="bloc-feeds">
          <MediaQuery query="(min-width: 1200px)">
            <Slider {...settings} slidesPerRow={3} slidesToShow={1}>{render_feeds}</Slider>
          </MediaQuery>

          <MediaQuery query="(max-width: 1199px) and (min-width: 768px)">
            <Slider {...settings} slidesPerRow={1} slidesToShow={3}>{render_feeds}</Slider>
          </MediaQuery>

          <MediaQuery query="(max-width: 767px)">
            <Slider {...settings} slidesPerRow={1} slidesToShow={1}>{render_feeds}</Slider>
          </MediaQuery>
        </div>
      </BlocFeedsStyle>
    );
  }
}

const BlocFeedsStyle = styled.div`
  h3{
    color: ${colors.default_color};
    text-align: center;
  }
  .bloc-feeds{
    margin: 10px 7px 0;
    position:relative;
    .slick-list{
      margin: 0 10px;
    }
    .slick-arrow{
      position: absolute;
      top: 50%;
      margin-top: -6px;
      background-color: ${colors.default_color};
      width: 36px;
      height: 36px;
      border-radius: 50%;
      text-align: center;
      cursor: pointer;
      line-height: 36px;
      font-size: 25px;
      font-family: FontAwesome;
      z-index: 9;
      i{
        color: ${colors.white};
      }
    }
    .slick-next{
      right: -15px;
      &:before{
        line-height: 36px;
        font-size: 25px;
        content: "\f105";
        font-family: FontAwesome;
      }
    }
    .slick-prev{
      left: -15px;
      &:before{
        line-height: 36px;
        font-size: 25px;
        content: "\f104";
        font-family: FontAwesome;
      }
    }
  }

  @media screen and (max-width: 1199px){
    h3{
      margin: 50px 0 10px;
    }
  }
  @media screen and (max-width: 767px){
    h3{
      margin-bottom: 15px;
    }
    .bloc-feeds{
      margin: 10px 0 0;
    }
  }
`;
export default withTranslation('translations')(BlocFeeds);


