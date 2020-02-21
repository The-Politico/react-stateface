import * as Components from '../index';
import keys from 'lodash/keys';
import React from 'react';
import ReactDOM from 'react-dom';

import classnames from 'classnames';
import styles from './styles.scss';

import Page from 'Common/Page';

class Docs extends React.Component {
  render() {
    return (
      <Page link='.' title='ReactStateFace'>
        <div className={classnames(styles.styles)}>
          <ul>
            {
              keys(Components).map(key =>
                <li><a href={`./${key}/`}>{key}</a></li>
              )
            }
          </ul>
        </div>
      </Page>
    );
  }
}

ReactDOM.render(<Docs />, document.getElementById('app'));
