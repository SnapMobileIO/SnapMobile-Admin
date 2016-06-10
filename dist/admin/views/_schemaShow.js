(function(module) {
try {
  module = angular.module('adminApp');
} catch (e) {
  module = angular.module('adminApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/admin/views/_schemaShow.html',
    '<ul class="list-group">\n' +
    '  <li class="list-group-item" ng-repeat="(key, value) in schema" ng-if="key !== \'displayName\' && key !== \'displayKey\' && value.instance !== \'Hidden\'">\n' +
    '\n' +
    '    <!-- String or ID -->\n' +
    '    <span ng-if="value.instance == \'String\' || key == \'_id\'"><strong>{{schema[key].displayName || key}}:</strong> {{object[key]}}</span>\n' +
    '\n' +
    '    <!-- ObjectID that isn\'t the object ID -->\n' +
    '    <span ng-if="value.instance == \'ObjectID\' && key != \'_id\'">\n' +
    '      <strong>{{schema[key].displayName || key}}:</strong> \n' +
    '      <a ui-sref="admin-show({ \n' +
    '                    className: schema[key].options.ref, \n' +
    '                    id: object[key] \n' +
    '                  })" class="text-muted">{{object[key]}}</a>\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- Mixed -->\n' +
    '    <span ng-if="value.instance == \'Array\' && value.schema"><strong>{{schema[key].displayName || key}}:</strong>\n' +
    '    <div ng-repeat="(dataIndex, dataObject) in object[key] track by $index">\n' +
    '      <table style="width:100%">\n' +
    '      <td><div ng-repeat="customObject in [value.schema.paths] track by $index" style="margin-left:150px">\n' +
    '        <div class="col-sm-8" schema-show object="object[key][dataIndex]" Admin="admin" schema="customObject" relationshipObjects="relationshipobjects" ctrl="ctrl"></div>\n' +
    '      </div></td>\n' +
    '      </table>\n' +
    '      <hr>\n' +
    '    </div>\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- Number -->\n' +
    '    <span ng-if="value.instance == \'Number\'"><strong>{{schema[key].displayName || key}}:</strong> {{object[key]}}</span>\n' +
    '\n' +
    '    <!-- Date -->\n' +
    '    <span ng-if="value.instance == \'Date\'"><strong>{{schema[key].displayName || key}}:</strong> {{object[key] | date:"MM/dd/yyyy \'at\' h:mma"}}</span> \n' +
    '\n' +
    '    <!-- Children -->\n' +
    '    <span ng-if="key == \'children\'">\n' +
    '      <strong>{{schema[key].displayName || key}}:</strong>\n' +
    '      <span ng-repeat="classType in value">\n' +
    '        <a ui-sref="admin-list({\n' +
    '            className: classType,\n' +
    '            filter: object._id,\n' +
    '            filterClass: Admin.className\n' +
    '          })" class="text-muted">{{ classType }}</a><span ng-if="!$last">,</span>\n' +
    '      </span>\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- wysiwyg -->\n' +
    '\n' +
    '    <span ng-if="value.instance == \'wysiwyg\'">\n' +
    '    <strong>{{schema[key].displayName || key}}:</strong>\n' +
    '    <div ng-bind-html="ctrl.renderHtml(object[key])"></div>\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- Array -->\n' +
    '    <span ng-if="key != \'children\' && value.instance == \'Array\' && !value.schema"><strong>{{schema[key].displayName || key}}:</strong> {{object[key].join(\', \')}}</span>\n' +
    '\n' +
    '    <!-- Relationships -->\n' +
    '    <span ng-if="value.instance == \'Relationships\'">\n' +
    '      <strong>{{schema[key].displayName || key}}:</strong>\n' +
    '      <span ng-repeat="objectId in object[key]">\n' +
    '        <a ui-sref="admin-show({\n' +
    '            className: schema[schema[key].relationshipKey].options.ref, \n' +
    '            id: objectId\n' +
    '          })" class="text-muted">{{objectId}}</a><span ng-if="!$last">,</span>\n' +
    '      </span>\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- Image -->\n' +
    '    <span ng-if="value.instance == \'Image\'">\n' +
    '      <strong>{{schema[key].displayName || key}}:</strong> \n' +
    '      <img ng-if="object[key].hostedType && object[key].hostedType == \'external\'" ng-src="{{object[key].styles.thumb_square}}" style="max-width: 200px; max-height: 200px;">\n' +
    '      <img ng-if="object[key] && (!object[key].hostedType || object[key].hostedType == \'local\')" ng-src="{{Admin.constant.AWS_S3_BASE_URL}}/{{object[key].styles.thumb_square}}" style="max-width: 200px; max-height: 200px;">\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- Boolean -->\n' +
    '    <span ng-if="value.instance == \'Boolean\'">\n' +
    '      <strong>{{schema[key].displayName || key}}:</strong> \n' +
    '      <i ng-if="object[key]" class="fa fa-check-circle"></i>\n' +
    '      <i ng-if="!object[key]" class="fa fa-times-circle"></i>\n' +
    '    </span>   \n' +
    '  </li>\n' +
    '</ul>');
}]);
})();
