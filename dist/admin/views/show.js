(function(module) {
try {
  module = angular.module('adminApp');
} catch (e) {
  module = angular.module('adminApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/admin/views/show.html',
    '<div class="container-fluid" ng-init="ctrl.findOne()">\n' +
    '  <div class="page-header">\n' +
    '    <h1>{{ctrl.object[ctrl.Admin.schema.displayKey] || \'Object\'}}</h1>\n' +
    '    <div class="actions">\n' +
    '      <a ui-sref="admin-edit({ className: ctrl.Admin.className, id:ctrl.object._id })" class="btn btn-default"><i class="fa fa-pencil-square-o"></i> Edit</a>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="row">\n' +
    '    <div class="col-lg-12">\n' +
    '      <div class="panel">\n' +
    '        <div class="panel-body table-responsive">\n' +
    '        <div schema-show object="ctrl.object" Admin="ctrl.Admin" schema="ctrl.Admin.schema" ctrl="ctrl"></div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();
