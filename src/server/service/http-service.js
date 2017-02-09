"use strict";
import axios from 'axios';
import * as Constants from '../util/constants';
import qs from 'querystring';


export const get = (url, header = null) => header ? axios.get(url, header.toJS()) : axios.get(url);

export const post = (url, body, header) => axios.post(url, qs.stringify(body.toJS()), header.toJS());

export const all = functions => axios.all(functions.map(fn => fn()));
