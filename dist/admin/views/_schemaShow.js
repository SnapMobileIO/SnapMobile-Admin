(function(module) {
try {
  module = angular.module('adminApp');
} catch (e) {
  module = angular.module('adminApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/admin/views/_schemaShow.html',
    '<ul class="list-group custom-form">\n' +
    '  <li class="list-group-item" ng-repeat="(key, value) in schema track by $index" ng-if="key !== \'displayName\' && key !== \'displayKey\' && value.instance !== \'Hidden\'">\n' +
    '\n' +
    '    <!-- String or ID -->\n' +
    '    <span ng-if="value.instance == \'String\' || key == \'_id\'"><strong>{{schema[key].displayName || key}}:</strong> {{object[key]}}</span>\n' +
    '\n' +
    '    <!-- ObjectID that isn\'t the object ID -->\n' +
    '    <span ng-if="value.instance == \'ObjectID\' && key != \'_id\'">\n' +
    '      <strong>{{schema[key].displayName || key}}:</strong>\n' +
    '      <a ui-sref="admin-show({\n' +
    '                    className: schema[key].options.ref,\n' +
    '                    id: (object[key]._id || object[key])\n' +
    '                  })">{{(object[key][schema[key].displayKey] || object[key] )}}</a>\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- Mixed -->\n' +
    '    <span ng-if="value.instance == \'Mixed\'">\n' +
    '      <pre>{{object[key] | json}}</pre>\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- Custom object type -->\n' +
    '    <div ng-if="value.instance === \'CustomObject\'">\n' +
    '      <div class="row">\n' +
    '        <div class="col-sm-1">\n' +
    '          <label for="{{key}}">{{schema[key].displayName || key}}</label>\n' +
    '        </div>\n' +
    '        <div class="col-sm-11">\n' +
    '          <div class="row">\n' +
    '            <div class="col-sm-12 custom-object" schema-show object="object[key]" Admin="admin" schema="value.schema.paths" ctrl="ctrl"></div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <!-- Array -->\n' +
    '    <span ng-if="value.instance == \'Array\' && value.schema">\n' +
    '      <div class="row">\n' +
    '          <div class="col-sm-1">\n' +
    '            <strong class="text-wordwrap">{{schema[key].displayName || key}}:</strong>\n' +
    '          </div>\n' +
    '          <div class="col-sm-11">\n' +
    '            <div ng-repeat="(dataIndex, dataObject) in object[key] track by $index" class="custom-object">\n' +
    '              <div class="row">\n' +
    '                <div ng-repeat="customObject in [value.schema.paths] track by $index">\n' +
    '                  <div class="col-sm-12" schema-show object="object[key][dataIndex]" Admin="admin" schema="customObject" ctrl="ctrl"></div>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '      </div>\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- ImagesArray -->\n' +
    '    <span ng-if="value.instance === \'ImagesArray\'">\n' +
    '      <div class="row">\n' +
    '        <div class="col-sm-1">\n' +
    '          <strong class="text-wordwrap">{{schema[key].displayName || key}}:</strong>\n' +
    '        </div>\n' +
    '        <div class="col-sm-11">\n' +
    '          <div ng-repeat="image in object[key] track by $index" class="array-img padding-right-1x">\n' +
    '            <img ng-if="image.hostedType && image.hostedType === \'external\'" ng-src="{{image.styles.thumb_square}}" style="width: 100%">\n' +
    '            <img ng-if="image && (!image.hostedType || image.hostedType === \'local\')" ng-src="{{ctrl.Admin.constant.AWS_S3_BASE_URL}}/{{image.styles.thumb_square}}" style="width: 100%">\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- Number -->\n' +
    '    <span ng-if="value.instance == \'Number\'"><strong>{{schema[key].displayName || key}}:</strong> {{object[key]}}</span>\n' +
    '\n' +
    '    <!-- Date -->\n' +
    '    <span ng-if="value.instance == \'Date\'"><strong>{{schema[key].displayName || key}}:</strong> {{object[key] | date:"MM/dd/yyyy \'at\' h:mma"}}</span>\n' +
    '\n' +
    '    <!-- Children -->\n' +
    '    <span ng-if="key == \'children\'">\n' +
    '      <strong>{{schema[key].displayName || key}}:</strong>\n' +
    '      <span ng-repeat="classType in value track by $index">\n' +
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
    '      <span ng-repeat="object in object[key] track by $index">\n' +
    '        <a ui-sref="admin-show({\n' +
    '            className: schema[key].relationshipClass,\n' +
    '            id: (object._id || object)\n' +
    '          })" class="text-muted">{{object[schema[key].displayKey] || object._id || object}}</a><span ng-if="!$last">,</span>\n' +
    '      </span>\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- Image -->\n' +
    '    <span ng-if="value.instance == \'Image\'">\n' +
    '      <strong>{{schema[key].displayName || key}}:</strong>\n' +
    '      <img ng-if="object[key].hostedType && object[key].hostedType == \'external\'" ng-src="{{object[key].styles.thumb_square}}" style="max-width: 200px; max-height: 200px;">\n' +
    '      <img ng-if="object[key] && (!object[key].hostedType || object[key].hostedType == \'local\')" ng-src="{{Admin.constant.AWS_S3_BASE_URL}}/{{object[key].styles.thumb_square}}" style="max-width: 200px; max-height: 200px;">\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- File -->\n' +
    '    <span ng-if="value.instance == \'File\'">\n' +
    '      <strong>{{schema[key].displayName || key}}:</strong><br>\n' +
    '      <span ng-if="object[key].name && object[key].url" class="text-wordwrap"><strong>Name:</strong> <a ng-href="{{ctrl.Admin.constant.AWS_S3_BASE_URL}}/{{object[key].url}}" target="_blank">{{object[key].name}}</a></span>\n' +
    '      <br>\n' +
    '      <span ng-if="object[key].type" class="text-wordwrap"><strong>Type:</strong> {{object[key].type}}</span>\n' +
    '      <br>\n' +
    '      <span ng-if="object[key].size" class="text-wordwrap"><strong>size: </strong> {{object[key].size}}</span>\n' +
    '    </span>\n' +
    '\n' +
    '    <!-- Boolean -->\n' +
    '    <span ng-if="value.instance == \'Boolean\'">\n' +
    '      <strong>{{schema[key].displayName || key}}:</strong>\n' +
    '      <i ng-if="object[key]" class="fa fa-check-circle"></i>\n' +
    '      <i ng-if="!object[key]" class="fa fa-times-circle"></i>\n' +
    '    </span>\n' +
    '  </li>\n' +
    '</ul>');
}]);
})();
