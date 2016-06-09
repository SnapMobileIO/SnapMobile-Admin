(function(module) {
try {
  module = angular.module('adminApp');
} catch (e) {
  module = angular.module('adminApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/admin/views/_schemaEdit.html',
    '<div ng-repeat="(key, value) in schema track by $index" ng-if="value.instance && value.instance !== \'Hidden\'">\n' +
    '\n' +
    '  <!-- Not an Array or an Image -->\n' +
    '  <div class="form-group" ng-if="value.instance != \'Relationships\' && \n' +
    '                                 value.instance != \'Boolean\' && \n' +
    '                                 value.instance != \'ObjectID\' && \n' +
    '                                 value.instance != \'Array\' && \n' +
    '                                 value.instance != \'Date\' && \n' +
    '                                 value.instance != \'Image\' &&\n' +
    '                                 value.instance != \'wysiwyg\' &&\n' +
    '                                 value.instance != \'Mixed\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="text" ng-if="!parent" ng-model="object[key]" id="{{key}}" placeholder="{{key}}" class="form-control">\n' +
    '      <input type="text" ng-if="parent" ng-model="object[parent][index][key]" id="{{key}}" placeholder="{{key}}" class="form-control">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- wysiwyg -->\n' +
    '\n' +
    '  <span ng-if="value.instance == \'wysiwyg\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{schema[key].displayName || key}}</label>\n' +
    '    <textarea ui-tinymce="{}"\n' +
    '      ng-model="object[key]"></textarea>\n' +
    '  </span>\n' +
    '\n' +
    '  <!-- Date type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Date\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-4">\n' +
    '      <input type="datetime-local" ng-model="object[key]" id="{{key}}" class="form-control">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- Boolean type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Boolean\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <input type="checkbox" ng-model="object[key]" id="{{key}}">\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- A Mixed type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Mixed\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{schema[key].displayName || key}}</label>\n' +
    '    <div ng-repeat="(dataIndex, dataObject) in object[key] track by $index">\n' +
    '      <div ng-repeat="customObject in value.schema track by $index">\n' +
    '        <div class="col-sm-8" schema-edit object="object" Admin="admin" schema="customObject" relationshipObjects="relationshipobjects" parent="key" index="dataIndex"></div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <button type="submit" class="btn btn-primary" ng-click="object[key].push([])">Add another</button>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- An Array type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Array\'">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <ui-select multiple tagging tagging-label="(add)" ng-model="object[key]" sortable="true" title="Add {{key}}">\n' +
    '        <ui-select-match placeholder="Add {{key}}...">{{$item}}</ui-select-match>\n' +
    '        <ui-select-choices repeat="choice in [] | filter:$select.search">\n' +
    '          {{choice}}\n' +
    '        </ui-select-choices>\n' +
    '      </ui-select>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- Relationship ObjectID type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'ObjectID\' && key != \'_id\'" ng-init="findRelationshipObjects(schema[key].options.ref, key)">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <ui-select ng-model="object[key]" title="Add {{key}}">\n' +
    '        <ui-select-match>{{$select.selected[(schema[key].searchBy || \'displayName\')]}}</ui-select-match>\n' +
    '        <ui-select-choices repeat="choice._id as choice in relationshipobjects[key] | filter: { {{(schema[key].searchBy || \'displayName\')}}: $select.search }">\n' +
    '          <div ng-bind-html="choice[(schema[key].searchBy || \'displayName\')] | highlight: $select.search"></div>\n' +
    '        </ui-select-choices>\n' +
    '      </ui-select>\n' +
    '      <a ng-click="object[key]=null">Clear</a>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- Multiple Relationships - Array of relationship IDs -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Relationships\'" ng-init="findRelationshipObjects(schema[schema[key].relationshipKey].options.ref, key)">\n' +
    '    <label for="{{key}}" class="col-sm-2 control-label">{{schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-8">\n' +
    '      <ui-select multiple tagging tagging-label="(add)" ng-model="object[key]" title="Add {{key}}">\n' +
    '        <ui-select-match placeholder="Add {{key}}...">{{$item[(schema[key].searchBy || \'displayName\')]}}</ui-select-match>\n' +
    '        <ui-select-choices repeat="choice._id as choice in relationshipObjects[schema[key].relationshipKey] | filter: { {{(schema[key].searchBy || \'displayName\')}}: $select.search }">\n' +
    '          <div ng-bind-html="choice[(schema[key].searchBy || \'displayName\')] | highlight: $select.search"></div>\n' +
    '        </ui-select-choices>\n' +
    '      </ui-select>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <!--  An Image type -->\n' +
    '  <div class="form-group" ng-if="value.instance == \'Image\'">\n' +
    '    <label class="col-sm-2 control-label">{{schema[key].displayName || key}}</label>\n' +
    '    <div class="col-sm-2" ng-if="object[key]">\n' +
    '      <img ng-if="object[key].hostedType && object[key].hostedType == \'external\'" ng-src="{{object[key].styles.thumb_square}}" style="max-width: 200px; max-height: 200px;">\n' +
    '      <img ng-if="object[key] && (!object[key].hostedType || object[key].hostedType == \'local\')" ng-src="{{admin.constant.AWS_S3_BASE_URL}}/{{object[key].styles.thumb_square}}" style="max-width: 200px; max-height: 200px;">\n' +
    '    </div>\n' +
    '    <div class="col-sm-2">\n' +
    '      <file-upload for-file="object[key]" multiple="false" max-file-size="\'5MB\'">Drop new image here</file-upload>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '');
}]);
})();
