"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchMedications = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

var _immutable = require('immutable');

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

var _httpService = require('../service/http-service');

var _httpUtils = require('../util/http-utils');

var HttpUtil = _interopRequireWildcard(_httpUtils);

var _UserAuthenticationSchema = require('../models/UserAuthenticationSchema');

var _UserAuthenticationSchema2 = _interopRequireDefault(_UserAuthenticationSchema);

var _exceptions = require('../util/exceptions');

var Exceptions = _interopRequireWildcard(_exceptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//public functions
var fetchMedications = exports.fetchMedications = regeneratorRuntime.mark(function fetchMedications(state) {
    var result, insulinOrders;
    return regeneratorRuntime.wrap(function fetchMedications$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    return _context.delegateYield(fetchMedicationsHelper(state), 't0', 1);

                case 1:
                    result = _context.t0;
                    insulinOrders = buildInsulinOrdersResult(result);
                    //return insulinOrders ? categorizeOrders(insulinOrders) : null;

                    if (!insulinOrders) {
                        _context.next = 8;
                        break;
                    }

                    return _context.delegateYield(categorizeOrders(insulinOrders.push.apply(insulinOrders, _toConsumableArray(addTestMedications()))), 't2', 5);

                case 5:
                    _context.t1 = _context.t2;
                    _context.next = 9;
                    break;

                case 8:
                    _context.t1 = null;

                case 9:
                    return _context.abrupt('return', _context.t1);

                case 10:
                case 'end':
                    return _context.stop();
            }
        }
    }, fetchMedications, this);
});

//Private functions
var fetchMedicationsHelper = regeneratorRuntime.mark(function fetchMedicationsHelper(state) {
    var _ref, _ref2, userAuthenticationModel, url, authHeader, result;

    return regeneratorRuntime.wrap(function fetchMedicationsHelper$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return _UserAuthenticationSchema2.default.findByState(state);

                case 2:
                    _ref = _context2.sent;
                    _ref2 = _slicedToArray(_ref, 1);
                    userAuthenticationModel = _ref2[0];

                    if (userAuthenticationModel) {
                        _context2.next = 7;
                        break;
                    }

                    throw new Exceptions.InvalidStateError('State ' + state + ' is invalid');

                case 7:
                    url = userAuthenticationModel ? HttpUtil.buildMedicationURL(userAuthenticationModel.patient, userAuthenticationModel.iss) : null;
                    authHeader = userAuthenticationModel ? HttpUtil.buildAuthorizationHeader(userAuthenticationModel) : null;
                    _context2.prev = 9;

                    if (!(url && authHeader)) {
                        _context2.next = 16;
                        break;
                    }

                    _context2.next = 13;
                    return (0, _httpService.get)(url, authHeader);

                case 13:
                    _context2.t0 = _context2.sent;
                    _context2.next = 17;
                    break;

                case 16:
                    _context2.t0 = null;

                case 17:
                    result = _context2.t0;

                    if (!(result && HttpUtil.checkResponseStatus(result))) {
                        _context2.next = 22;
                        break;
                    }

                    return _context2.abrupt('return', result);

                case 22:
                    throw new Exceptions.AuthenticationError('Authentication failed', userAuthenticationModel);

                case 23:
                    _context2.next = 32;
                    break;

                case 25:
                    _context2.prev = 25;
                    _context2.t1 = _context2['catch'](9);

                    if (!(_context2.t1.response.status === 500)) {
                        _context2.next = 31;
                        break;
                    }

                    throw new Exceptions.MedicationFetchError('Cerner services may be down');

                case 31:
                    throw new Exceptions.MedicationFetchError(_context2.t1.message);

                case 32:
                case 'end':
                    return _context2.stop();
            }
        }
    }, fetchMedicationsHelper, this, [[9, 25]]);
});

