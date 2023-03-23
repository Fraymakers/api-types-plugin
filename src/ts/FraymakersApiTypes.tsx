// Imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as _ from 'lodash';
import './FraymakersApiTypes.scss';
import BaseTypeDefinitionPlugin, { ITypeDefinitionPluginProps, ITypeDefinitionPluginState } from '@fraytools/plugin-core/lib/base/BaseTypeDefinitionPlugin';
import FrayToolsPluginCore from '@fraytools/plugin-core';
import { IManifestJson } from '@fraytools/plugin-core/lib/types';
import { IApiClassTypes, IFraymakersApiTypesConfig, IFraymakersAssetMetadata } from './types';

declare var MANIFEST_JSON:IManifestJson;

/**
 * Helper struct for determining what additional typedef contents need to be generated
 */
 const API_CLASS_TYPES:IApiClassTypes[] = [
  { type: 'CHARACTER', className: 'Character', selfVar: true, matchVar: true, cameraVar: true, stageVar: true },
  { type: 'STAGE', className: 'Stage', selfVar: true, matchVar: true, cameraVar: true, stageVar: false },
  { type: 'CUSTOM_GAME_OBJECT', className: 'CustomGameObject', selfVar: true, matchVar: true, cameraVar: true, stageVar: true },
  { type: 'ASSIST', className: 'Assist', selfVar: true, matchVar: true, cameraVar: true, stageVar: true },
  { type: 'PROJECTILE', className: 'Projectile', selfVar: true, matchVar: true, cameraVar: true, stageVar: true },
  // { type: 'ITEM', className: 'Item', selfVar: true, matchVar: true, cameraVar: true, stageVar: true },
  { type: 'COLLISION_AREA', className: 'CollisionArea', selfVar: true, matchVar: true, cameraVar: true, stageVar: true },
  { type: 'RECT_COLLISION_AREA', className: 'RectCollisionArea', selfVar: true, matchVar: true, cameraVar: true, stageVar: true },
  { type: 'RECT_STRUCTURE', className: 'RectStructure', selfVar: true, matchVar: true, cameraVar: true, stageVar: true },
  { type: 'LINE_SEGMENT_STRUCTURE', className: 'LineSegmentStructure', selfVar: true, matchVar: true, cameraVar: true, stageVar: true },
  { type: 'MATCH_RULES', className: 'MatchRules', selfVar: true, matchVar: true, cameraVar: true, stageVar: true }
];

interface IFraymakersApiTypesProps extends ITypeDefinitionPluginProps {
  configMetadata:IFraymakersApiTypesConfig;
  assetMetadata:IFraymakersAssetMetadata;
}
interface IFraymakersApiTypesState extends ITypeDefinitionPluginState {
}

/**
 * Settings editor for Fraymakers Api Types plugin.
 */
export default class FraymakersApiTypes extends BaseTypeDefinitionPlugin<IFraymakersApiTypesProps, IFraymakersApiTypesState> {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  
  public static getDefaultSettings():IFraymakersApiTypesConfig {
    return {
      version: MANIFEST_JSON.version,
      frameScriptEnabled: true,
      scriptAssetEnabled: true,
      extensions: ['hx'],
      languages: ['hscript']
    };
  }

  /**
   * Force this component to re-render when parent window sends new props
   */
  onPropsUpdated(props) {
    ReactDOM.render(<FraymakersApiTypes {...props} />, document.querySelector('.FraymakersApiTypesWrapper'));
  }
  
