// @flow

import React, { PureComponent } from 'react';

import styles from './footer.module.css';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className={styles.footer}>
        <a href="https://twitter.com/tomruttle" className={styles['twitter-button']} target="_blank" rel="me noopener noreferrer">Twitter: @tomruttle</a>
        <a href="https://github.com/tomruttle" className={styles['github-button']} target="_blank" rel="me noopener noreferrer">Github: @tomruttle</a>
      </footer>
    );
  }
}
