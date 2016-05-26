var module = angular.module('adminApp');
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('admin/views/_form.html',
    '<div ng-repeat="(key, value) in ctrl.Admin.schema" ng-if="value.instance">\n' +
    '\n' +
    '  <!-- Not an Array or an Image -->\n' +
    '  <div class="form-group" ng-if="value.instance != \'Boolean\' && value.instance != \'ObjectID\' && value.instance != \'Array\' && value.instance != \'Image\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" ng-model="ctrl.object[key]" id="{{key}}" placeholder="{{key}}" class="form-control">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- Boolean type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Boolean\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="checkbox" ng-model="ctrl.object[key]" id="{{key}}">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- An Array type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Array\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{key}}</label>\n' +
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
    '    <label for="{{key}}" class="col-sm-2 control-label">{{key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <ui-select ng-model="ctrl.object[key]" title="Add {{key}}">\n' +
    '        <ui-select-match allow-clear="true">{{$select.selected[(ctrl.Admin.schema[key].searchBy || \'displayName\')]}}</ui-select-match>\n' +
    '        <ui-select-choices repeat="choice._id as choice in ctrl.relationshipObjects[key] | filter: { {{(ctrl.Admin.schema[key].searchBy || \'displayName\')}}: $select.search }">\n' +
    '          <div ng-bind-html="choice[(ctrl.Admin.schema[key].searchBy || \'displayName\')] | highlight: $select.search"></div>\n' +
    '        </ui-select-choices>\n' +
    '      </ui-select>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!--  An Image type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Image\'">\n' +
    '    <label class="col-sm-2 control-label">{{key}}</label>\n' +
    '    <div class="col-sm-2" ng-if="ctrl.object[key]">\n' +
    '      <img ng-src="https://test-aws-lamda-bucket.s3.amazonaws.com/{{ctrl.object[key].url}}" ng-if="ctrl.object[key]" style="max-width: 100%; max-height: 100%;">\n' +
    '    </div>\n' +
    '    <div class="col-sm-2">\n' +
    '      <file-upload for-file="ctrl.object[key]" multiple="false" max-file-size="\'2MB\'">Drop new image here</file-upload>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
