// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { APP_CONTAINER, APP_STATE_PROP } from '../common/constants';

import App from '../common/components/app';
import ClientWrapper from './components/client-wrapper';

// Until flowtypes are fixed to include render callback.
import render from './react-render';

import './require-assets';

import type { AppProps } from '../common/types';

const container = document.getElementById(APP_CONTAINER);

const props: AppProps = window[APP_STATE_PROP];

function logException(ex, context) {
  if (window.Raven) {
    window.Raven.captureException(ex, { extra: context });
  } else {
    console.error(ex); // eslint-disable-line no-console
  }
}

function setPageTitle(title) {
  document.title = title;
}

const app = (
  <BrowserRouter>
    <ClientWrapper children={<App {...props} setPageTitle={setPageTitle} />} />
  </BrowserRouter>
);

render(app, container, (err) => {
  if (err) { logException(err, { message: 'React render failed.' }); }

  if ('serviceWorker' in window.navigator) {
    window.addEventListener('load', () => {
      window.navigator.serviceWorker.register(`/sw.js?${props.buildHash}`)
        .catch((swErr) => logException(swErr, { message: 'Service worker registry failed.' }));
    });
  }
});
