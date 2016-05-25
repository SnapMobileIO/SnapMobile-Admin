'use strict';

var _admin = require('./admin.controller');

var _admin2 = require('./admin.service');

var app = angular.module('adminApp', ["ui.router"]);

require('./views/_form.js');
require('./views/list.js');
require('./views/edit.js');
require('./views/new.js');
require('./views/show.js');

app.service('Admin', _admin2.Admin);
app.controller('AdminController', _admin.AdminController);

app.config(function ($stateProvider) {
  $stateProvider.state('admin-list', {
    url: '/admin/:className',
    templateUrl: 'admin/views/list.html',
    controller: 'AdminController',
    controllerAs: 'ctrl',
    authenticate: true
  }).state('admin-new', {
    url: '/admin/:className/new',
    templateUrl: 'admin/views/new.html',
    controller: 'AdminController',
    controllerAs: 'ctrl',
    authenticate: true
  }).state('admin-show', {
    url: '/admin/:className/:id',
    templateUrl: 'admin/views/show.html',
    controller: 'AdminController',
    controllerAs: 'ctrl',
    authenticate: true
  }).state('admin-edit', {
    url: '/admin/:className/:id/edit',
    templateUrl: 'admin/views/edit.html',
    controller: 'AdminController',
    controllerAs: 'ctrl',
    authenticate: true
  });
});