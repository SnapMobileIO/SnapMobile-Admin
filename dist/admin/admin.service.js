'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Admin = function () {
  function Admin($http, $httpParamSerializer, _, constant) {
    _classCallCheck(this, Admin);

    this.$http = $http;
    this.$httpParamSerializer = $httpParamSerializer;
    this._ = _;
    this.constant = constant;

    this.className;
    this.schema;
  }

  _createClass(Admin, [{
    key: 'loadSchema',
    value: function loadSchema(id) {
      var _this = this;

      return this.$http.get('/api/admin/' + this.className + '/schema').then(function (response) {
        _this.schema = response.data;

        // Overwrite the schema properties for any UI changes (set in /config/constants.js)
        _this._.merge(_this.schema, _this.constant.ADMIN_SCHEMA_OPTIONS[_this.className]);

        // Return updated schema to be used in promise if needed
        return _this.schema;
      });
    }
  }, {
    key: 'find',
    value: function find(id) {
      return this.$http.get('/api/admin/' + this.className + '/' + id);
    }
  }, {
    key: 'query',
    value: function query(params) {
      var className = params.className || this.className;
      var queryUrl = '/api/admin/' + className + '?' + this.$httpParamSerializer(params);
      return this.$http.get(queryUrl);
    }
  }, {
    key: 'create',
    value: function create(object) {
      return this.$http.post('/api/admin/' + this.className, object);
    }
  }, {
    key: 'update',
    value: function update(object) {
      return this.$http.put('/api/admin/' + this.className + '/' + object._id, object);
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      return this.$http.delete('/api/admin/' + this.className + '/' + id);
    }
  }, {
    key: 'deleteMultiple',
    value: function deleteMultiple(ids) {
      var requestUrl = '/api/admin/' + this.className + '/deleteMultiple';
      return this.$http.post(requestUrl, { ids: ids });
    }
  }]);

  return Admin;
}();

exports.Admin = Admin;