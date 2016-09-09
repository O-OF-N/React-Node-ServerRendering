"use strict";
import axios from 'axios';
import * as Constants from '../util/constants';

export const serverCall = () => axios.get(Constants.OBSERVATIONS_FETCH_URL, { headers: Constants.AUTHORIZATION_HEADER });
export const callUrlWithoutHeader = (url) => axios.get(url,{});
export const callUrl = (url) => axios.get(url, { headers: Constants.AUTHORIZATION_HEADER });

