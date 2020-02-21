const glob = require('glob-promise');
const find = require('lodash/find');
const parse5 = require('parse5');
const fs = require('fs-extra');
const path = require('path');
const templates = require('./template.js');

const svgDirectory = path.join(__dirname, '..', 'svg')
const destDirectory = path.join(__dirname, '..', 'src','components', 'State', 'states')

const fpToPostal = fp => {
  return fp.split(`${svgDirectory}/`)[1].split('.svg')[0];
}

const serialize = node => {
  return parse5.serialize({
    nodeName: 'div',
    tagName: 'div',
    attrs: [],
    childNodes: [node]
  });
}

const getAttribute = (node, name) => {
  const attr = find(node.attrs, {name});
  if(attr){
    return attr.value;
  }
}

const svgToJSX = rawSVG => {
  const parsed = parse5.parseFragment(rawSVG);
  const svg = parsed.childNodes[0];

  let output = '';

  output += `<svg xmlns="${getAttribute(svg, 'xmlns')}" viewBox="${getAttribute(svg, 'viewBox')}">`;

  svg.childNodes.forEach(node => {
    if(node.nodeName !== 'title'){
      output += serialize(node);
    }
  });

  output += `</svg>`;

  return templates.jsx(output);
}

const makeConfig = files => {
  return files.map(f => {
    const postal = fpToPostal(f);
    return `export { default as ${postal} } from './${postal}.jsx';`;
  }).join('\n');
}

const run = async () => {
  const files = await glob(path.join(svgDirectory, '*.svg'));

  files.forEach(async (file) => {
    const postal = fpToPostal(file);
    const svg = await fs.readFile(file, 'utf-8');
    const jsx = svgToJSX(svg);
    await fs.outputFile(path.join(destDirectory,`${postal}.jsx`), jsx, 'utf-8');
  })

  const config = makeConfig(files);
  await fs.outputFile(path.join(destDirectory, `index.js`), config, 'utf-8');
}

if (require.main === module) {
    run();
} else {
}
