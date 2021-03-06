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
    this.object = {};
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

    this.tinymceOptions = {
      selector: 'textarea',
      plugins: 'link autolink',
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link',
      default_link_target: '_blank',
      link_assume_external_targets: true
    };

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
   * This uses the filter url strategy to search based on a term
   * @param  {String} className Class name to retrieve objects
   * @param  {String} key       Key name of the object
   */


  _createClass(AdminController, [{
    key: 'findRelationshipObjects',
    value: function findRelationshipObjects(className, searchTerm, key, searchBy) {
      var _this2 = this;

      var filters = [{ field: searchBy, operator: 'like', value: searchTerm }, { field: searchBy, operator: 'like', value: searchTerm }];
      var query = this.Filter.buildQuery(filters);
      query.className = className;
      query.limit = 10;

      this.Admin.query(query).then(function (response) {
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
        _this3.objects = [];
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
     * Create a blank object or duplicate an existing object
     * to be used in the new form
     */

  }, {
    key: 'new',
    value: function _new() {
      // Create a blank object or duplicate an existing object
      this.object = this.Admin.duplicateObject || {};

      // Clear the duplicate object so it doesn't stick around
      this.Admin.duplicateObject = {};
    }

    /**
     * Creates a new admin
     */

  }, {
    key: 'add',
    value: function add() {
      var _this5 = this;

      if (this.object) {
        // Remove hidden and mixed instance types to prevent malformed server request
        for (var key in this.Admin.schema) {
          if (this.Admin.schema.hasOwnProperty(key)) {
            if (this.Admin.schema[key].instance === 'Hidden' || this.Admin.schema[key].instance === 'Mixed' || this.Admin.schema[key].instance === 'ReadOnly') {
              delete this.object[key];
            }
          }
        }

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
    }

    /**
     * Updates a admin
     */

  }, {
    key: 'update',
    value: function update() {
      var _this6 = this;

      if (this.object) {

        // Remove hidden and mixed instance types to prevent malformed server request
        for (var key in this.Admin.schema) {
          if (this.Admin.schema.hasOwnProperty(key)) {
            if (this.Admin.schema[key].instance === 'Hidden' || this.Admin.schema[key].instance === 'Mixed' || this.Admin.schema[key].instance === 'ReadOnly') {
              delete this.object[key];
            }
          }
        }

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
     * Duplicates a document by pre-populating creation form
     */

  }, {
    key: 'duplicate',
    value: function duplicate() {
      this.Admin.duplicateObject = this.object;

      // Remove properties that should not be duplicated
      delete this.Admin.duplicateObject._id;
      delete this.Admin.duplicateObject.createdAt;
      delete this.Admin.duplicateObject.updatedAt;

      this.$state.go('admin-new', { className: this.Admin.className });
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
      * Removes all objects
      */

  }, {
    key: 'removeAll',
    value: function removeAll() {
      var _this11 = this;
      if (this.$window.confirm('Are you sure? This action cannot be undone.')) {
        _this11.Admin.query({ limit: _this11.totalObjects }).then(function (response) {
          _this11.objects = [];
          _this11.objects = response.data.items;
          var todelete = _this11.objects.map(function (object) {
            return object._id;
          });
          _this11.Admin.deleteMultiple(todelete).then(function (response) {
            _this11.selectedItems = [];
            _this11.findAll();
            _this11.FlashMessage.success('Successfully deleted');
          }, function (error) {
            console.error(error);
          });
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
      this.$window.open('/api/admin/' + this.Admin.className + '?export=true&access_token=' + this.Auth.token() + '&' + this.$httpParamSerializer(this.params));
    }

    /**
     * Uploads the csv file and imports objects.
     */

  }, {
    key: 'importFromCsv',
    value: function importFromCsv() {
      var _this10 = this;

      this.importLoading = true;
      this.Admin.importFromCsv(this.uploadedUrl).then(function (response) {
        _this10.findAll();
        _this10.importLoading = false;
        _this10.importToggle = false;
        _this10.FlashMessage.success('Successfully imported');
      }, function (error) {
        _this10.findAll();
        _this10.importLoading = false;
        _this10.FlashMessage.errors(error);
        _this10.importToggle = false;
        console.error(error);
      });
    }

    /**
     * Goes to the appropriate url after checking if the sidebar item has a URL or a class property
     * @param  {Object} item sidebar item (as defined in config)
     */

  }, {
    key: 'goToUrl',
    value: function goToUrl(item) {
      if (item.url) {
        return this.$window.location.href = item.url;
      } else if (item.class) {
        return this.$state.go('admin-list', { className: item.class });
      } else {
        return this.$state.go('.'); // returns current state
      };
    }
  }, {
    key: 'renderHtml',
    value: function renderHtml(html) {
      return this.$sce.trustAsHtml(html);
    }
  }, {
    key: 'addCustomObject',
    value: function addCustomObject(object, key) {
      if (!object[key]) {
        object[key] = [];
      };
      object[key].push({});
    }
  }]);

  return AdminController;
}();

exports.AdminController = AdminController;