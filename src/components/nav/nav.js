//css
import "./nav.scss";
import logo from "../../assets/logo.jpg";

//components
import React, { Component } from "react";
import { Layout, Icon, Menu, Row, Col, Button, Drawer, Avatar } from "antd";
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
      visiable: false, // 移动端下拉菜单
      placement: "top",
      current: null,
      menuCurrent: "", // 当前选中菜单
      login: false, // 登录条件渲染
      register: false, // 注册条件渲染
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

  componentWillReceiveProps(nextProps) {
    this.initMenu(nextProps.pathname);
  }

  // 获取用户信息
  getUser(code) {
    if (code) return {};
  }

  // 初始化menu
  initMenu(pathname) {
    console.log(pathname);
    let key = "9";
    let navTitle = "";
    if (pathname === "/" || pathname === "/home") {
      key = "9";
      navTitle = "首页";
    } else if (pathname === "/articles") {
      key = "1";
      navTitle = "文章";
    } else if (pathname === "/hot") {
      key = "2";
      navTitle = "热门";
    } else if (pathname === "/timeLine") {
      key = "3";
      navTitle = "历程";
    } else if (pathname === "/message") {
      key = "4";
      navTitle = "留言";
    } else if (pathname === "/about") {
      key = "5";
      navTitle = "关于我";
    } else if (pathname === "/articleDetail") {
      key = "6";
      navTitle = "文章详情";
    } else if (pathname === "/project") {
      key = "7";
      navTitle = "项目";
    } else if (pathname === "/archive") {
      key = "8";
      navTitle = "归档";
    }
    this.setState({
      navTitle,
      menuCurrent: key
    });
  }

  // menu点击
  handleMenu(e) {
    this.setState({
      menuCurrent: e.key
    });
  }

  handleLogout = e => {
    this.setState({
      current: e.key
    });
    window.sessionStorage.userInfo = "";
    this.closwDrawer();
  };

  showLoginModal() {
    this.closwDrawer();
    this.setState({
      login: true
    });
  }
  showRegisterModal() {
    this.closwDrawer();
    this.setState({
      register: true
    });
  }
  handleLoginCancel() {
    this.setState({
      login: false
    });
  }
  handleRegisterCancel() {
    this.setState({
      register: false
    });
  }
  menuClick({ key }) {
    this.setState({
      nav: key
    });
  }

  showDrawer() {
    this.setState({
      visible: true
    });
  }

  closwDrawer() {
    this.setState({
      visible: false
    });
  }

  render() {
    let userInfo = "";
    if (window.sessionStorage.userInfo) {
      userInfo = JSON.parse(window.sessionStorage.userInfo);
    }
    return (
      <div className="left">
        {this.state.isMobile ? (
          <>
            <Header className="mobile-header">
              <Row className="container">
                <Col span={4} className="container-col center-container">
                  <a href="http://biaochenxuying.cn/main.html">
                    <div className="logo">
                      <img src={logo} alt="" />
                    </div>
                  </a>
                </Col>
                <Col className="container-col" span={16}>
                  <div className="nav-title">{this.state.navTitle}</div>
                </Col>
                <Col className="container-col center-container" span={4}>
                  <Icon
                    type="bars"
                    className="bars"
                    onClick={() => this.showDrawer()}
                  />
                </Col>
              </Row>
            </Header>
            <Drawer
              placement={this.state.placement}
              closable={false}
              onClose={() => this.closwDrawer()}
              visible={this.state.visible}
              height={420}
            >
              <div className="drawer">
                <p onClick={() => this.closwDrawer()}>
                  <Link to="/">
                    <Icon type="home" /> 首页
                  </Link>
                </p>
                <p onClick={() => this.closwDrawer()}>
                  <Link to="/articles">
                    <Icon type="ordered-list" /> 文章
                  </Link>
                </p>
                <p onClick={() => this.closwDrawer()}>
                  <Link to="/hot">
                    <Icon type="fire" onClick={() => this.showLoginModal()} />
                    热门
                  </Link>
                </p>
                <p onClick={() => this.closwDrawer()}>
                  <Link to="/archive">
                    <Icon
                      type="project"
                      onClick={() => this.showLoginModal()}
                    />
                    归档
                  </Link>
                </p>
                <p onClick={() => this.closwDrawer()}>
                  <Link to="/project">
                    <Icon
                      type="project"
                      onClick={() => this.showLoginModal()}
                    />
                    项目
                  </Link>
                </p>
                <p onClick={() => this.closwDrawer()}>
                  <Link to="/timeLine">
                    <Icon
                      type="hourglass"
                      onClick={() => this.showLoginModal()}
                    />
                    历程
                  </Link>
                </p>
                <p onClick={() => this.closwDrawer()}>
                  <Link to="/message">
                    <Icon
                      type="message"
                      onClick={() => this.showLoginModal()}
                    />
                    留言
                  </Link>
                </p>
                <p onClick={() => this.closwDrawer()}>
                  <Link to="/about">
                    <Icon type="user" onClick={() => this.showLoginModal()} />
                    关于
                  </Link>
                </p>

                {userInfo ? (
                  <div onClick={this.handleLogout}>
                    <p>{userInfo.name}</p>
                    <p>
                      <Icon type="logout" /> 退出
                    </p>
                  </div>
                ) : (
                  <div>
                    <p onClick={this.showLoginModal}>
                      <Icon type="login" /> 登录
                    </p>
                    <p onClick={this.showRegisterModal}>
                      <Icon type="logout" /> 注册
                    </p>
                  </div>
                )}
              </div>
            </Drawer>
          </>
        ) : (
          <Header className="pc-header">
            <Row className="container" type="flex" justify="center">
              <Col span={2} className="container-col">
                <div className="logo">
                  <img src={logo} alt="" />
                </div>
              </Col>
              <Col span={10} className="container-col">
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                  onClick={e => this.handleMenu(e)}
                  selectedKeys={[this.state.menuCurrent]}
                  style={{
                    lineHeight: "64px",
                    borderBottom: "none"
                  }}
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
              <Col span={3} className="container-col">
                {userInfo ? (
                  <Menu
                    onClick={this.handleLogout}
                    style={{
                      width: 220,
                      lineHeight: "64px",
                      display: "inline-block"
                    }}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                  >
                    <SubMenu
                      title={
                        <span className="submenu-title-wrapper">
                          <Avatar
                            onClick={() => this.showDrawer()}
                            size="large"
                            icon="user"
                            src={userInfo.avatar}
                            style={{ marginRight: 5 }}
                          />
                          {userInfo.name}
                        </span>
                      }
                    >
                      <MenuItemGroup>
                        <Menu.Item key="logout">退出</Menu.Item>
                      </MenuItemGroup>
                    </SubMenu>
                  </Menu>
                ) : (
                  <div>
                    <Button
                      type="primary"
                      icon="login"
                      className="login-btn"
                      onClick={() => this.showLoginModal()}
                    >
                      登 录
                    </Button>
                    <Button
                      type="danger"
                      icon="logout"
                      className="login-btn"
                      onClick={() => this.showRegisterModal()}
                    >
                      注 册
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </Header>
        )}
      </div>
    );
  }
}

const stateToProps = state => state.user;
const dispatchToProps = dispatch => ({ loginSuccess, loginFailure });

export default withRouter(
  connect(
    stateToProps,
    dispatchToProps
  )(Nav)
);
