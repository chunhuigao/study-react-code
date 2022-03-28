import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default function Index() {
  return <div>我是react</div>;
}

const root = document.getElementById('root');
// root.textContent = "webpackwqewq2"
ReactDOM.render(<Index />, root);
