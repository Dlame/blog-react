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

const navTitles = new Map([
  ["/", { key: "0", title: "首页" }],
  ["/home", { key: "0", title: "首页" }],
  ["/articles", { key: "1", title: "文章" }],
  ["/hot", { key: "2", title: "热门" }],
  ["/timeLine", { key: "3", title: "历程" }],
  ["/message", { key: "4", title: "留言" }],
  ["/about", { key: "5", title: "关于我" }],
  ["/articleDetail", { key: "7", title: "文章详情" }],
  ["/project", { key: "8", title: "项目" }],
  ["/archive", { key: "9", title: "归档" }]
]);

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
      isLoading: false,
      drawers: [
        { path: "/", icon: "home", title: "首页" },
        { path: "/articles", icon: "ordered-list", title: "文章" },
        { path: "/hot", icon: "fire", title: "热门" },
        { path: "/archive", icon: "project", title: "归档" },
        { path: "/project", icon: "project", title: "项目" },
        { path: "/timeLine", icon: "firehourglass", title: "历程" },
        { path: "/message", icon: "message", title: "留言" },
        { path: "/about", icon: "user", title: "关于" }
      ],
      menus: [
        { key: "0", path: "/", icon: "home", title: "首页" },
        { key: "1", path: "/articles", icon: "ordered-list", title: "文章" },
        { key: "2", path: "/hot", icon: "fire", title: "热门" },
        { key: "9", path: "/archive", icon: "project", title: "归档" },
        { key: "8", path: "/project", icon: "database", title: "项目" },
        { key: "3", path: "/timeLine", icon: "hourglass", title: "历程" },
        { key: "4", path: "/message", icon: "message", title: "留言" },
        { key: "5", path: "/about", icon: "user", title: "关于" }
      ]
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
    let navTitle = navTitles.get(pathname);
    console.log(navTitle, pathname);
    this.setState({
      navTitle: navTitle.title,
      menuCurrent: navTitle.key
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
                {this.state.drawers.map(drawer => {
                  return (
                    <p onClick={() => this.closwDrawer()}>
                      <Link to={drawer.path}>
                        <Icon type={drawer.icon} /> {drawer.title}
                      </Link>
                    </p>
                  );
                })}
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
              <Col span={1} className="container-col">
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
                  {this.state.menus.map(menu => {
                    return (
                      <Menu.Item key={menu.key}>
                        <Link to={menu.path}>
                          <Icon type={menu.icon} theme="outlined" />
                          {menu.title}
                        </Link>
                      </Menu.Item>
                    );
                  })}
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
