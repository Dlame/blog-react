import "./slider.scss";
import React, { Component } from "react";
import { Avatar, Icon } from "antd";
import { Link } from "react-router-dom";

// images
import logo from "../../assets/IMG_20180318_233038__01.jpg";
import BiaoChenXuYing from "../../assets/BiaoChenXuYing.png";
import YingHeZaHuoPu from "../../assets/YingHeZaHuoPu.png";

class SliderRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      type: 2, //1 :其他友情链接 2: 是管理员的个人链接 ,‘’ 代表所有链接
      pageNum: 1,
      pageSize: 50,
      list: [],
      linkList: []
    };
  }

  componentDidMount() {
    this.getTags();
  }

  // 获取标签
  getTags() {
    this.setState({
      list: []
    });
  }

  render() {
    const list = this.state.list.map(item => (
      <Link
        className="item"
        key={item._id}
        to={`/articles?tag_id=${item._id}&tag_name=${item.name}&category_id=`}
      >
        <span key={item._id}>{item.name}</span>
      </Link>
    ));
    return (
      <div className="right">
        <Avatar className="right-logo" src={logo} size={130} icon="user" />
        <div className="title">Daze</div>
        <div className="right-content">
          <div className="item">
            <div className="num">123</div>粉丝
            <Icon type="right" theme="outlined" />
          </div>
          <div className="item">
            <div className="num">123</div>文章
            <Icon type="right" theme="outlined" />
          </div>
          <div className="item">
            <div className="num">123</div>字数
            <Icon type="right" theme="outlined" />
          </div>
          <div className="item">
            <div className="num">123</div>收获喜欢
            <Icon type="right" theme="outlined" />
          </div>
          {/* <div className="footer">{linkChildren}</div> */}
        </div>
        <div className="tags">
          <div className="title">标签云</div>
          {list}
        </div>
        <div className="introduce">
          <div className="title">技术以内的 BB</div>
          <div className="content">
            <img
              style={{ width: "100%" }}
              src={BiaoChenXuYing}
              alt="全栈修炼"
            />
          </div>
        </div>
        <div className="introduce">
          <div className="title">技术以外的 BB</div>
          <div className="content">
            <img
              style={{ width: "100%" }}
              src={YingHeZaHuoPu}
              alt="硬核杂货铺"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SliderRight;
