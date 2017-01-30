'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorRoot = function (_Error) {
    _inherits(ErrorRoot, _Error);

    function ErrorRoot(message, name) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        _classCallCheck(this, ErrorRoot);

        var _this = _possibleConstructorReturn(this, (ErrorRoot.__proto__ || Object.getPrototypeOf(ErrorRoot)).call(this, message));

        _this.name = name;
        _this.message = message;
        _this.params = params;
        Error.captureStackTrace(_this, _this.constructor.name);
        return _this;
    }

    return ErrorRoot;
}(Error);

;

var InvalidStateError = exports.InvalidStateError = function (_ErrorRoot) {
    _inherits(InvalidStateError, _ErrorRoot);

    function InvalidStateError(message) {
        _classCallCheck(this, InvalidStateError);

        return _possibleConstructorReturn(this, (InvalidStateError.__proto__ || Object.getPrototypeOf(InvalidStateError)).call(this, message, 'InvalidStateError'));
    }

    return InvalidStateError;
}(ErrorRoot);

;

var AuthenticationError = exports.AuthenticationError = function (_ErrorRoot2) {
    _inherits(AuthenticationError, _ErrorRoot2);

    function AuthenticationError(message, params) {
        _classCallCheck(this, AuthenticationError);

        return _possibleConstructorReturn(this, (AuthenticationError.__proto__ || Object.getPrototypeOf(AuthenticationError)).call(this, message, 'AuthenticationError', params));
    }

    return AuthenticationError;
}(ErrorRoot);

;

var MedicationFetchError = exports.MedicationFetchError = function (_ErrorRoot3) {
    _inherits(MedicationFetchError, _ErrorRoot3);

    function MedicationFetchError(message, params) {
        _classCallCheck(this, MedicationFetchError);

        return _possibleConstructorReturn(this, (MedicationFetchError.__proto__ || Object.getPrototypeOf(MedicationFetchError)).call(this, message, 'MedicationFetchError'));
    }

    return MedicationFetchError;
}(ErrorRoot);

;

var ObservationFetchError = exports.ObservationFetchError = function (_ErrorRoot4) {
    _inherits(ObservationFetchError, _ErrorRoot4);

    function ObservationFetchError(message, params) {
        _classCallCheck(this, ObservationFetchError);

        return _possibleConstructorReturn(this, (ObservationFetchError.__proto__ || Object.getPrototypeOf(ObservationFetchError)).call(this, message, 'ObservationFetchError'));
    }

    return ObservationFetchError;
}(ErrorRoot);

;
//# sourceMappingURL=exceptions.js.map