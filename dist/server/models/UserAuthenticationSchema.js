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

UserAuthenticationModel.find = function (state) {
    return (0, _co2.default)(findByState.bind(undefined, state));
};

var findByState = regeneratorRuntime.mark(function findByState(state) {
    var userAuth;
    return regeneratorRuntime.wrap(function findByState$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return UserAuthenticationModel.find({ state: state });

                case 2:
                    userAuth = _context.sent;
                    return _context.abrupt('return', userAuth);

                case 4:
                case 'end':
                    return _context.stop();
            }
        }
    }, findByState, this);
});

var saveHelper = regeneratorRuntime.mark(function saveHelper(userAuthentication) {
    var userAuthenticationToSave, userAuth;
    return regeneratorRuntime.wrap(function saveHelper$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    userAuthenticationToSave = new UserAuthenticationModel(userAuthentication.toJS());
                    _context2.next = 3;
                    return userAuthenticationToSave.save();

                case 3:
                    userAuth = _context2.sent;
                    return _context2.abrupt('return', userAuth);

                case 5:
                case 'end':
                    return _context2.stop();
            }
        }
    }, saveHelper, this);
});

exports.default = UserAuthenticationModel;
//# sourceMappingURL=UserAuthenticationSchema.js.map