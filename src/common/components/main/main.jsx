// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { CSSTransitionGroup } from 'react-transition-group';
import Swipeable from 'react-swipeable';

import type { Posts } from '../../types';

import Home from '../content/home';
import Words from '../content/words';
import WordsMenu from '../sidebar/words-menu';
import NotFound from '../content/not-found';

import styles from './main.module.css';

function swiped(history) {
  return (e, deltaX, deltaY, isFlick) => {
    if (isFlick) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const horizontal = absX > absY;

      if (horizontal) {
        if (deltaX > 0) {
          history.push('/words/');
        } else {
          history.push('/');
        }
      }
    }
  };
}

function Main({ posts }: { posts: Posts }) {
  return (
    <div className={styles.main}>
      <section className={styles.content}>
        <div className={styles.container}>
          <Route
            render={({ location, history }) => (
              <Swipeable onSwiped={swiped(history)}>
                <CSSTransitionGroup
                  transitionName={styles}
                  transitionEnterTimeout={200}
                  transitionLeaveTimeout={100}
                >
                  <Switch location={location} key={location.key}>
                    <Route exact path="/" component={Home} />
                    <Route path="/words/:path?" render={() => <Words posts={posts} />} />
                    <Route component={NotFound} />
                  </Switch>
                </CSSTransitionGroup>
              </Swipeable>
            )}
          />
        </div>
      </section>

      <aside className={styles.sidebar}>
        <Switch>
          <Route path="/words/:path?" render={() => <WordsMenu posts={posts} />} />
        </Switch>
      </aside>
    </div>
  );
}

export default withStyles(styles)(Main);
