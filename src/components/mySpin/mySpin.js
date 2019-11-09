import React, { Component } from "react";
import { Spin } from "antd";
import "./mySpin.scss";
import { connect } from "react-redux";

class MySpin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let spinClass = `spin-container${this.props.isLoading ? "" : " hide"}`;// 是否隐藏loading
    return (
      <div
        className={spinClass}
        // style={{ display:  ? "block" : "none" }}
      >
        <Spin className="my-spin" size="large"></Spin>
      </div>
    );
  }
}

export default connect(
  state => state.global,
  null
)(MySpin);
