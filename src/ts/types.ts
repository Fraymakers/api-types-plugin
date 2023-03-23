import { IPluginConfig } from '@fraytools/plugin-core/lib/types';
import { ILibraryAssetMetadata } from '@fraytools/plugin-core/lib/types/fraytools';

export interface IFraymakersApiTypesConfig extends IPluginConfig {
  frameScriptEnabled:boolean;
  scriptAssetEnabled:boolean;
  languages: string[];
  extensions: string[];
}

export type FraymakersObjectType = 'NONE'|'ENTITY'|'CHARACTER'|'PROJECTILE'/*|'ITEM'*/|'ASSIST'|'CUSTOM_GAME_OBJECT'|'STAGE'|'COLLISION_AREA'|'RECT_COLLISION_AREA'|'RECT_STRUCTURE'|'LINE_SEGMENT_STRUCTURE'|'MATCH_RULES';


export interface IFraymakersAssetMetadata extends ILibraryAssetMetadata {
  pluginMetadata:{
    [key:string]:any,
    'com.fraymakers.FraymakersMetadata': {
      objectType?:FraymakersObjectType;
    }
  }
}

export interface IApiClassTypes {
  type:FraymakersObjectType;
  className:string;
  selfVar:boolean;
  matchVar:boolean;
  cameraVar:boolean;
  stageVar:boolean;
}
