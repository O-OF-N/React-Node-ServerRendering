'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('./models');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _mongoSanitize = require('mongo-sanitize');

var _mongoSanitize2 = _interopRequireDefault(_mongoSanitize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserAuthenticationSchema = new Schema({
    state: String,
    iss: String,
    authorizationCode: String,
    accessToken: String,
    authorizationURL: String,
    tokenURL: String,
    patient: Number,
    launch: String,
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }
});

var UserAuthenticationModel = _mongoose2.default.model('UserAuth', UserAuthenticationSchema);

UserAuthenticationModel.save = function (userAuthentication) {
    return (0, _co2.default)(saveHelper.bind(undefined, userAuthentication));
};

UserAuthenticationModel.findByState = function (state) {
    return (0, _co2.default)(findByStateHelper.bind(undefined, state));
};

UserAuthenticationModel.update = function (_id, $set) {
    return (0, _co2.default)(updateHelper.bind(undefined, _id, $set));
};

var findByStateHelper = regeneratorRuntime.mark(function findByStateHelper(state) {
    var userAuth;
    return regeneratorRuntime.wrap(function findByStateHelper$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    state = (0, _mongoSanitize2.default)(state);
                    _context.next = 3;
                    return UserAuthenticationModel.find({ state: state });

                case 3:
                    userAuth = _context.sent;
                    return _context.abrupt('return', userAuth);

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, findByStateHelper, this);
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

var updateHelper = regeneratorRuntime.mark(function updateHelper(_id, $set) {
    var userAuth;
    return regeneratorRuntime.wrap(function updateHelper$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _id = (0, _mongoSanitize2.default)(_id);
                    _context3.next = 3;
                    return UserAuthenticationModel.findByIdAndUpdate({ _id: _id }, { $set: $set });

                case 3:
                    userAuth = _context3.sent;
                    return _context3.abrupt('return', userAuth);

                case 5:
                case 'end':
                    return _context3.stop();
            }
        }
    }, updateHelper, this);
});

exports.default = UserAuthenticationModel;
//# sourceMappingURL=UserAuthenticationSchema.js.map