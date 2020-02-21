function templatize(strings, ...keys) {
    return ((...values) => {
        let dict = values[values.length - 1] || {};
        let result = [strings[0]];
        keys.forEach((key, i) => {
            let value;
            if(Number.isInteger(key)){
                value = values[key];
            }
            else{
                let keyLayers = key.split('.');
                value = dict;
                for(kL of keyLayers){
                    value = value[kL];
                }
            }
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    });
};


module.exports = {
  jsx: templatize`import React from 'react';

export default () => (
  ${0}
);
  `
}
