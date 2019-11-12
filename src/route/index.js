import React from "react";
import Loadable from "react-loadable";

const loadingComponent = ({ error, pastDelay }) => {
  if (error) {
    return <div>Error!</div>;
  } else if (pastDelay) {
    return <div></div>;
  } else {
    return null;
  }
};

let config = [
  {
    name: "/",
    path: "/",
    exact: true,
    component: Loadable({
      loader: () => import("../components/home/index.js"),
      loading: loadingComponent,
      delay: 300
    })
  },
  {
    name: "articles",
    path: "/articles",
    exact: true,
    component: Loadable({
      loader: () => import("../components/articles/articles"),
      loading: loadingComponent,
      delay: 300
    })
  },
  {
    name: "archive",
    path: "/archive",
    exact: true,
    component: Loadable({
      loader: () => import("../components/archive/archive"),
      loading: loadingComponent,
      delay: 300
    })
  }
];

export default config;