  /**
   * This function will be called automatically when a the parent requests the types.
   */
   onTypeDefinitionRequest() {
    let types:{filename:string; contents:string}[] = [];

    let hasIgnoredExtension = false;
    // See if this is a script asset file with an ignored extension
    if (this.props.filename && this.props.configMetadata.extensions.length > 0) {
      hasIgnoredExtension = true;
      // Must have at least one file extension pass the test
      _.each(this.props.configMetadata.extensions, (ext) => {
        if (new RegExp('\\.' + ext + '$', 'g').test(this.props.filename)) {
          hasIgnoredExtension = false;
        }
      });
    }

    let hasIgnoredLanguage = false;
    // See if this an ignored language
    if (this.props.language && this.props.configMetadata.languages.length > 0 && this.props.configMetadata.languages.indexOf(this.props.language) < 0) {
      hasIgnoredLanguage = true;
    }

    // Check settings before adding typedef
    if (!(!this.props.filename && !this.props.configMetadata.frameScriptEnabled) && !(this.props.filename && !this.props.configMetadata.scriptAssetEnabled) && !hasIgnoredExtension && !hasIgnoredLanguage) {
      let apiTypedefs:string = require('!raw-loader!./typedefs/fraymakers-api.d.ts').default;
      let foundPattern:IApiClassTypes = null;

      // Add global var for self if necessary, depending on specified asset type
      for (let i = 0; i < API_CLASS_TYPES.length && !foundPattern; i++) {
        let metadataPluginData = this.props.assetMetadata.pluginMetadata['com.fraymakers.FraymakersMetadata'];
        // See if metadata plugin type matches one of our defined api classes
        if (metadataPluginData && metadataPluginData.objectType === API_CLASS_TYPES[i].type) {
          foundPattern = API_CLASS_TYPES[i];
        }
      }

      if (!foundPattern && this.props.filename && /script\.hx/gi.test(this.props.filename)) {
        // Assume it's some type of Entity
        foundPattern = { type: 'ENTITY', className: 'Entity', selfVar: true, matchVar: true, cameraVar: true, stageVar: true };
      }

      if (foundPattern) {
        if (foundPattern.selfVar) {
          apiTypedefs += `\ndeclare var self:${foundPattern.className};`;
        }
        if (foundPattern.matchVar) {
          apiTypedefs += `\ndeclare var match:Match;`;
        }
        if (foundPattern.cameraVar) {
          apiTypedefs += `\ndeclare var camera:Camera;`;
        }
        if (foundPattern.stageVar) {
          apiTypedefs += `\ndeclare var stage:Stage;`;
        }

        switch (foundPattern.type) {
          case 'CHARACTER':
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-entity-api-globals.d.ts').default}`;
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-character-api-globals.d.ts').default}`;
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-common-api-globals.d.ts').default}`;
            break;
          case 'PROJECTILE':
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-entity-api-globals.d.ts').default}`;
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-projectile-api-globals.d.ts').default}`;
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-common-api-globals.d.ts').default}`;
            break;
          case 'CUSTOM_GAME_OBJECT':
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-entity-api-globals.d.ts').default}`;
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-game-object-api-globals.d.ts').default}`;
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-common-api-globals.d.ts').default}`;
            break;
          case 'ASSIST':
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-entity-api-globals.d.ts').default}`;
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-assist-api-globals.d.ts').default}`;
            apiTypedefs += `\n${require('!raw-loader!./typedefs/fraymakers-common-api-globals.d.ts').default}`;
            break;
        }
      }

      types.push({
        contents: apiTypedefs,
        filename: 'global.d.ts'
      });
    }

    FrayToolsPluginCore.sendTypeDefinitions(types);
  }
  private toggleFrameScripts(event:React.ChangeEvent<HTMLInputElement>) {
    // Only work with copies of the original data for safety
    let dataCopy = _.cloneDeep(this.props.configMetadata);
    dataCopy.frameScriptEnabled = event.target.checked;

    // Tell parent to sync
    FrayToolsPluginCore.configMetadataSync(dataCopy);
  }
  private toggleScriptAssets(event:React.ChangeEvent<HTMLInputElement>) {
    // Only work with copies of the original data for safety
    let dataCopy = _.cloneDeep(this.props.configMetadata);
    dataCopy.scriptAssetEnabled = event.target.checked;

    // Tell parent to sync
    FrayToolsPluginCore.configMetadataSync(dataCopy);
  }

  public render() {
    if (!this.props.configMode) {
      // No implementation for non-config mode
      return (
        <div className="FraymakersApiTypes">
        </div>
      );
    }

    return (
      <div className="FraymakersApiTypes container" style={{ textAlign: 'center' }}>
        <h2>Fraymakers Api Types v{MANIFEST_JSON.version}</h2>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <input type="checkbox" onChange={this.toggleFrameScripts.bind(this)} checked={this.props.configMetadata.frameScriptEnabled}/>
            <label>Enabled for Frame Scripts</label>
          </div>
          <div className="col-sm-3"></div>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <input type="checkbox" onChange={this.toggleScriptAssets.bind(this)} checked={this.props.configMetadata.scriptAssetEnabled}/>
            <label>Enabled for Script Assets</label>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    );
  }
}