import './article.scss';
import './marked.css';
import React, { Component } from 'react';

import { isMobileOrPc } from '../../utils/';
class Articles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMobile: isMobileOrPc(),
			isLoading: false,
			isSubmitLoading: false,
			list: [],
			content: '',
			type: 1, //文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
			articleDetail: {
				_id: '',
				author: '夜尽天明',
				category: [],
				comments: [],
				create_time: '',
				desc: '',
				id: 16,
				img_url: '',
				numbers: 0,
				keyword: [],
				like_users: [],
				meta: { views: 0, likes: 0, comments: 0 },
				origin: 0,
				state: 1,
				tags: [],
				title: '',
				update_time: ''
			},
			cacheTime: 0, // 缓存时间
			times: 0, // 评论次数
			likeTimes: 0 // 点赞次数
		};
	}

	render() {
		// let width = this.state.isMobile ? '100%' : '75%';
		// const list = this.state.articleDetail.tags.map((item, i) => (
		// 	<span key={item.id} className="tag">
		// 		{item.name}
		// 	</span>
		// ));
		return <div className="article"></div>;
	}
}

export default Articles;
