import {UserAuthentication} from './models';
import mongoose from 'mongoose';
import co from 'co';

var Schema = mongoose.Schema;

const UserAuthenticationSchema = new Schema({
    state: String,
    iss: String,
    authorizationCode: String,
    accessToken: String,
    authorizationURL: String,
    tokenURL: String,
    patient: Number
});

const UserAuthenticationModel = mongoose.model('UserAuth', UserAuthenticationSchema);

UserAuthenticationModel.save = (userAuthentication) => co(saveHelper.bind(this, userAuthentication));

UserAuthenticationModel.find = (state) => co(findByState.bind(this, state));

const findByState = function* (state) {
    const userAuth = yield UserAuthenticationModel.find({ state });
    return userAuth;
}

const saveHelper = function* (userAuthentication) {
    const userAuthenticationToSave = new UserAuthenticationModel(userAuthentication.toJS());
    const userAuth = yield userAuthenticationToSave.save();
    return userAuth;
};

export default UserAuthenticationModel;


