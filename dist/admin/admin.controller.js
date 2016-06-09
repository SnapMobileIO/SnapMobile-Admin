'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminController = function () {
  function AdminController(Admin, Auth, $http, $httpParamSerializer, $stateParams, $state, $window, $scope, $sce, adminConfiguration, FlashMessage, Filter, _, moment) {
    var _this = this;

    _classCallCheck(this, AdminController);

    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$httpParamSerializer = $httpParamSerializer;
    this.$state = $state;
    this.$window = $window;
    this.$scope = $scope;
    this.sidebarItems = adminConfiguration.sidebarItems;
    this._ = _;
    this.FlashMessage = FlashMessage;
    this.Admin = Admin;
    this.Filter = Filter;
    this.Auth = Auth;
    this.moment = moment;
    this.$sce = $sce;

    this.objects = [];
    this.currentPage = 1;
    this.itemsPerPage = 20;
    this.relationshipObjects = [];
    this.Admin.className = this.$stateParams.className;
    this.selectedItems = [];
    this.filters = [{ field: '', operator: '', value: '' }];
    this.params = {};
    this.params.skip = 0;
    this.params.sort = '-createdAt';
    this.toggle = {};
    this.uploadedUrl = "";

    // Load the schema for this class

    if (this.Admin.className != null) {
      this.Admin.loadSchema().then(function (response) {
        if (!_this.$stateParams.filterClass) return;
        for (var key in _this.Admin.schema) {
          var object = _this.Admin.schema[key];
          if (object.hasOwnProperty('options') && object.options.hasOwnProperty('ref') && object.options.ref == _this.$stateParams.filterClass) {
            _this.filters = [{ field: object.path, operator: 'equals', value: _this.$stateParams.filter }];
            _this.query = _this.Filter.buildQuery(_this.filters, _this.itemsPerPage, _this.skip, _this.sort);
            _this.findAll(_this.query);
            _this.$scope.filterToggle = true;
          }
        }
      });
    }
  }

  /**
   * Get all objects from a collection and add to option
   * @param  {String} className Class name to retrieve objects
   * @param  {String} key       Key name of the object
   */


  _createClass(AdminController, [{
    key: 'findRelationshipObjects',
    value: function findRelationshipObjects(className, key) {
      var _this2 = this;

      var params = { className: className, limit: 10000 };
      this.Admin.query(params).then(function (response) {
        _this2.relationshipObjects[key] = response.data.items;
      });
    }

    /**
     * Retrieves items and item count and sets response to this.objects
     */

  }, {
    key: 'findAll',
    value: function findAll(params) {
      var _this3 = this;

      this.selectedItems = [];
      this.selectedAll = false;
      this.params = params || this.query || { limit: this.itemsPerPage, skip: this.params.skip, sort: this.params.sort };
      this.Admin.query(this.params).then(function (response) {
        _this3.totalObjects = response.data.itemCount;
        _this3.objects = response.data.items;
      }, function (error) {
        _this3.FlashMessage.errors(error);
        console.error(error);
      });
    }

    /**
     * Handles pagination of items
     */

  }, {
    key: 'pageChanged',
    value: function pageChanged() {
      this.params.skip = this.itemsPerPage * (this.currentPage - 1);
      this.findAll(this.params);
      this.selectedAll = false;
      this.selectedItems = [];
    }

    /**
     * Retrieves one item and sets to this.object
     */

  }, {
    key: 'findOne',
    value: function findOne() {
      var _this4 = this;

      var adminId = this.$stateParams.id;
      this.Admin.find(adminId).then(function (response) {
        _this4.object = response.data;

        // Loop through object's keys and format dates
        _this4._.forEach(_this4.object, function (value, key) {
          if (_this4.Admin.schema[key] && _this4.Admin.schema[key].instance === 'Date') {
            _this4.object[key] = _this4.moment(_this4.object[key], 'YYYY-MM-DD h:mma Z').toDate();
          }
        });
      }, function (error) {
        console.error(error);
      });
    }

    /**
     * Creates a new admin
     */

  }, {
    key: 'add',
    value: function add() {
      var _this5 = this;

      this.Admin.create(this.object).then(function (response) {
        _this5.objects.unshift(response.data);
        _this5.object = {};
        _this5.findAll();
        _this5.$state.go('admin-list', { className: _this5.Admin.className });
        _this5.FlashMessage.success('Successfully created');
      }, function (error) {
        _this5.FlashMessage.errors(error);
        console.error(error);
      });
    }

    /**
     * Updates a admin
     */

  }, {
    key: 'update',
    value: function update() {
      var _this6 = this;

      if (this.object) {
        this.Admin.update(this.object).then(function (response) {
          _this6.$state.go('admin-show', { className: _this6.Admin.className, id: _this6.object._id });
          _this6.FlashMessage.success('Successfully updated');
        }, function (error) {
          _this6.FlashMessage.errors(error);
          console.error(error);
        });
      }
    }

    /**
     * Removes a object
     * @param  {Object} Object to be deleted
     */

  }, {
    key: 'remove',
    value: function remove(object) {
      var _this7 = this;

      if (this.$window.confirm('Are you sure?')) {
        this.Admin.delete(object._id).then(function () {
          _this7.objects.splice(_this7.objects.indexOf(object), 1);
          _this7.findAll();
          _this7.FlashMessage.success('Successfully deleted');
        }, function (error) {
          console.error(error);
        });
      }
    }

    /**
     * Removes objects
     * @param  {Array} Object Ids to be deleted
     */

  }, {
    key: 'removeMultiple',
    value: function removeMultiple(objectIds) {
      var _this8 = this;

      this.selectedAll = false;
      if (this.$window.confirm('Are you sure?')) {
        this.Admin.deleteMultiple(objectIds).then(function (response) {
          _this8.selectedItems = [];
          _this8.findAll();
          _this8.FlashMessage.success('Successfully deleted');
        }, function (error) {
          console.error(error);
        });
      }
    }

    /**
     * Updates and reruns findAll() to sort objects based on key and asc / desc
     * The toggle state is tracked so that the UI can be udpated
     * @param  {String} key The key to sort by
     */

  }, {
    key: 'updateSort',
    value: function updateSort(key) {
      var isDesc = !!this.params.sort.lastIndexOf('-', 0);
      this.params.sort = isDesc ? '-' + key : key;
      this.toggle[key] = !isDesc;
      this.findAll(this.params);
    }

    /**
     * Adds object id to selectedItems array
     * Removes id from array if it's already in there
     * @param {String} Object id
     */

  }, {
    key: 'toggleSelection',
    value: function toggleSelection(objectId) {
      var index = this.selectedItems.indexOf(objectId);
      index >= 0 ? this.selectedItems.splice(index, 1) : this.selectedItems.push(objectId);
      this.selectedAll = this.selectedItems.length === this.objects.length;
    }
  }, {
    key: 'toggleAllSelection',


    /**
     * Selects or deselects all items on the page
     */
    value: function toggleAllSelection() {
      var _this9 = this;

      this.selectedItems = this.objects.map(function (object) {
        object.Selected = _this9.selectedAll;
        return object._id;
      });
      if (!this.selectedAll) {
        this.selectedItems = [];
      };
    }

    /**
     * Direct user to URL that exports data to a CSV file
     */

  }, {
    key: 'exportToCsv',
    value: function exportToCsv() {
      this.$window.open('/api/admin/' + this.Admin.className + '/exportToCsv?access_token=' + this.Auth.token() + '&' + this.$httpParamSerializer(this.params));
    }

    /**
     * Uploads the csv file and imports objects.
     */

  }, {
    key: 'importFromCsv',
    value: function importFromCsv() {
      var _this10 = this;

      this.Admin.importFromCsv(this.uploadedUrl).then(function (response) {
        _this10.findAll();
        _this10.FlashMessage.success('Successfully imported');
      }, function (error) {
        _this10.findAll();
        _this10.FlashMessage.errors(error);
        console.error(error);
      });
    }

    /**
     * Returns a url for ui-sref fora  sidebar item
     * @param  {Object} sidebar item (as defined in config)
     * @return {String} url for class, or current state if not
     */

  }, {
    key: 'getClassUrl',
    value: function getClassUrl(item) {
      if (item.class) return 'admin-list({ className : \'' + item.class + '\' })';else return '.'; //returns current state
    }
  }, {
    key: 'renderHtml',
    value: function renderHtml(html) {
      return this.$sce.trustAsHtml(html);
    }
  }]);

  return AdminController;
}();

exports.AdminController = AdminController;