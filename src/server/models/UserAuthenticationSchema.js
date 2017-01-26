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
    patient: Number,
    launch: String,
    timestamps: true
});

const UserAuthenticationModel = mongoose.model('UserAuth', UserAuthenticationSchema);

UserAuthenticationModel.save = (userAuthentication) =>
    co(saveHelper.bind(this, userAuthentication));

UserAuthenticationModel.findByState = (state) => co(findByStateHelper.bind(this, state));

UserAuthenticationModel.update = (_id, $set) => co(updateHelper.bind(this, _id, $set));

const findByStateHelper = function* (state) {
    const userAuth = yield UserAuthenticationModel.find({ state });
    return userAuth;
}

const saveHelper = function* (userAuthentication) {
    const userAuthenticationToSave = new UserAuthenticationModel(userAuthentication.toJS());
    const userAuth = yield userAuthenticationToSave.save();
    return userAuth;
};

const updateHelper = function* (_id, $set) {
    const userAuth = yield UserAuthenticationModel.findByIdAndUpdate({ _id }, { $set });
    return userAuth;
}

export default UserAuthenticationModel;


