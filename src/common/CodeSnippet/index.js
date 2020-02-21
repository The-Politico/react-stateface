import React from 'react';
import Refractor from 'react-refractor';
import js from 'refractor/lang/javascript';

import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import 'prismjs/themes/prism-solarizedlight.css';
import { component } from './styles.scss';

Refractor.registerLanguage(js);

class CodeBlock extends React.Component {
  render() {
    const { value } = this.props;
    return (
      <div className={component}>
        <Refractor
          language={'js'}
          value={value}
        />
        <button
          className='copy'
          onClick={() => copy(this.props.value)}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
    );
  }
}

export default CodeBlock;
