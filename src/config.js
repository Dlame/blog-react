import React from 'react';
import { Icon } from 'antd';
import Href from './components/Href';

export const API_BASE_URL = 'http://localhost:8000';

/**
 * github config
 */
export const GITHUB = {
  enable: true, // github 第三方授权开关
  client_id: 'c6a96a84105bb0be1fe5', // Setting > Developer setting > OAuth applications => client_id
  url: 'https://github.com/login/oauth/authorize', // 跳转的登录的地址
};

// project config
export const HEADER_BLOG_NAME = 'Daze的博客'; // header title 显示的名字

// === sidebar
export const SIDEBAR = {
  avatar: require('./assets/images/avatar.png'), // 侧边栏头像
  title: 'Daze', // 标题
  subTitle: '一个喜欢渡边的麻友的程序员', // 子标题
  // 个人主页
  homepages: {
    github: {
      link: 'https://github.com/Dlame',
      icon: <Icon type="github" theme="filled" className="homepage-icon" />,
    },
  },
};

// === discuss avatar
export const DISCUSS_AVATAR = SIDEBAR.avatar; // 评论框博主头像

// 公告 announcement
export const ANNOUNCEMENT = {
  enable: false, // 是否开启
  content: (
    <>
      由于服务器期限将至 / ssl 证书过期 / 域名过期，请访问
      <Href href="http://47.112.48.225:4002/">最新的博客地址</Href>
    </>
  ),
};
