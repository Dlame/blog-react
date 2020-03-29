import React from 'react';
import { SIDEBAR, ANNOUNCEMENT } from '../../../config';
import { useSelector } from 'react-redux';

// components
import { Divider, Tag, Alert } from 'antd';
import { Link } from 'react-router-dom';
import Href from '../../../components/Href';

import useFetchList from '../../../hooks/useFetchList';

function SideBar(props) {
  const tagList = useSelector(state => state.article.tagList || []);
  const { dataList: articleList } = useFetchList({
    withLoading: false,
    requestUrl: '/article/list',
    queryParams: {
      order: 'viewCount DESC',
      page: 1,
      pageSize: 6,
    },
  });

  return (
    <div className="app-sidebar">
      <img src={SIDEBAR.avatar} className="sider-avatar" alt="" />
      <h2 className="title">{SIDEBAR.title}</h2>
      <h5 className="sub-title">{SIDEBAR.subTitle}</h5>
      <ul className="home-pages">
        {Object.entries(SIDEBAR.homepages).map(([linkName, item]) => (
          <li key={linkName}>
            {item.icon}
            <Href href={item.link}>{linkName}</Href>
          </li>
        ))}
      </ul>

      {ANNOUNCEMENT.enable && <Alert message={ANNOUNCEMENT.content} type="info" />}
      <ul className="article-list">
        {articleList.map(d => (
          <li key={d.id}>
            <Link to={`/article/${d.id}`}>{d.title}</Link>
          </li>
        ))}
      </ul>

      <Divider orientation="left">标签</Divider>
      <div className="tag-list">
        {tagList.map((tag, i) => (
          <Tag key={i} color={tag.color}>
            <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
          </Tag>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
