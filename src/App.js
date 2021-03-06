import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// config
import routes from './routes';

import CommonComponent from '@/components/common';

function App(props) {
  // const role = useSelector(state => state.user.role);

  // 解构 route
  const renderRoutes = (routes, contextPath) => {
    const children = [];
    const renderRoute = (item, routeContextPath) => {
      // 根路径
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath;
      newContextPath = newContextPath.replace(/\/+/g, '/');
      // 非管理员
      // if (newContextPath.includes('admin') && role !== 1) {
      //   item = {
      //     ...item,
      //     component: () => <Redirect to="/" />,
      //     children: [],
      //   };
      // }

      if (item.component) {
        if (item.childRoutes) {
          const childRoutes = renderRoutes(item.childRoutes, newContextPath);
          children.push(
            <Route
              key={newContextPath}
              render={props => <item.component {...props}>{childRoutes}</item.component>}
              path={newContextPath}
            />
          );
          item.childRoutes.forEach(r => renderRoute(r, newContextPath));
        } else {
          children.push(
            <Route key={newContextPath} component={item.component} path={newContextPath} exact />
          );
        }
      }
    };
    routes.forEach(item => renderRoute(item, contextPath));

    return <Switch>{children}</Switch>;
  };
  const children = renderRoutes(routes, '/');
  return (
    <BrowserRouter>
      {children}
      <CommonComponent />
    </BrowserRouter>
  );
}

export default App;
