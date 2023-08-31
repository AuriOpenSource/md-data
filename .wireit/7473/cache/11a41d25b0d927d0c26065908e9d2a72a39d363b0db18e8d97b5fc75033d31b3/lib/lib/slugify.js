var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import s from 'slugify';
var defaults = {
    replacement: '-',
    remove: /[*+~.()'"!:@$%^()]/g,
    lower: true,
    strict: true,
    trim: true
};
var slugify = function (str, _config) {
    if (_config === void 0) { _config = {}; }
    var config = __assign(__assign({}, defaults), _config);
    return s(str, config);
};
export { slugify };
