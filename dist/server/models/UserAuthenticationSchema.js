'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('./models');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserAuthenticationSchema = new Schema({
    state: String,
    iss: String,
    authorizationCode: String,
    accessToken: String,
    authorizationURL: String,
    tokenURL: String,
    patient: Number
});

var UserAuthenticationModel = _mongoose2.default.model('UserAuth', UserAuthenticationSchema);

UserAuthenticationModel.save = function (userAuthentication) {
    return (0, _co2.default)(saveHelper.bind(undefined, userAuthentication));
};

var saveHelper = regeneratorRuntime.mark(function saveHelper(userAuthentication) {
    var userAuthenticationToSave;
    return regeneratorRuntime.wrap(function saveHelper$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    userAuthenticationToSave = new UserAuthenticationModel(userAuthentication);
                    _context.next = 3;
                    return userAuthenticationToSave.save();

                case 3:
                case 'end':
                    return _context.stop();
            }
        }
    }, saveHelper, this);
});

exports.default = UserAuthenticationModel;
//# sourceMappingURL=UserAuthenticationSchema.js.map