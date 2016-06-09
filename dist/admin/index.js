'use strict';

var _admin = require('./admin.controller');

var _admin2 = require('./admin.service');

require('angular-recursion');

var app = angular.module('adminApp', ['ui.router', 'ui.tinymce', 'RecursionHelper']);

app.service('Admin', _admin2.Admin);
app.controller('AdminController', _admin.AdminController);

require('./views/_form.js');
require('./views/edit.js');
require('./views/layout.js');
require('./views/list.js');
require('./views/new.js');
require('./views/show.js');
require('./views/_schemaEdit.js');

app.directive('schemaEdit', function (RecursionHelper) {
  return {
    templateUrl: 'app/admin/views/_schemaEdit.html',
    scope: {
      object: '=',
      admin: '=',
      relationshipobjects: '=',
      schema: '=',
      parent: '=',
      index: '='
    }, compile: function compile(element) {
      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element);
    }
  };
});

app.config(function ($stateProvider) {
  $stateProvider.state('admin', {
    url: '/admin',
    controller: 'AdminController',
    controllerAs: 'ctrl',
    templateUrl: 'app/admin/views/layout.html'
  }).state('admin-list', {
    url: '/:className?filter&filterClass',
    authenticate: true,
    authenticateRole: 'admin',
    templateUrl: 'app/admin/views/list.html',
    controller: 'AdminController',
    controllerAs: 'ctrl',
    parent: 'admin'
  }).state('admin-new', {
    url: '/:className/new',
    authenticate: true,
    authenticateRole: 'admin',
    templateUrl: 'app/admin/views/new.html',
    controller: 'AdminController',
    controllerAs: 'ctrl',
    parent: 'admin'
  }).state('admin-show', {
    url: '/:className/:id',
    authenticate: true,
    authenticateRole: 'admin',
    templateUrl: 'app/admin/views/show.html',
    controller: 'AdminController',
    controllerAs: 'ctrl',
    parent: 'admin'
  }).state('admin-edit', {
    url: '/:className/:id/edit',
    authenticate: true,
    authenticateRole: 'admin',
    templateUrl: 'app/admin/views/edit.html',
    controller: 'AdminController',
    controllerAs: 'ctrl',
    parent: 'admin'
  });
});