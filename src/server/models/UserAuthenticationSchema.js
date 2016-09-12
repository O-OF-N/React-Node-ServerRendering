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

const UserAuthenticationModel = mongoose.model('UserAuth',UserAuthenticationSchema);

UserAuthenticationModel.save = (userAuthentication) => co(saveHelper.bind(this,userAuthentication));


const saveHelper = function*(userAuthentication){
    const userAuthenticationToSave = new UserAuthenticationModel(userAuthentication);
    yield userAuthenticationToSave.save();
};

export default UserAuthenticationModel;


