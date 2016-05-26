(function(module) {
try {
  module = angular.module('adminApp');
} catch (e) {
  module = angular.module('adminApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/admin/views/new.html',
    '<div class="container-fluid">\n' +
    '  <div class="page-header">\n' +
    '    <h1>Create Object</h1>\n' +
    '  </div>\n' +
    '  \n' +
    '  <div class="row">\n' +
    '    <div class="col-lg-12">\n' +
    '      <div class="panel">\n' +
    '        <div class="panel-heading">\n' +
    '          <h3 class="panel-title">Panel Title</h3>\n' +
    '        </div>\n' +
    '        <div class="panel-body">\n' +
    '          <form class="form-horizontal">\n' +
    '            <div ng-include="\'app/admin/views/_form.html\'"></div>\n' +
    '          \n' +
    '            <div class="form-group">\n' +
    '              <div class="col-sm-offset-2 col-sm-10">\n' +
    '                <button type="submit" class="btn btn-primary" ng-click="ctrl.add()">Save Changes</button>\n' +
    '                <button type="submit" class="btn btn-default" ui-sref="admin-list">Cancel</button>\n' +
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
