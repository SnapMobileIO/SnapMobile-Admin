'use strict';

import { AdminController } from './admin.controller';
import { Admin } from './admin.service';
require('angular-recursion');

const app = angular.module('adminApp', ['ui.router', 'ui.tinymce', 'RecursionHelper']);

app.service('Admin', Admin);
app.controller('AdminController', AdminController);

/*let views = ['edit', 'layout', 'list', 'new', 'show', '_schemaForm', '_schemaShow'];

for (var  i = 0; i < views.length; i++) {
  require('./views/' + views[i] + '.js');
}*/

require('./views/_form.js');
require('./views/edit.js');
require('./views/layout.js');
require('./views/list.js');
require('./views/new.js');
require('./views/show.js');
require('./views/_schemaForm.js');
require('./views/_schemaShow.js');

app.directive('schemaForm', () => {
  return {
    templateUrl: 'app/admin/views/_schemaForm.html',
    scope: {
      object: '=',
      admin: '=',
      relationshipobjects: '=',
      schema: '=',
      ctrl: '='
    }
  };
});

app.directive('schemaShow', () => {
  return {
    templateUrl: 'app/admin/views/_schemaShow.html',
    scope: {
      object: '=',
      admin: '=',
      relationshipobjects: '=',
      schema: '=',
      ctrl: '='
    }
  };
});

app.config($stateProvider => {
  $stateProvider
    .state('admin', {
      url: '/admin',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      templateUrl: 'app/admin/views/layout.html'
    })
    .state('admin-list', {
      url: '/:className?filter&filterClass',
      authenticate: true,
      authenticateRole: 'admin',
      templateUrl: 'app/admin/views/list.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      parent: 'admin'
    })
    .state('admin-new', {
      url: '/:className/new',
      authenticate: true,
      authenticateRole: 'admin',
      templateUrl: 'app/admin/views/new.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      parent: 'admin'
    })
    .state('admin-show', {
      url: '/:className/:id',
      authenticate: true,
      authenticateRole: 'admin',
      templateUrl: 'app/admin/views/show.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      parent: 'admin'
    })
    .state('admin-edit', {
      url: '/:className/:id/edit',
      authenticate: true,
      authenticateRole: 'admin',
      templateUrl: 'app/admin/views/edit.html',
      controller: 'AdminController',
      controllerAs: 'ctrl',
      parent: 'admin'
    });
});
