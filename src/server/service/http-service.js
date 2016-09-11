"use strict";
import axios from 'axios';
import * as Constants from '../util/constants';

export const get = (url, header) => axios.get(url, header.toJS());

export const post = (url, body, header) => axios.post(url, body.toJS());
