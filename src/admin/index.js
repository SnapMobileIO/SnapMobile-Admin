'use strict';

import { AdminController } from './admin.controller';
import { Admin } from './admin.service';

const app = angular.module('app');

app.service('Admin', Admin);
app.controller('AdminController', AdminController);

require('./views/_form.js');
require('./views/list.js');
require('./views/edit.js');
require('./views/new.js');
require('./views/show.js');

app.config($stateProvider => {
  $stateProvider
    .state('admin-list', {
      url: '/admin/:className',
      templateUrl: 'admin/views/list.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      authenticate: true
    })
    .state('admin-new', {
      url: '/admin/:className/new',
      templateUrl: 'admin/views/new.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      authenticate: true
    })
    .state('admin-show', {
      url: '/admin/:className/:id',
      templateUrl: 'admin/views/show.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      authenticate: true
    })
    .state('admin-edit', {
      url: '/admin/:className/:id/edit',
      templateUrl: 'admin/views/edit.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      authenticate: true
    });
});
