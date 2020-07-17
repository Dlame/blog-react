import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './index.less';

import { $axios } from '@/utils/interceptor';

import { Button, Input, Modal, BackTop, message, Form, Select, Row, Col } from 'antd';
import SimpleMDE from 'simplemde';
import marked from 'marked';
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css';

import useBreadcrumb from '@/hooks/useBreadcrumb';
import useMount from '@/hooks/useMount';

function Edit(props) {
  const store = useSelector((state) => ({
    tagList: state.article.tagList,
    categoryList: state.article.categoryList,
    authorId: state.user.userId,
  }));

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tagList, setTagList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [tagSelectedList, setTagSelectedList] = useState([]);
  const [cateSelectedList, setCateSelectedList] = useState([]);
  const [smde, setSmde] = useState({});

  const editId = parseInt(props.match.params.id);

  useBreadcrumb([
    { link: '/admin/article/manager', name: '文章管理' },
    editId ? '编辑文章' : '新建文章',
  ]);

  useEffect(() => {
    editId && fetchArticle(editId);
  }, [props.match.params]);

  useEffect(() => {
    if (editId) {
      const tags = store.tagList.map((d) => d.name).slice(0, 10);
      const cates = store.categoryList.map((d) => d.name).slice(0, 10);
      setTagList(tags);
      setCategoryList(cates);
      tags[0] && setTagSelectedList([tags[0]]);
      cates[0] && setCateSelectedList([cates[0]]);
    }
  }, [store.tagList, store.categoryList]);

  useMount(() => {
    let smde = new SimpleMDE({
      element: document.getElementById('mdEditor').childElementCount,
      autofocus: true,
      autosave: true,
      previewRender(plainText) {
        return marked(plainText, {
          renderer: new marked.Renderer(),
          gfm: true,
          pedantic: false,
          sanitize: false,
          tables: true,
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight(code) {
            return highlight.highlightAuto(code).value;
          },
        });
      },
    });
    setSmde(smde);
  });

  function fetchArticle(id) {
    $axios.get(`/article/${id}?type=0`).then((res) => {
      setTitle(res.title);
      setContent(res.content);
      const tags = res.tags.map((d) => d.name);
      const categories = res.categories.map((d) => d.name);
      setTagList(tags);
      setCategoryList(categories);
      setTagSelectedList(tags);
      setCateSelectedList(categories);
    });
  }

  function add() {
    if (!title) return message.warning('标题不能为空！');
    $axios
      .post('/article', {
        title,
        content,
        tags: tagSelectedList,
        categories: cateSelectedList,
      })
      .then((res) => {
        Modal.confirm({
          title: '文章创建成功！是否立即查看？',
          onOk: () => props.history.push(`/article/${res.id}`),
        });
      });
  }

  function update() {
    $axios
      .put(`/article/${editId}`, {
        title,
        content,
        tags: tagSelectedList,
        categories: cateSelectedList,
      })
      .then(() => {
        message.success('更新成功');
      });
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const { getFieldDecorator } = props.form;

  const children = [];
  const categoryChildren = [];
  for (let i = 0; i < tagList.length; i++) {
    const e = tagList[i];
    children.push(
      <Select.Option key={e._id} value={e._id}>
        {e.name}
      </Select.Option>
    );
  }
  for (let i = 0; i < categoryList.length; i++) {
    const e = categoryList[i];
    categoryChildren.push(
      <Select.Option key={e._id} value={e._id}>
        {e.name}
      </Select.Option>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  return (
    <div className="admin-edit-article">
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label={<span>标题&nbsp;</span>}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请填入标题！', whitespace: true }],
          })(<Input className="form-input" />)}
        </Form.Item>
        <Form.Item label={<span>作者&nbsp;</span>}>
          {getFieldDecorator('author', {
            rules: [{ required: true, message: '请填入作者！', whitespace: true }],
          })(<Input className="form-input" />)}
        </Form.Item>
        <Form.Item label={<span>关键字&nbsp;</span>}>
          {getFieldDecorator('keyword', {
            rules: [{ required: true, message: '请填入关键字！', whitespace: true }],
          })(<Input className="form-input" />)}
        </Form.Item>
        <Form.Item label={<span>描述&nbsp;</span>}>
          {getFieldDecorator('desc', {
            rules: [{ required: true, message: '请填入描述！', whitespace: true }],
          })(<Input className="form-input" />)}
        </Form.Item>
        <Form.Item label={<span>封面链接&nbsp;</span>}>
          {getFieldDecorator('img_url', {
            rules: [{ required: true, message: '请填入封面链接！', whitespace: true }],
          })(<Input className="form-input" />)}
        </Form.Item>
        <Form.Item label={<span>发布状态&nbsp;</span>}>
          {getFieldDecorator('state', {
            initialValue: '1',
            rules: [{ required: true, message: '选择发布状态', whitespace: true }],
          })(
            <Select className="form-select" placeholder="选择发布状态">
              {/*  0 草稿，1 发布 */}
              <Select.Option value="0">草稿</Select.Option>
              <Select.Option value="1">发布</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label={<span>文章类型&nbsp;</span>}>
          {getFieldDecorator('type', {
            initialValue: '2',
            rules: [{ required: true, message: '选择文章类型', whitespace: true }],
          })(
            <Select className="form-select" placeholder="选择文章类型">
              {/* 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍 */}
              <Select.Option value="1">普通文章</Select.Option>
              <Select.Option value="2">简历</Select.Option>
              <Select.Option value="3">管理员介绍</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label={<span>文章状态&nbsp;</span>}>
          {getFieldDecorator('origin', {
            initialValue: '2',
            rules: [{ required: true, message: '选择文章转载状态', whitespace: true }],
          })(
            <Select className="form-select" placeholder="选择文章转载状态">
              {/* 0 原创，1 转载，2 混合 */}
              <Select.Option value="0">原创</Select.Option>
              <Select.Option value="1">转载</Select.Option>
              <Select.Option value="2">混合</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label={<span>标签&nbsp;</span>}>
          {getFieldDecorator('tags')(
            <Select allowClear mode="multiple" placeholder="标签" className="form-select">
              {children}
            </Select>
          )}
        </Form.Item>
        <Form.Item label={<span>文章分类&nbsp;</span>}>
          {getFieldDecorator('tags')(
            <Select allowClear mode="multiple" placeholder="文章分类" className="form-select">
              {categoryChildren}
            </Select>
          )}
        </Form.Item>
        <Form.Item label={<span>文章内容&nbsp;</span>}>
          {getFieldDecorator('content')(
            <div title="添加与修改文章" style={{ width: '1200px' }}>
              <textarea
                id="mdEditor"
                style={{ marginBottom: 20, width: 800 }}
                size="large"
                rows={6}
              />
            </div>
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
      {/* <Button
        type="primary"
        shape="circle"
        size="large"
        disabled={!title}
        className="action-icon"
        title={editId ? '更新' : '新增'}
        icon={editId ? 'sync' : 'plus'}
      /> */}
      <BackTop target={() => document.querySelector('.admin-content-wrap')} />
    </div>
  );
}

export default Form.create()(Edit);
