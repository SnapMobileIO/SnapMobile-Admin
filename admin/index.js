'use strict';

import { AdminController } from './admin.controller';
import { Admin } from './admin.service';

const app = angular.module('app');

app.service('Admin', Admin);
app.controller('AdminController', AdminController);

app.config($stateProvider => {
  $stateProvider
    .state('admin-list', {
      url: '/admin/:className',
      templateUrl: 'app/admin/views/list.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      authenticate: true
    })
    .state('admin-new', {
      url: '/admin/:className/new',
      templateUrl: 'app/admin/views/new.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      authenticate: true
    })
    .state('admin-show', {
      url: '/admin/:className/:id',
      templateUrl: 'app/admin/views/show.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      authenticate: true
    })
    .state('admin-edit', {
      url: '/admin/:className/:id/edit',
      templateUrl: 'app/admin/views/edit.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      authenticate: true
    });
});
