import "./archive.scss";

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Timeline, Icon, message } from "antd";
import dayjs from "dayjs";

// api
import { $getArticles } from "../../utils/api";

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: "", // 是否是热门文章
      state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
      article: 1,
      keyword: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      list: []
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch() {
    let params = {
      keyword: this.state.keyword,
      likes: this.state.likes,
      state: this.state.state,
      tag_id: this.state.tag_id,
      category_id: this.state.category_id,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    };
    $getArticles(params).then(res => {
      let num = this.state.pageNum;
      if (res.status === 200 && res.data.code === 0) {
        console.log(res.data.data.list);
        this.setState({
          list: this.state.list.concat(res.data.data.list),
          total: res.data.data.count,
          pageNum: ++num
        });
      } else {
        message.error(res.data.message);
      }
    });
  }

  render() {
    const list = this.state.list.map((item, i) => {
      console.log(item);
      return (
        <Timeline.Item
          key={i}
          color={"red"}
          dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
        >
          <h1>{item.year}</h1>
          {item.list &&
            item.list.map(ele => {
              return (
                <Timeline key={ele._id}>
                  <Timeline.Item>
                    <Link
                      className="title"
                      target="_blank"
                      to={`/articleDetail?article_id=${ele._id}`}
                    >
                      <h3>{ele.title}</h3>
                    </Link>
                    <p>
                      <span>
                        {ele.create_time
                          ? dayjs(ele.create_time).format("YYYY-MM-DD HH:mm:ss")
                          : ""}
                      </span>
                    </p>
                  </Timeline.Item>
                </Timeline>
              );
            })}
        </Timeline.Item>
      );
    });
    return (
      <div className="archive">
        <Timeline>{list}</Timeline>
      </div>
    );
  }
}

export default Archive;