var buildInsulinOrdersResult = function buildInsulinOrdersResult(json) {
    var insulinOrder = json.data && json.data.entry ? json.data.entry.map(function (entry) {
        var insulin = null;
        var status = void 0,
            prescriber = void 0,
            dateWritten = void 0,
            dosageInstruction = void 0,
            medicationReference = void 0,
            medicationCodeableConcept = void 0;
        if (entry && entry.resource) {
            var resource = entry.resource;
            status = resource.status;
            prescriber = resource.prescriber;
            dateWritten = resource.dateWritten;
            dosageInstruction = resource.dosageInstruction;
            medicationCodeableConcept = resource.medicationCodeableConcept;

            var medication = fetchMedicationFromResource(medicationCodeableConcept);
            insulin = medication ? new Records.InsulinOrder({
                status: status,
                date: dateWritten,
                dosage: dosageInstruction && dosageInstruction instanceof Array && dosageInstruction[0] ? dosageInstruction[0].text : null,
                medication: medication.name,
                administration: fetchMedicationAdministration(dosageInstruction),
                code: parseInt(medication.code),
                comments: dosageInstruction && dosageInstruction instanceof Array && dosageInstruction[0] ? dosageInstruction[0].additionalInstructions : null
            }) : null;
        };
        return insulin;
    }).filter(function (entry) {
        return entry ? true : false;
    }) : null;
    return (0, _immutable.List)(insulinOrder);
};

var fetchMedicationFromResource = function fetchMedicationFromResource(concept) {
    return concept ? {
        name: concept.text, code: concept.coding ? concept.coding.filter(function (codes) {
            return codes.system === Constants.RXNORM_URL;
        })[0].code : null
    } : null;
};

var fetchMedicationAdministration = function fetchMedicationAdministration(dosage) {
    return dosage && dosage instanceof Array && dosage[0] && dosage[0].route && dosage[0].route.coding && dosage[0].route.coding instanceof Array && dosage[0].route.coding[0] ? dosage[0].route.coding[0].code === Constants.SUBCUTANEOUS ? Constants.SUBCUTANEOUS_TEXT : Constants.INTRAVENOUS_TEXT : null;
};

var categorizeOrders = regeneratorRuntime.mark(function categorizeOrders(insulinOrders) {
    var medicationOrders, insulinOrdersWithIngredients;
    return regeneratorRuntime.wrap(function categorizeOrders$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    medicationOrders = [];
                    return _context3.delegateYield(getIngredients(insulinOrders), 't0', 2);

                case 2:
                    insulinOrdersWithIngredients = _context3.t0;

                    Constants.ORDER_CATEGORIZATION.forEach(function (value, key) {
                        var medicationOrder = new Records.MedicationOrder({
                            type: key, medications: new _immutable.List(insulinOrdersWithIngredients.filter(function (order) {
                                return checkIngredients(value.code, order.ingredients.codes).length && checkDosage(value, order);
                            }))
                        });
                        medicationOrders.push(medicationOrder);
                    });
                    return _context3.abrupt('return', medicationOrders);

                case 5:
                case 'end':
                    return _context3.stop();
            }
        }
    }, categorizeOrders, this);
});

var checkIngredients = function checkIngredients(valueCodes, orderCodes) {
    return valueCodes.filter(function (valueCode) {
        var vc = new _immutable.List(valueCode);
        return vc.size === orderCodes.size && vc.contains.apply(vc, _toConsumableArray(orderCodes));
    });
};

var checkDosage = function checkDosage(value, order) {
    return value.dosage && value.dosage === order.administration || !value.dosage;
};

var getIngredients = regeneratorRuntime.mark(function getIngredients(insulinOrders) {
    var _this = this;

    var _ret;

    return regeneratorRuntime.wrap(function getIngredients$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    _context5.prev = 0;
                    return _context5.delegateYield(regeneratorRuntime.mark(function _callee() {
                        var getFunctions, ingredients, processedIngredients;
                        return regeneratorRuntime.wrap(function _callee$(_context4) {
                            while (1) {
                                switch (_context4.prev = _context4.next) {
                                    case 0:
                                        getFunctions = insulinOrders.map(function (insulinOrder) {
                                            return fetchHttpGetFn.bind(null, insulinOrder.code);
                                        }).toJS();
                                        _context4.next = 3;
                                        return (0, _httpService.all)(getFunctions);

                                    case 3:
                                        ingredients = _context4.sent;
                                        processedIngredients = ingredients.map(function (ingredient) {
                                            return processIngredients(ingredient);
                                        });
                                        return _context4.abrupt('return', {
                                            v: insulinOrders.map(function (insulinOrder, index) {
                                                return insulinOrder.merge({ ingredients: processedIngredients[index] });
                                            })
                                        });

                                    case 6:
                                    case 'end':
                                        return _context4.stop();
                                }
                            }
                        }, _callee, _this);
                    })(), 't0', 2);

                case 2:
                    _ret = _context5.t0;

                    if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
                        _context5.next = 5;
                        break;
                    }

                    return _context5.abrupt('return', _ret.v);

                case 5:
                    _context5.next = 10;
                    break;

                case 7:
                    _context5.prev = 7;
                    _context5.t1 = _context5['catch'](0);
                    throw new Exceptions.MedicationFetchError(_context5.t1.message);

                case 10:
                case 'end':
                    return _context5.stop();
            }
        }
    }, getIngredients, this, [[0, 7]]);
});

