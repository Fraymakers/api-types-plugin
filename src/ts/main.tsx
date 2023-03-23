// Styles
import 'mini.css/dist/mini-dark.css';

// Other imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FrayToolsPluginCore from '@fraytools/plugin-core';
import FraymakersApiTypes from './FraymakersApiTypes';

// Informs FrayToolsPluginCore of the default config metadata for plugin when it first gets initialized
FrayToolsPluginCore.PLUGIN_CONFIG_METADATA_DEFAULTS = FraymakersApiTypes.getDefaultSettings();


FrayToolsPluginCore.migrationHandler = (configMetadata) => {
  // Compare configMetadata.version here with your latest manifest version and perform any necessary migrations for compatibility
};
FrayToolsPluginCore.setupHandler = (props) => {
  // Create a new container for the plugin
  var appContainer = document.createElement('div');
  appContainer.className = 'FraymakersApiTypesWrapper';
  document.body.appendChild(appContainer);

  // Load the component with its props into the document body
  ReactDOM.render(<FraymakersApiTypes {...props} />, appContainer);
};
