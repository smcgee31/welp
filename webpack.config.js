const webpack = require('webpack');
const fs      = require('fs');
const path    = require('path')
    , join    = path.join
    , resolve = path.resolve;

const getConfig = require('hjs-webpack');

// The following was original then we used variable names for the config - see below
// var config = getConfig({
//   in: join(__dirname, 'src/app.js'),
//   out: join(__dirname, 'dist'),
//   clearBeforeBuild: true
// });

const root    = resolve(__dirname)
    , src     = join(root, 'src')
    , modules = join(root, 'node_modules')
    , dest    = join(root, 'dist')
;

const NODE_ENV = process.env.NODE_ENV;
const isDev    = NODE_ENV === 'development';

var config = getConfig({
  in: join(src, 'app.js'),
  out: dest,
  clearBeforeBuild: true
});

config.postcss = [].concat([
    require('precss')({})
  , require('autoprefixer')({})
  , require('cssnano')({})
]);

const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;

const matchCssLoaders = /(^|!)(css-loader)($|!)/;
const findLoader = (loaders, match) => {
  const found = loaders.filter(l => l && l.loader && l.loader.match(match));
  return found ? found[0] : null;
};
const cssloader = findLoader(config.module.loaders, matchCssLoaders);

const newloader = Object.assign({}, cssloader, {
    test: /\.module\.css$/
  , include: [src]
  , loader: cssloader.loader
                     .replace(matchCssLoaders, `$1$2?modules&localIdentName=${cssModulesNames}$3`)
});
config.module.loaders.push(newloader);
cssloader.test = new RegExp(`[^module]${cssloader.test.source}`);
cssloader.loader = newloader.loader;



module.exports = config;
