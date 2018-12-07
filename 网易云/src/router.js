import React from 'react';
import { Router } from 'dva/router';
import config from './router/router';
import RouterView from './router/routerView';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div className='wraps'>
        <RouterView routes={config.routes}></RouterView>
      </div>
    </Router>
  );
}

export default RouterConfig;
