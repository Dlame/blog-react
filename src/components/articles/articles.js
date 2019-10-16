import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import bg from '../../assets/bg.jpg';

import dayjs from 'dayjs';
import { getQueryStringByName } from '../../utils/utils';

// actions
import { saveArticlesList } from '../../store/actions/articles';

class Articles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoadEnd: false,
			isLoading: false,
			keyword: '',
			likes: '', // 是否是热门文章
			state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
			tag_id: getQueryStringByName('tag_id'),
			tag_name: decodeURI(getQueryStringByName('tag_name')),
			category_id: getQueryStringByName('category_id'),
			pageNum: 1,
			pageSize: 10,
			articlesList: [],
			total: 0
		};
	}

	render() {
		const list = this.state.articlesList.map(item => (
			<ReactCSSTransitionGroup
				key={item._id}
				transitionName="example"
				transitionAppear={true}
				transitionAppearTimeout={1000}
				transitionEnterTimeout={1000}
				transitionLeaveTimeout={1000}
			>
				<li key={item._id} className="have-img">
					<a className="wrap-img" href="/" target="_blank">
						<img
							className="img-blur-done"
							data-src={item.img_url}
							data-has-lazy-src="false"
							src={bg}
							alt="文章封面"
						/>
					</a>
				</li>
				<Link className="content">
					<div className="title">{item.title}</div>
					<p className="abstract">{item.desc}</p>
					<div className="meta">
						<Icon type="eye" theme="outlined" /> {item.meta.views}
						<Icon type="message" theme="outlined" /> {item.meta.comments}
						<Icon type="heart" theme="outlined" /> {item.meta.likes}
						<span className="time">
							{item.create_time &&
								dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss')}
						</span>
					</div>
				</Link>
			</ReactCSSTransitionGroup>
		));
		return (
			<div className="left">
				{this.state.tag_id && (
					<h3 className="left-title">{this.state.tag_name} 相关的文章：</h3>
				)}
				<ul className="note-list" id="list">
					{list}
				</ul>
			</div>
		);
	}
}

export default connect(
	state => state.articles,
	{ saveArticlesList }
)(Articles);
