'use strict';

class AdminController {

  constructor(Admin, Auth, $http, $httpParamSerializer, $stateParams, $state, $window, $scope, $sce, adminConfiguration, FlashMessage, Filter, _, moment) {
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

    if(this.Admin.className != null) {
      this.Admin.loadSchema().then((response) => {
        if(!this.$stateParams.filterClass) return;
        for (var key in this.Admin.schema) {
          var object = this.Admin.schema[key];
          if (object.hasOwnProperty('options') &&
              object.options.hasOwnProperty('ref') &&
              object.options.ref == this.$stateParams.filterClass) {
            this.filters = [{field: object.path, operator: 'equals', value: this.$stateParams.filter}];
            this.query = this.Filter.buildQuery(this.filters, this.itemsPerPage, this.skip, this.sort);
            this.findAll(this.query);
            this.$scope.filterToggle = true;
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
  findRelationshipObjects(className, searchTerm, key, searchBy) {
    const filters = [
      {field: searchBy, operator: 'like', value: searchTerm},
      {field: searchBy, operator: 'like', value: searchTerm},
    ];
    const query = this.Filter.buildQuery(filters);
    query.className = className;
    query.limit = 10;

    this.Admin.query(query)
      .then((response) => {
        this.relationshipObjects[key] = response.data.items;
      });
  }

  /**
   * Retrieves items and item count and sets response to this.objects
   */
  findAll(params) {
    this.selectedItems = [];
    this.selectedAll = false;
    this.params = params || this.query || { limit: this.itemsPerPage, skip: this.params.skip, sort: this.params.sort };
    this.Admin.query(this.params)
      .then(response => {
        this.totalObjects = response.data.itemCount;
        this.objects = [];
        this.objects = response.data.items;
      }, (error) => {
        this.FlashMessage.errors(error);
        console.error(error);
      });
  }

  /**
   * Handles pagination of items
   */
  pageChanged() {
    this.params.skip = this.itemsPerPage * (this.currentPage - 1);
    this.findAll(this.params);
    this.selectedAll = false;
    this.selectedItems = [];
  }

  /**
   * Retrieves one item and sets to this.object
   */
  findOne() {
    let adminId = this.$stateParams.id;
    this.Admin.find(adminId)
      .then(response => {
        this.object = response.data;

        // Loop through object's keys and format dates
        this._.forEach(this.object, (value, key) => {
          if (this.Admin.schema[key] && this.Admin.schema[key].instance === 'Date') {
            this.object[key] = this.moment(this.object[key], 'YYYY-MM-DD h:mma Z').toDate();
          }
        });
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * Create a blank object or duplicate an existing object
   * to be used in the new form
   */
  new() {
    // Create a blank object or duplicate an existing object
    this.object = this.Admin.duplicateObject || {};

    // Clear the duplicate object so it doesn't stick around
    this.Admin.duplicateObject = {};
  }

  /**
   * Creates a new admin
   */
  add() {
    if (this.object) {
      // Remove hidden and mixed instance types to prevent malformed server request
      for (const key in this.Admin.schema) {
        if (this.Admin.schema.hasOwnProperty(key)) {
          if (this.Admin.schema[key].instance === 'Hidden' ||
              this.Admin.schema[key].instance === 'Mixed' ||
              this.Admin.schema[key].instance === 'ReadOnly') {
            delete this.object[key];
          }
        }
      }

      this.Admin.create(this.object)
        .then(response => {
          this.objects.unshift(response.data);
          this.object = {};
          this.findAll();
          this.$state.go('admin-list', { className: this.Admin.className });
          this.FlashMessage.success('Successfully created');
        }, (error) => {
          this.FlashMessage.errors(error);
          console.error(error);
        });
    }
  }

  /**
   * Updates a admin
   */
  update() {
    if (this.object) {

      // Remove hidden and mixed instance types to prevent malformed server request
      for (const key in this.Admin.schema) {
        if (this.Admin.schema.hasOwnProperty(key)) {
          if (this.Admin.schema[key].instance === 'Hidden' ||
              this.Admin.schema[key].instance === 'Mixed' ||
              this.Admin.schema[key].instance === 'ReadOnly') {
            delete this.object[key];
          }
        }
      }

      this.Admin.update(this.object)
        .then(response => {
          this.$state.go('admin-show', { className: this.Admin.className, id: this.object._id });
          this.FlashMessage.success('Successfully updated');
        }, (error) => {
          this.FlashMessage.errors(error);
          console.error(error);
        });
    }
  }

  /**
   * Duplicates a document by pre-populating creation form
   */
  duplicate() {
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
  remove(object) {
    if (this.$window.confirm('Are you sure?')) {
      this.Admin.delete(object._id)
        .then(() => {
          this.objects.splice(this.objects.indexOf(object), 1);
          this.findAll();
          this.FlashMessage.success('Successfully deleted');
        }, (error) => {
          console.error(error);
        });
    }
  }

  /**
   * Removes objects
   * @param  {Array} Object Ids to be deleted
   */
  removeMultiple(objectIds) {
    this.selectedAll = false;
    if (this.$window.confirm('Are you sure?')) {
      this.Admin.deleteMultiple(objectIds)
        .then((response) => {
          this.selectedItems = [];
          this.findAll();
          this.FlashMessage.success('Successfully deleted');
        }, (error) => {
          console.error(error);
        });
    }
  }

  /**
   * Removes all objects
   */
  
  removeAll() {
    if (this.$window.confirm('Are you sure? This action cannot be undone.')) {
      this.Admin.query({limit: this.totalObjects}).then(function (response) {
        this.objects = [];
        this.objects = response.data.items;
        var todelete = this.objects.map(function (object) {
          return object._id;
        });
        this.Admin.deleteMultiple(todelete).then(function (response) {
          this.selectedItems = [];
          this.findAll();
          this.FlashMessage.success('Successfully deleted');
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
  updateSort(key) {
    let isDesc = !!this.params.sort.lastIndexOf('-', 0);
    this.params.sort = isDesc ? `-${key}` : key;
    this.toggle[key] = !isDesc;
    this.findAll(this.params);
  }

  /**
   * Adds object id to selectedItems array
   * Removes id from array if it's already in there
   * @param {String} Object id
   */
  toggleSelection(objectId) {
    let index = this.selectedItems.indexOf(objectId);
    index >= 0 ? this.selectedItems.splice(index, 1) : this.selectedItems.push(objectId);
    this.selectedAll = this.selectedItems.length === this.objects.length;
  };

  /**
   * Selects or deselects all items on the page
   */
  toggleAllSelection() {
    this.selectedItems = this.objects.map((object) => {
      object.Selected = this.selectedAll;
      return object._id
    });
    if (!this.selectedAll) { this.selectedItems = [] };
  }

  /**
   * Direct user to URL that exports data to a CSV file
   */
  exportToCsv() {
    this.$window.open(`/api/admin/${this.Admin.className}?export=true&access_token=${this.Auth.token()}&` + this.$httpParamSerializer(this.params))
  }

  /**
   * Uploads the csv file and imports objects.
   */
  importFromCsv() {
    this.importLoading = true;
    this.Admin.importFromCsv(this.uploadedUrl)
      .then(response => {
        this.findAll();
        this.importLoading = false;
        this.importToggle = false;
        this.FlashMessage.success('Successfully imported');
      }, (error) => {
        this.findAll();
        this.importLoading = false;
        this.FlashMessage.errors(error);
        this.importToggle = false;
        console.error(error);
      });
  }

  /**
   * Goes to the appropriate url after checking if the sidebar item has a URL or a class property
   * @param  {Object} item sidebar item (as defined in config)
   */
  goToUrl(item) {
    if (item.url) {
      return this.$window.location.href = item.url;
    } else if (item.class) {
      return this.$state.go('admin-list', { className: item.class });
    } else {
      return this.$state.go('.'); // returns current state
    };
  }


  renderHtml(html) {
    return this.$sce.trustAsHtml(html);
  }

  addCustomObject(object, key) {
    if(!object[key]) { object[key] = [] };
    object[key].push({})
  }

}

export { AdminController };
