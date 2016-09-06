"use strict";
import axios from 'axios';
import * as Constants from '../util/constants';

export const serverCall = ()=>axios.get(Constants.OBSERVATIONS_FETCH_URL, {headers: Constants.AUTHORIZATION_HEADER});
