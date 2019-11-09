// css
import "./index.scss";
import "./mobile.scss";

// compontents
import React, { Component } from "react";
import { Layout, BackTop } from "antd";
import SliderRight from "../components/slider/slider";
import Nav from "../components/nav/nav";
import Index from "../components/home/index";

// functions
import { isMobileOrPc } from "../utils/utils";
// eslint-disable-next-line
const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let isShowSlider = false;
    let pathName = this.props.location.pathname;
    if (
      pathName !== "/articleDetail" &&
      pathName !== "/about" &&
      !isMobileOrPc()
    ) {
      isShowSlider = true;
    }

    let isIndexPage = false;
    if (pathName === "/") {
      isIndexPage = true;
    }
    return (
      <div className="Layouts">
        {!isIndexPage ? (
          <div>
            <Layout className="layout">
              <Nav pathname={this.props.location.pathname} />
              <Layout style={{ padding: "24px 0", background: "#fff" }}>
                <Content style={{ marginTop: "65px", minHeight: 280 }}>
                  {this.props.children}
                </Content>
                {isShowSlider && (
                  <Sider width={350} style={{ background: "#fff" }}>
                    <SliderRight />
                  </Sider>
                )}
              </Layout>
            </Layout>
            <Footer className="layout-footer">
              Daze'blog ©2019 Created by DazeZhang
            </Footer>
            <BackTop />
          </div>
        ) : (
          <Index />
        )}
      </div>
    );
  }
}

export default Layouts;