var fetchHttpGetFn = function fetchHttpGetFn(code) {
    return (0, _httpService.get)('https://rxnav.nlm.nih.gov/REST/rxcui/' + code + '/related?tty=IN+SBDC');
};

var processIngredients = function processIngredients(rxNormData) {
    var ingredientsList = rxNormData.data.relatedGroup.conceptGroup.filter(function (group) {
        return group.tty === 'IN';
    });
    var sbdcList = rxNormData.data.relatedGroup.conceptGroup.filter(function (group) {
        return group.tty === 'SBDC';
    });
    var response = ingredientsList && sbdcList && ingredientsList instanceof Array && sbdcList instanceof Array && ingredientsList.length > 0 && sbdcList.length > 0 && ingredientsList[0] && sbdcList[0] && sbdcList[0].conceptProperties && sbdcList[0].conceptProperties instanceof Array && sbdcList[0].conceptProperties.length > 0 ? { ingredients: ingredientsList[0], sbdcName: sbdcList[0].conceptProperties[0].name } : null;
    var ingredients = response && response.ingredients && response.ingredients.conceptProperties ? response.ingredients.conceptProperties.map(function (conceptProperty) {
        var code = { code: parseInt(conceptProperty.rxcui), name: conceptProperty.name };
        return code;
    }) : null;
    return ingredients ? ingredients.length === 1 ? new Records.Ingredients({ codes: (0, _immutable.List)([ingredients[0].code]), name: ingredients[0].name }) : new Records.Ingredients({ codes: (0, _immutable.List)(ingredients.map(function (ingredient) {
            return ingredient.code;
        })), name: response.sbdcName }) : null;
};

var addTestMedications = function addTestMedications() {
    var bolus1 = new Records.InsulinOrder({
        status: 'active',
        date: new Date(),
        dosage: '10 unit(s), Subcutaneous, BID',
        medication: 'Regular Insulin, Human 100 UNT/ML [HumuLIN R]',
        administration: Constants.SUBCUTANEOUS_TEXT,
        code: 575148,
        comments: '2 units, Injection, Subcutaneously,Bedtime,Routine,Start Date 02/11/2016 8:00.'
    });
    var bolus2 = new Records.InsulinOrder({
        status: 'active',
        date: new Date(),
        dosage: '10 unit(s), Subcutaneous, BID',
        medication: 'Insulin, Aspart, Human 100 UNT/ML [NovoLOG]',
        administration: Constants.SUBCUTANEOUS_TEXT,
        code: 575679,
        comments: '1 unit, Injection, Subcutaneously,WM,Routine,Start Date 02/11/2016 8:00. Please give NovoLOG with lunch and dinner'
    });
    var bolus3 = new Records.InsulinOrder({
        status: 'active',
        date: new Date(),
        dosage: '10 unit(s), Subcutaneous, BID',
        medication: 'HumaLOG Mix 75/25',
        administration: Constants.SUBCUTANEOUS_TEXT,
        code: 259111,
        comments: '1 unit, Injection, Subcutaneously,WM,Routine,Start Date 02/11/2016 8:00. Please give NovoLOG with lunch and dinner'
    });
    return new _immutable.List([bolus1, bolus2, bolus3]);
};
//# sourceMappingURL=medication-helper.js.map