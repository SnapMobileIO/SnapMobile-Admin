'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminController = function () {
  function AdminController(Admin, $http, $stateParams, $state, $window, FlashMessage, Filter) {
    _classCallCheck(this, AdminController);

    this.$http = $http;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.$window = $window;
    this.FlashMessage = FlashMessage;
    this.Admin = Admin;
    this.Filter = Filter;

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

    // Load the schema for this class
    this.Admin.loadSchema();
  }

  /**
   * Get all objects from a collection and add to option
   * @param  {String} className Class name to retrieve objects
   * @param  {String} key       Key name of the object
   */


  _createClass(AdminController, [{
    key: 'findRelationshipObjects',
    value: function findRelationshipObjects(className, key) {
      var _this = this;

      this.Admin.query({ className: className }).then(function (response) {
        _this.relationshipObjects[key] = response.data.items;
      });
    }

    /**
     * Retrieves items and item count and sets response to this.objects
     */

  }, {
    key: 'findAll',
    value: function findAll(params) {
      var _this2 = this;

      this.selectedItems = [];
      this.selectedAll = false;
      this.params = params || { limit: this.itemsPerPage, skip: this.params.skip, sort: this.params.sort };
      this.Admin.query(this.params).then(function (response) {
        _this2.totalObjects = response.data.itemCount;
        _this2.objects = response.data.items;
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
      var _this3 = this;

      var adminId = this.$stateParams.id;
      this.Admin.find(adminId).then(function (response) {
        _this3.object = response.data;
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
      var _this4 = this;

      this.Admin.create(this.object).then(function (response) {
        _this4.objects.unshift(response.data);
        _this4.object = {};
        _this4.findAll();
        _this4.$state.go('admin-list', { className: _this4.Admin.className });
        _this4.FlashMessage.success('Successfully created');
      }, function (error) {
        _this4.FlashMessage.errors(error);
        console.error(error);
      });
    }

    /**
     * Updates a admin
     */

  }, {
    key: 'update',
    value: function update() {
      var _this5 = this;

      if (this.object) {
        this.Admin.update(this.object).then(function (response) {
          _this5.$state.go('admin-show', { className: _this5.Admin.className, id: _this5.object._id });
          _this5.FlashMessage.success('Successfully updated');
        }, function (error) {
          _this5.FlashMessage.errors(error);
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
      var _this6 = this;

      if (this.$window.confirm('Are you sure?')) {
        this.Admin.delete(object._id).then(function () {
          _this6.objects.splice(_this6.objects.indexOf(object), 1);
          _this6.findAll();
          _this6.FlashMessage.success('Successfully deleted');
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
      var _this7 = this;

      this.selectedAll = false;
      if (this.$window.confirm('Are you sure?')) {
        this.Admin.deleteMultiple(objectIds).then(function (response) {
          _this7.selectedItems = [];
          _this7.findAll();
          _this7.FlashMessage.success('Successfully deleted');
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
      var _this8 = this;

      this.selectedItems = this.objects.map(function (object) {
        object.Selected = _this8.selectedAll;
        return object._id;
      });
      if (!this.selectedAll) {
        this.selectedItems = [];
      };
    }
  }]);

  return AdminController;
}();

exports.AdminController = AdminController;