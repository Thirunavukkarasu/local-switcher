import React from 'react';

import ReactDOM from 'react-dom/client';

import ContentScriptApp from './content-app';
import './index.css';

const root = document.createElement('div');
root.id = 'content_root';
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ContentScriptApp />
  </React.StrictMode>,
);