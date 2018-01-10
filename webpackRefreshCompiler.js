/**
 * Copyright (c) 2018-present, Shameem.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
const chokidar = require('chokidar');
const lodash = require('lodash');
const fs = require('fs-extra');
const execSync = require('child_process').execSync;
const terminalNotifier = require('terminal-notifier');
let _initialized = false;
let _initialScanDone = false;

function webpackRefreshCompiler(opts) {
  if (_initialized) {
    return;
  }
  _initialized = true;
  const { devServer, fileCacheRemover } = opts;
  let { watchDir } = opts;
  let fileWatcher;
  if (!watchDir && fs.existsSync('./src')) {
    watchDir = './src';
  }
  let isDotBabelRCFile = true;
  if (!fs.existsSync('./.babelrc')) {
    isDotBabelRCFile = false;
  }

  let isDotBabelRCJsFile = false;
  if (fs.existsSync('./.babelrc.js')) {
    isDotBabelRCJsFile = true;
  }

  if (!(isDotBabelRCFile || isDotBabelRCJsFile)) {
    return false;
  }
  function watcher(filePath, event) {
    if (!_initialScanDone) {
      return;
    }
    clearTimeout(fileWatcher);
    let babelrc;
    if (isDotBabelRCFile) {
      babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
    } else if (isDotBabelRCJsFile) {
      babelrc = require('./.babelrc.js');
    }
    const plugin = babelrc.plugins.find((arr) => {
      if (arr[0] === 'variable-path-resolver') {
        return true;
      }
      return false;
    });
    if (!plugin) {
      return false;
    }
    const config = plugin[1];
    if (
      !config ||
      !config.vars ||
      !config.envName ||
      !process.env[config.envName]
    ) {
      return false;
    }
    const currentSite = process.env[config.envName];
    const values = Object.values(config.vars[currentSite]);
    if (!values.length) {
      return false;
    }
    const filePathParts = filePath.split('/');
    if (!lodash.intersection(filePathParts, values).length) {
      return false;
    }
    fileWatcher = setTimeout(() => {
      if (typeof fileCacheRemover === 'function') {
        fileCacheRemover();
      } else {
        fs.emptyDirSync('./node_modules/.cache');
      }
      terminalNotifier('Re-compiling, please wait...', {
        title: 'React Sphere',
      });
      devServer.invalidate();
    }, 1000);
  }
  function initialScan() {
    _initialScanDone = true;
  }
  if (!_initialScanDone) {
    chokidar
      .watch(watchDir.trim(), { ignored: /(^|[\/\\])\../ })
      .on('addDir', watcher)
      .on('unlinkDir', watcher)
      .on('unlink', watcher)
      .on('addFile', watcher)
      .on('ready', initialScan);
  }
  
}

module.exports = webpackRefreshCompiler;
