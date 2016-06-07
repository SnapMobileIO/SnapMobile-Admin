(function(module) {
try {
  module = angular.module('adminApp');
} catch (e) {
  module = angular.module('adminApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/admin/views/_form.html',
    '<div ng-repeat="(key, value) in ctrl.Admin.schema" ng-if="value.instance && value.instance !== \'Hidden\'">\n' +
    '\n' +
    '  <!-- Not an Array or an Image -->\n' +
    '  <div class="form-group" ng-if="value.instance != \'Relationships\' && \n' +
    '                                 value.instance != \'Boolean\' && \n' +
    '                                 value.instance != \'ObjectID\' && \n' +
    '                                 value.instance != \'Array\' && \n' +
    '                                 value.instance != \'Date\' && \n' +
    '                                 value.instance != \'Image\' &&\n' +
    '                                 value.instance != \'wysiwyg\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{ctrl.Admin.schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" ng-model="ctrl.object[key]" id="{{key}}" placeholder="{{key}}" class="form-control">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- wysiwyg -->\n' +
    '\n' +
    '  <span ng-if="value.instance == \'wysiwyg\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{ctrl.Admin.schema[key].displayName || key}}</label>\n' +
    '    <div id="{{key}}" class="summernote" ng-model="ctrl.object[key]"></div>\n' +
    '  </span>\n' +
    '\n' +
    '  <!-- Date type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Date\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{ctrl.Admin.schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-4">\n' +
    '      <input type="datetime-local" ng-model="ctrl.object[key]" id="{{key}}" class="form-control">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- Boolean type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Boolean\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{ctrl.Admin.schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="checkbox" ng-model="ctrl.object[key]" id="{{key}}">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- An Array type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Array\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{ctrl.Admin.schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <ui-select multiple tagging tagging-label="(add)" ng-model="ctrl.object[key]" sortable="true" title="Add {{key}}">\n' +
    '        <ui-select-match placeholder="Add {{key}}...">{{$item}}</ui-select-match>\n' +
    '        <ui-select-choices repeat="choice in [] | filter:$select.search">\n' +
    '          {{choice}}\n' +
    '        </ui-select-choices>\n' +
    '      </ui-select>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- Relationship ObjectID type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'ObjectID\' && key != \'_id\'" ng-init="ctrl.findRelationshipObjects(ctrl.Admin.schema[key].options.ref, key)">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{ctrl.Admin.schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <ui-select ng-model="ctrl.object[key]" title="Add {{key}}">\n' +
    '        <ui-select-match>{{$select.selected[(ctrl.Admin.schema[key].searchBy || \'displayName\')]}}</ui-select-match>\n' +
    '        <ui-select-choices repeat="choice._id as choice in ctrl.relationshipObjects[key] | filter: { {{(ctrl.Admin.schema[key].searchBy || \'displayName\')}}: $select.search }">\n' +
    '          <div ng-bind-html="choice[(ctrl.Admin.schema[key].searchBy || \'displayName\')] | highlight: $select.search"></div>\n' +
    '        </ui-select-choices>\n' +
    '      </ui-select>\n' +
    '      <a ng-click="ctrl.object[key]=null">Clear</a>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- Multiple Relationships - Array of relationship IDs -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Relationships\'" ng-init="ctrl.findRelationshipObjects(ctrl.Admin.schema[ctrl.Admin.schema[key].relationshipKey].options.ref, key)">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{ctrl.Admin.schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <ui-select multiple tagging tagging-label="(add)" ng-model="ctrl.object[key]" title="Add {{key}}">\n' +
    '        <ui-select-match placeholder="Add {{key}}...">{{$item[(ctrl.Admin.schema[key].searchBy || \'displayName\')]}}</ui-select-match>\n' +
    '        <ui-select-choices repeat="choice._id as choice in ctrl.relationshipObjects[ctrl.Admin.schema[key].relationshipKey] | filter: { {{(ctrl.Admin.schema[key].searchBy || \'displayName\')}}: $select.search }">\n' +
    '          <div ng-bind-html="choice[(ctrl.Admin.schema[key].searchBy || \'displayName\')] | highlight: $select.search"></div>\n' +
    '        </ui-select-choices>\n' +
    '      </ui-select>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!--  An Image type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Image\'">\n' +
    '    <label class="col-sm-2 control-label">{{ctrl.Admin.schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-2" ng-if="ctrl.object[key]">\n' +
    '      <img ng-if="ctrl.object[key].hostedType && ctrl.object[key].hostedType == \'external\'" ng-src="{{ctrl.object[key].styles.thumb_square}}" style="max-width: 200px; max-height: 200px;">\n' +
    '      <img ng-if="ctrl.object[key] && (!ctrl.object[key].hostedType || ctrl.object[key].hostedType == \'local\')" ng-src="{{ctrl.Admin.constant.AWS_S3_BASE_URL}}/{{ctrl.object[key].styles.thumb_square}}" style="max-width: 200px; max-height: 200px;">\n' +
    '    </div>\n' +
    '    <div class="col-sm-2">\n' +
    '      <file-upload for-file="ctrl.object[key]" multiple="false" max-file-size="\'5MB\'">Drop new image here</file-upload>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();
