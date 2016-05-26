'use strict';

class AdminController {

  constructor(Admin, $http, $stateParams, $state, $window, FlashMessage, Filter) {
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
  findRelationshipObjects(className, key) {
    this.Admin.query({ className: className })
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
    this.params = params || { limit: this.itemsPerPage, skip: this.params.skip, sort: this.params.sort };
    this.Admin.query(this.params)
      .then(response => {
        this.totalObjects = response.data.itemCount;
        this.objects = response.data.items;
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
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * Creates a new admin
   */
  add() {
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

  /**
   * Updates a admin
   */
  update() {
    if (this.object) {
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

}

export { AdminController };
