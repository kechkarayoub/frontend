import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import styled from "styled-components";

import { withTranslation, Trans, composeInitialProps } from 'react-i18next';
import moment from 'moment';
import { get } from "../../services/storage";
import { colors } from "../../assets/variables/colors";
import { get_intro_items } from "./data_use_policy";
import HKButton from "../HKButton";

class DataUsePolicyModal extends Component {
  constructor(props) {
    super(props);
    this.data = {
      company_address: "",
      company_capital: "",
      company_legal_status: "",
      company_name: "",
      responsable_address: "",
      responsable_full_name: "",
      site_name: get("general_information") && get("general_information").site_name ? get("general_information").site_name : "HealthKools",
      site_url: "http://localhost:3000",
    };
    var intro_items = get_intro_items(this.data);
    this.state= {
      items: intro_items.items,
      current_language: get("current_language"),
      intro: intro_items.intro,
    };
  }

  componentDidMount(){
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
    var new_state = {};
    // if(prevState.current_language !== this.state.current_language){
    // }
    if(Object.keys(new_state).length !== 0){
      this.setState(new_state);
    }
  }

//   componentDidMount(){
//     $('.selectpicker').selectpicker();
//   }

//   componentDidUpdate() {
//     $('.selectpicker').selectpicker("refresh");
//   }


  render() {
    const {current_language, items, intro} = this.state;
    return (
      <>
      <Modal
        show={this.props.show} 
        onHide={() => this.props.onHide()}
        className={`custom_modal terms_of_service ${current_language === "ar" ? "rtl" : ""}`}
        backdropClassName='backdrop_custom_z_index_1055'
        animation={false}
      >
        <DataUsePolicyModalStyle className="custom_scroll_bar">
          <Modal.Header>
            <span className="visibility_hidden"></span>
            { this.props.t('Data use policy') }
            <Button variant="circle" className="close-modal" onClick={() => this.props.onHide()}>
                <span className="close_ico">×</span>
            </Button>
          </Modal.Header>
          <Modal.Body data-testid="body">
            <Row>
              <p className={`intro `} dangerouslySetInnerHTML={{__html: intro[current_language]}}>
              </p>
              {items.map((item, idx) => {
                return <div className={`article `}>
                  <p key={idx} className={`title `}>
                    {/* <span className="article_number">{this.props.t("Item") + " " + (idx + 1) + ": "}</span> */}
                    <span>{item.title[current_language]}</span>
                  </p>
                  {item.intro &&
                    <p key={idx+"_intro"} className={`intro `} dangerouslySetInnerHTML={{__html: item.intro[current_language]}}>
                    </p>
                  }
                  {item.paragraphs.map((paragraph, idx_p) => {
                    return <>
                      <p key={idx + "_" + idx_p} className={` `} dangerouslySetInnerHTML={{
                        __html: paragraph[current_language]
                      }}></p>
                      {paragraph.list_items &&
                        <ul>
                          {paragraph.list_items.map((li, idx) => {
                            return <li key={idx} >
                              <span dangerouslySetInnerHTML={{__html: li[current_language]}}></span>
                              {li.sub_list_items &&
                                <ul>
                                  {li.sub_list_items.map((sli, idxs) => {
                                    return <li key={idxs} dangerouslySetInnerHTML={{__html: sli[current_language]}}></li>
                                  })}
                                </ul>
                              }
                            </li>
                          })}
                        </ul>
                      }
                    </>
                  })}
                </div>
              })}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <HKButton
              added_class="default-bg-color btn-rounded" text={"Close"}
              on_click={() => {
                this.props.onHide();
              }}
              style={{color: "white", }}
            />
          </Modal.Footer>
        </DataUsePolicyModalStyle>
      </Modal>
      </>
    );
  }
}
const DataUsePolicyModalStyle = styled.div`
  height: 100%;
  padding: 10px 25px 10px 15px;
  .modal-header{
    color: #1fa1cf;
    font-size: 20px;
    font-weight: bold;
    padding: 5px 0;
    .close-modal{
      background-image: linear-gradient(225deg,#67d3f9,#1fa1cf);
      border-radius: 50%;
      box-shadow: 0 10px 20px 0 #1fa1cf5c;
      color: #fff;
      font-size: 40px;
      height: 30px;
      line-height: 30px;
      padding: 0;
      text-align: center;
      width: 30px;
      .close_ico{
        display: block;
        height: 100%;
        line-height: 24px;
        padding-bottom: 6px;
      }
    }
  }
  .modal-body{
    padding: 10px 20px;
    .intro{
      text-align: justify;
    }
    .article{
      margin-bottom: 15px;
      p{
        text-align: justify;
        &.title{
          color: ${colors.default_color};
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
`;
export default withTranslation('translations')(DataUsePolicyModal);