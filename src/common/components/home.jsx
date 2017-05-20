// @flow

import React from 'react';

function Home() {
  return (
    <div>
      <p>When this site was a blog I never wrote anything on it, so now it&apos;s just somewhere I&apos;m going to play with fun technology.</p>
      <p>To render its &lt;10 views, this stateless SPA so far uses:</p>
      <ul>
        <li>Isomorphic React/React-Router</li>
        <li>Webpack, in particular a really excellent plugin called <a href="https://github.com/markdalgleish/static-site-generator-webpack-plugin" rel="noopener noreferrer" target="_blank">static-site-generator</a> that allows me to serve this site statically/statelessly from Github Pages.</li>
        <li>Automatic loading/reading/parsing/inserting of Markdown files as posts</li>
        <li>Flow typing</li>
        <li>Travis CI, which rebuilds the static assets on git push</li>
        <li>Cloudflare, which does exciting CDN/TLS/DNSSEC/Caching things</li>
        <li>Others...</li>
      </ul>
      <p>The source is <a href="https://github.com/tomruttle/www.tomruttle.com" rel="noopener noreferrer" target="_blank">here</a> if you want to check it out.</p>
      <p>
        <a href="https://twitter.com/tomruttle" className="twitter-follow-button" data-show-count="false">Follow @tomruttle</a>
        &nbsp;
        <a href="https://github.com/tomruttle" className="github-button" aria-label="Follow @tomruttle on GitHub">Follow @tomruttle</a>
      </p>
    </div>
  );
}

export default Home;
