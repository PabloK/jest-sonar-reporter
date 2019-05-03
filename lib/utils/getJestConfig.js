'use strict';

const fs = require('fs');
const path = require('path');


module.exports = function () {

  let jestSonarConfig = {};
  const file = getJestFilePath();
  if(fs.existsSync(file)){
    const config = require(path.resolve(file));
    if(config.testEnvironmentOptions
        && config.testEnvironmentOptions.sonarReporter
        && typeof config.testEnvironmentOptions.sonarReporter === 'object'){
        jestSonarConfig = config.testEnvironmentOptions.sonarReporter;
    }
  }
  return jestSonarConfig;
};

function getJestFilePath(){
    const args = process.argv;
    for(let i = 0; i< args.length; ++i){
        const arg = args[i];
        // TODO: fix so that --config=path also works.
        if (arg === '--config' && args[i+1] !== undefined){
            return args[i+1];
        }
    }

    return '';
}