// @flow
/* eslint-disable no-undef*/
/* eslint-disable no-unused-vars*/

import React from 'react';
import type {StyleObj} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

declare type ReactNode =
  | null
  | string
  | number
  | React.Element<*>
  | Array<string | number | React.Element<*>>;

type ImageSourceURI = {
  uri: string,
  width?: number,
  height?: number,
};

declare type ImageSource = number | ImageSourceURI | Array<ImageSourceURI>;

declare type StyleSheetTypes = StyleObj;

declare type Icon = {
  name: string,
  color?: string,
  size?: number,
  type?:
    | 'material-community'
    | 'simple-line-icon'
    | 'zocial'
    | 'font-awesome'
    | 'octicon'
    | 'ionicon'
    | 'foundation'
    | 'evilicon'
    | 'entypo',
  style?: StyleSheetTypes,
};

type ObjectOf<T> = {[key: string]: T};

declare type JSONData =
  | null
  | string
  | number
  | boolean
  | Array<JSONData>
  | ObjectOf<JSONData>;

type FetchJSON = (url: string, options: FetchOptions) => Promise<FetchReturn>;
type FetchReturn = ObjectOf<JSONData>;
type FetchOptions = {
  method?: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'HEAD' | 'OPTIONS',
  headers?: ObjectOf<string>,
  body?: string | FormData,
};
type Fetch = (url: string, options: FetchOptions) => Promise<Response>;

declare var __DEV__: boolean;
