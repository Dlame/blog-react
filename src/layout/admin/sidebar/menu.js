const menu = [
  {
    path: '/admin',
    icon: 'home',
    name: '首页',
  },
  {
    path: '/admin/article',
    icon: 'switcher',
    name: '文章',
    children: [
      {
        path: '/admin/article/manager',
        icon: 'folder',
        name: '管理',
      },
      {
        path: '/admin/article/add',
        icon: 'edit',
        name: '新增',
      },
    ],
  },
  {
    path: '/admin/tag',
    icon: 'tags',
    name: '标签',
  },
  {
    path: '/admin/category',
    icon: 'book',
    name: '分类',
  },
  {
    path: '/admin/user',
    icon: 'user',
    name: '用户',
  },
];

export default menu;
