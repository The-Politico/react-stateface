import React from 'react';
import classnames from 'classnames';
import us from 'us';

import * as states from './states';


const State = (props) => {
  const lookupStr = props.children || props.state;

  if(!lookupStr){
    return null;
  }

  const stateData = us.lookup(lookupStr);

  if(!stateData){
    return null;
  }

  const postal = stateData.abbr;
  if(!(postal in states)){
    return null;
  }
  
  const SVG = states[postal];

  return (
    <div className={classnames('react-stateface-container', `rsf-${postal}`)} >
      <SVG />
    </div>
  )
};

export default State;
