//css
import "./nav.scss";
import logo from "../../assets/logo.jpg";

//components
import React, { Component } from "react";
import {
  Layout,
  Icon,
  Menu,
  Row,
  Col,
  Button,
  Drawer,
  message,
  Avatar
} from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

//functions
import { isMobileOrPc, getQueryStringByName } from "../../utils/utils";

// redux
import { loginSuccess, loginFailure } from "../../store/actions/user";

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false, // 是否为移动端
      visiable: false, //
      placement: "top",
      current: null,
      menuCurrent: "",
      login: false,
      register: false,
      nav: "首页",
      navTitle: "首页",
      code: "",
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({
      isMobile: isMobileOrPc()
    });
    const code = getQueryStringByName("code");
    if (code) {
      this.setState({ code }, () => {
        if (!this.state.code) {
          return;
        }
        this.getUser(this.state.code);
      });
    }
    this.initMenu(this.props.pathname);
  }

  // 获取用户信息
  getUser(code) {
    if (code) return {};
  }

  // 初始化menu
  initMenu(pathname) {
    return;
  }

  render() {
    return (
      <div className="left">
        {this.state.isMobile ? (
          <Header className="mobile-header">
            <Row className="container">
              <Col>
                <a href="http://biaochenxuying.cn/main.html">
                  <div className="logo">
                    <img src={logo} alt="" />
                  </div>
                </a>
              </Col>
              <Col>
                <Menu
                  theme="right"
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                  onClick={() => this.handleMenu()}
                  selectedKeys={[this.state.menuCurrent]}
                >
                  <Menu.Item key="9">
                    <Link to="/">
                      <Icon type="home" theme="outlined" />
                      首页
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="1">
                    <Link to="/articles">
                      <Icon type="ordered-list" theme="outlined" />
                      文章
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/hot">
                      <Icon type="fire" theme="outlined" />
                      热门
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <Link to="/archive">
                      <Icon type="project" theme="outlined" />
                      归档
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <Link to="/project">
                      <Icon type="database" theme="outlined" />
                      项目
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/timeLine">
                      <Icon type="hourglass" theme="outlined" />
                      历程
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/message">
                      <Icon type="message" theme="outlined" />
                      留言
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link to="/about">
                      <Icon type="user" theme="outlined" />
                      关于
                    </Link>
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Header>
        ) : (
          <Header className="pc-header">
            <Row className="container" type="flex" justify="center">
              <Col span={2}>
                <div className="logo">
                  <img src={logo} alt="" />
                </div>
              </Col>
              <Col span={12}>menus</Col>
              <Col span={4}>btns</Col>
            </Row>
          </Header>
        )}
      </div>
    );
  }
}

const stateToProps = state => state.user;
const dispatchToProps = dispatch => ({ loginSuccess, loginFailure });

export default connect(
  stateToProps,
  dispatchToProps
)(Nav);
