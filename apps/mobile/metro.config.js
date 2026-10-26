const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const config = getDefaultConfig(__dirname);
// Fix RN 0.86 VirtualViewExperimental bug - codegen onModeChange
// On mock le composant expérimental cassé par un module vide
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.includes('VirtualViewExperimentalNativeComponent')) {
    return {
      type: 'sourceFile',
      filePath: path.join(__dirname, 'empty-mock.js'),
    };
  }
  // @ts-ignore
  return context.resolveRequest(context, moduleName, platform);
};
module.exports = config;
