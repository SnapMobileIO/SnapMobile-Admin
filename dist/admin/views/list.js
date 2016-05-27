(function(module) {
try {
  module = angular.module('adminApp');
} catch (e) {
  module = angular.module('adminApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/admin/views/list.html',
    '<div class="container-fluid" ng-init="ctrl.findAll()">\n' +
    '  <div class="page-header">\n' +
    '    <h1>{{ctrl.Admin.schema.displayName || ctrl.Admin.className}}</h1>\n' +
    '    <div class="actions">\n' +
    '      <a ui-sref="admin-new({ className: ctrl.Admin.className })" class="btn btn-primary"><i class="fa fa-plus"></i> Create</a>\n' +
    '      <a ng-click="ctrl.exportToCsv()" class="btn btn-default"><i class="fa fa-file-o" aria-hidden="true"></i> Export to CSV</a>\n' +
    '      <a ng-click="filterToggle = !filterToggle" class="btn btn-default"><i class="fa fa-filter"></i><span ng-show="filterToggle"> Hide Filter</span><span ng-hide="filterToggle"> Show Filter</span></a>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="row">\n' +
    '    <div class="col-lg-12">\n' +
    '      <div class="panel">\n' +
    '        <div class="panel-body table-responsive">\n' +
    '          <filter-query ng-if="ctrl.Admin.schema && filterToggle" filters="ctrl.filters" schema="ctrl.Admin.schema" find-all="ctrl.findAll(queryObject)" items-per-page="ctrl.itemsPerPage" skip="ctrl.skip" sort="ctrl.sort"></filter-query>\n' +
    '          <button ng-if="ctrl.selectedItems.length" class="btn btn-danger" ng-click="ctrl.removeMultiple(ctrl.selectedItems)">Delete ({{ctrl.selectedItems.length}}) Items</button>\n' +
    '          <table class="table table-hover"> \n' +
    '            <thead> \n' +
    '              <tr>\n' +
    '                <th class="wordwrap-none">\n' +
    '                  <input type="checkbox" ng-model="ctrl.selectedAll" ng-click="ctrl.toggleAllSelection()"></input>\n' +
    '                </th>\n' +
    '                <th ng-repeat="(key, schema) in ctrl.Admin.schema" class="wordwrap-none text-muted">\n' +
    '                  <a ng-click="ctrl.updateSort(key)">\n' +
    '                    {{ctrl.Admin.schema[key].displayName || ctrl.Admin.schema[key].path}}\n' +
    '                    <i ng-class="ctrl.toggle[key] ? \'fa fa-caret-up\' : \'fa fa-caret-down\'"></i>\n' +
    '                  </a>\n' +
    '                </th>\n' +
    '                <th></th>\n' +
    '                <th></th> \n' +
    '                <th></th>\n' +
    '              </tr>\n' +
    '            </thead>\n' +
    '            <tbody> \n' +
    '              <tr ng-repeat="object in ctrl.objects">\n' +
    '                <td><input type="checkbox" ng-model="object.Selected" ng-click="ctrl.toggleSelection(object._id)"></td>\n' +
    '\n' +
    '                <!-- Relationship -->\n' +
    '                <td ng-repeat="(key, value) in ctrl.Admin.schema">\n' +
    '                  <span ng-if="value.instance == \'String\' || key == \'_id\'">{{object[key]}}</span>\n' +
    '                  <span ng-if="key != \'_id\' && value.instance == \'ObjectID\'">\n' +
    '                    <a ui-sref="admin-show({ \n' +
    '                                  className: ctrl.Admin.schema[key].options.ref, \n' +
    '                                  id: object[key] \n' +
    '                                })">{{object[key]}}</a>\n' +
    '                  </span>\n' +
    '\n' +
    '                  <!-- Mixed / Object -->\n' +
    '                  <span ng-if="value.instance == \'Mixed\'"><i class="text-muted">Mixed</i></span>\n' +
    '\n' +
    '                  <!-- Number -->\n' +
    '                  <span ng-if="value.instance == \'Number\'">{{object[key]}}</span>\n' +
    '\n' +
    '                  <!-- Date -->\n' +
    '                  <span ng-if="value.instance == \'Date\'" class="wordwrap-none">{{object[key] | date:"MM/dd/yyyy \'at\' h:mma"}}</span>\n' +
    '                \n' +
    '                  <!-- Boolean -->\n' +
    '                  <span ng-if="value.instance == \'Boolean\'">\n' +
    '                    <i ng-if="object[key]" class="fa fa-check-circle"></i>\n' +
    '                    <i ng-if="!object[key]" class="fa fa-times-circle"></i>\n' +
    '                  </span>\n' +
    '\n' +
    '                  <!-- Image -->\n' +
    '                  <span ng-if="value.instance == \'Image\'">\n' +
    '                    <img ng-src="{{ctrl.Admin.constant.AWS_S3_BASE_URL}}/{{object[key].styles.thumb_square}}" ng-if="object[key]" style="max-width: 200px; max-height: 200px;">\n' +
    '                  </span>\n' +
    '                </td>\n' +
    '                \n' +
    '                <td>\n' +
    '                  <button ui-sref="admin-show({ className: ctrl.Admin.className, id: object._id })" class="btn btn-default btn-sm">View</button>\n' +
    '                </td>\n' +
    '                <td>\n' +
    '                  <button ng-click="ctrl.remove(object)" class="btn btn-default btn-sm">Delete</button>\n' +
    '                </td>\n' +
    '                <td>\n' +
    '                  <button ui-sref="admin-edit({ className: ctrl.Admin.className, id: object._id })" class="btn btn-default btn-sm">Edit</button>\n' +
    '                </td>\n' +
    '              </tr>\n' +
    '            </tbody>\n' +
    '          </table>\n' +
    '          <uib-pagination total-items="ctrl.totalObjects" items-per-page="ctrl.itemsPerPage" ng-model="ctrl.currentPage" max-size="5" class="pagination" boundary-links="true" force-ellipses="true" ng-change="ctrl.pageChanged()"></uib-pagination>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();