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
    '      <a ng-click="ctrl.importToggle = !ctrl.importToggle" class="btn btn-default"><i class="fa fa-file-o" aria-hidden="true"></i> <span ng-show="ctrl.importToggle"> Hide import</span><span ng-hide="ctrl.importToggle"> Import from CSV</span></a>\n' +
    '      <a ng-click="filterToggle = !filterToggle" class="btn btn-default"><i class="fa fa-filter"></i><span ng-show="filterToggle"> Hide Filter</span><span ng-hide="filterToggle"> Show Filter</span></a>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div class="row">\n' +
    '    <div class="col-lg-12">\n' +
    '      <div class="panel">\n' +
    '        <div class="panel-body table-responsive">\n' +
    '          <div ng-if="ctrl.importToggle" class="col-md-12">\n' +
    '            <file-upload for-file="ctrl.uploadedUrl" multiple="false" accept="\'text/csv\'" pattern="\'text/csv\'" max-file-size="\'100MB\'">Drop csv file here</file-upload>\n' +
    '            <div class="pull-right">\n' +
    '              <a ng-click="ctrl.importFromCsv()" class="margin-top btn btn-primary" ng-disabled="ctrl.importLoading"><i class="fa fa-file-o" aria-hidden="true"></i> Import</a>\n' +
    '              <div ng-if="ctrl.importLoading"><i class="fa fa-spinner fa-spin"></i> Loading...</div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '          <filter-query ng-if="ctrl.Admin.schema && filterToggle" filters="ctrl.filters" schema="ctrl.Admin.schema" find-all="ctrl.findAll(queryObject)" items-per-page="ctrl.itemsPerPage" skip="ctrl.skip" sort="ctrl.sort"></filter-query>\n' +
    '          <button ng-if="ctrl.selectedItems.length" class="btn btn-danger" ng-click="ctrl.removeMultiple(ctrl.selectedItems)">Delete ({{ctrl.selectedItems.length}}) Items</button>\n' +
    '          <table class="table table-hover">\n' +
    '            <thead>\n' +
    '              <tr>\n' +
    '                <th class="wordwrap-none">\n' +
    '                  <input type="checkbox" ng-model="ctrl.selectedAll" ng-click="ctrl.toggleAllSelection()"></input>\n' +
    '                </th>\n' +
    '                <th ng-repeat="(key, value) in ctrl.Admin.schema track by $index" ng-if="value.instance !== \'Hidden\' && value.instance !== \'wysiwyg\'" class="wordwrap-none text-muted">\n' +
    '                  <a ng-click="ctrl.updateSort(key)">\n' +
    '                    {{ctrl.Admin.schema[key].displayName || ctrl.Admin.schema[key].path}}\n' +
    '                    <i ng-class="ctrl.toggle[key] ? \'fa fa-caret-up\' : \'fa fa-caret-down\'"></i>\n' +
    '                  </a>\n' +
    '                </th>\n' +
    '                <th></th>\n' +
    '                <th></th>\n' +
    '                <th></th>\n' +
    '              </tr>\n' +
    '            </thead>\n' +
    '            <tbody>\n' +
    '              <tr ng-repeat="object in ctrl.objects track by $index">\n' +
    '                <td><input type="checkbox" ng-model="object.Selected" ng-click="ctrl.toggleSelection(object._id)"></td>\n' +
    '\n' +
    '                <td ng-repeat="(key, value) in ctrl.Admin.schema track by $index" ng-if="value.instance !== \'Hidden\' && value.instance !== \'wysiwyg\'">\n' +
    '                  \n' +
    '                  <!-- String or CustomSelect-->\n' +
    '                  <div class="truncate" ng-if="value.instance == \'String\' || key == \'_id\' || value.instance === \'CustomSelect\'">{{object[key]}}</div>\n' +
    '                  \n' +
    '                  <!-- Relationship -->\n' +
    '                  <div class="truncate" ng-if="key != \'_id\' && value.instance == \'ObjectID\'">\n' +
    '                    <a ui-sref="admin-show({\n' +
    '                                  className: ctrl.Admin.schema[key].options.ref,\n' +
    '                                  id: (object[key]._id || object[key])\n' +
    '                                })">{{(object[key][ctrl.Admin.schema[key].displayKey] || object[key])}}</a>\n' +
    '                  </div>\n' +
    '\n' +
    '                  <!-- Relationships -->\n' +
    '                  <div class="truncate" ng-if="value.instance == \'Relationships\'">\n' +
    '                    <span ng-repeat="object in object[key] track by $index">\n' +
    '                      <a ui-sref="admin-show({\n' +
    '                          className: ctrl.Admin.schema[key].relationshipClass,\n' +
    '                          id: (object._id || object)\n' +
    '                        })" class="text-muted">{{object[ctrl.Admin.schema[key].displayKey] || object._id || object}}</a><span ng-if="!$last">,</span>\n' +
    '                    </span>\n' +
    '                  </div>\n' +
    '\n' +
    '                  <!-- Embedded Schema --> \n' +
    '                  <div ng-if="value.instance === \'EmbeddedSchema\'">\n' +
    '                      <div class="col-sm-11">\n' +
    '                        <div ng-repeat="(dataIndex, dataObject) in object[key] track by $index" class="custom-object">\n' +
    '                          <div class="row">\n' +
    '                            <div ng-repeat="embeddedObject in [value.schema.paths] track by $index">\n' +
    '                              <div class="col-sm-12" schema-show object="object[key][dataIndex]" Admin="admin" schema="embeddedObject" ctrl="ctrl"></div>\n' +
    '                            </div>\n' +
    '                          </div>\n' +
    '                        </div>\n' +
    '                      </div>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '\n' +
    '                  <!-- Mixed / Object -->\n' +
    '                  <div class="truncate" ng-if="value.instance == \'Mixed\'"><i class="text-muted">Mixed</i></div>\n' +
    '\n' +
    '                  <!-- Array -->\n' +
    '                  <div class="truncate" ng-if="value.instance == \'Array\'">{{object[key].join(\', \')}}</div>\n' +
    '\n' +
    '                  <!-- Array-No-Commas -->\n' +
    '                  <div class="truncate" ng-if="value.instance == \'Array-No-Commas\'">{{object[key].join(\', \')}}</div>\n' +
    '\n' +
    '                  <!-- Number -->\n' +
    '                  <div class="truncate" ng-if="value.instance == \'Number\'">{{object[key]}}</div>\n' +
    '\n' +
    '                  <!-- Date -->\n' +
    '                  <div class="truncate" ng-if="value.instance == \'Date\'" class="wordwrap-none">{{object[key] | date:"MM/dd/yyyy \'at\' h:mma"}}</div>\n' +
    '\n' +
    '                  <!-- SubDocument -->\n' +
    '                  <div class="truncate" ng-if="value.instance == \'SubDocument\'">{{ctrl.Admin.schema[key].displayKey ? object[key][ctrl.Admin.schema[key].displayKey] : object[key]}}</div>\n' +
    '\n' +
    '                  <!-- Boolean -->\n' +
    '                  <div class="truncate" ng-if="value.instance == \'Boolean\'">\n' +
    '                    <i ng-if="object[key]" class="fa fa-check-circle"></i>\n' +
    '                    <i ng-if="!object[key]" class="fa fa-times-circle"></i>\n' +
    '                  </div>\n' +
    '\n' +
    '                  <!-- Image -->\n' +
    '                  <div class="truncate" ng-if="value.instance == \'Image\'">\n' +
    '                    <img ng-src="{{ctrl.Admin.constant.AWS_S3_BASE_URL}}/{{object[key].styles.thumb_square || object[key].url}}" style="max-width: 200px; max-height: 200px;">\n' +
    '                  </div>\n' +
    '\n' +
    '                  <!-- ImagesArray -->\n' +
    '                  <div class="truncate" ng-if="value.instance === \'ImagesArray\'">\n' +
    '                    <p ng-repeat="image in object[key]" class="array-img padding-right-1x">\n' +
    '                      <img ng-src="{{ctrl.Admin.constant.AWS_S3_BASE_URL}}/{{image.styles.thumb_square || image.url}}" style="width: 100%">\n' +
    '                    </p>\n' +
    '                  </div>\n' +
    '\n' +
    '                  <!-- File -->\n' +
    '                  <div class="truncate" ng-if="value.instance == \'File\'">\n' +
    '                    <span ng-if="object[key].name && object[key].url" class="text-wordwrap"><a ng-href="{{ctrl.Admin.constant.AWS_S3_BASE_URL}}/{{object[key].url}}" target="_blank">{{object[key].name}}</a></span>\n' +
    '                  </div>\n' +
    '\n' +
    '                  <!-- FilesArray -->\n' +
    '                  <div class="truncate" ng-if="value.instance === \'FilesArray\'">\n' +
    '                    <p ng-repeat="file in object[key]">\n' +
    '                      <span ng-if="file.name && file.url" class="text-wordwrap"><a ng-href="{{ctrl.Admin.constant.AWS_S3_BASE_URL}}/{{file.url}}" target="_blank">{{file.name}}</a></span>\n' +
    '                    </p>\n' +
    '                  </div>\n' +
    '                </td>\n' +
    '\n' +
    '                <td>\n' +
    '                  <a ui-sref="admin-show({ className: ctrl.Admin.className, id: object._id })" class="btn btn-default btn-sm">View</a>\n' +
    '                </td>\n' +
    '                <td>\n' +
    '                  <button ng-click="ctrl.remove(object)" class="btn btn-default btn-sm">Delete</button>\n' +
    '                </td>\n' +
    '                <td>\n' +
    '                  <a ui-sref="admin-edit({ className: ctrl.Admin.className, id: object._id })" class="btn btn-default btn-sm">Edit</a>\n' +
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
