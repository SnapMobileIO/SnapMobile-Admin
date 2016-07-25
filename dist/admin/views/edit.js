(function(module) {
try {
  module = angular.module('adminApp');
} catch (e) {
  module = angular.module('adminApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/admin/views/edit.html',
    '<div class="container-fluid" ng-init="ctrl.findOne()">\n' +
    '  <div class="page-header">\n' +
    '    <h1>{{ctrl.object[ctrl.Admin.schema.displayKey] || \'Object\'}}</h1>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="row">\n' +
    '    <div class="col-lg-12">\n' +
    '      <div class="panel">\n' +
    '        <div class="panel-heading">\n' +
    '          <h3 class="panel-title">Panel Title</h3>\n' +
    '        </div>\n' +
    '        <div class="panel-body">\n' +
    '          <div ng-if="!ctrl.object"><i class="fa fa-spinner fa-spin"></i> Loading...</div>\n' +
    '\n' +
    '          <form ng-if="ctrl.object" class="form-horizontal">\n' +
    '            <div schema-form object="ctrl.object" Admin="ctrl.Admin" schema="ctrl.Admin.schema" ctrl="ctrl"></div>\n' +
    '            <div class="form-group">\n' +
    '              <div class="col-sm-offset-2 col-sm-10">\n' +
    '                <button type="submit" class="btn btn-primary" ng-click="ctrl.update()">Save Changes</button>\n' +
    '                <button type="submit" class="btn btn-default" ui-sref="admin-list({ className: ctrl.Admin.className })">Cancel</button>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </form>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();
