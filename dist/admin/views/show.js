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
    '          <ul class="list-group">\n' +
    '            <li class="list-group-item" ng-repeat="(key, value) in ctrl.Admin.schema" ng-if="key !== \'displayName\' && key !== \'displayKey\' && value.instance !== \'Hidden\'">\n' +
    '\n' +
    '              <!-- String or ID -->\n' +
    '              <span ng-if="value.instance == \'String\' || key == \'_id\'"><strong>{{ctrl.Admin.schema[key].displayName || key}}:</strong> {{ctrl.object[key]}}</span>\n' +
    '\n' +
    '              <!-- ObjectID that isn\'t the object ID -->\n' +
    '              <span ng-if="value.instance == \'ObjectID\' && key != \'_id\'">\n' +
    '                <strong>{{ctrl.Admin.schema[key].displayName || key}}:</strong> \n' +
    '                <a ui-sref="admin-show({ \n' +
    '                              className: ctrl.Admin.schema[key].options.ref, \n' +
    '                              id: ctrl.object[key] \n' +
    '                            })" class="text-muted">{{ctrl.object[key]}}</a>\n' +
    '              </span>\n' +
    '\n' +
    '              <!-- Mixed -->\n' +
    '              <span ng-if="value.instance == \'Mixed\'"><strong>{{ctrl.Admin.schema[key].displayName || key}}:</strong> <pre>{{ctrl.object[key] | json}}</pre></span>\n' +
    '\n' +
    '              <!-- Number -->\n' +
    '              <span ng-if="value.instance == \'Number\'"><strong>{{ctrl.Admin.schema[key].displayName || key}}:</strong> {{ctrl.object[key]}}</span>\n' +
    '\n' +
    '              <!-- Date -->\n' +
    '              <span ng-if="value.instance == \'Date\'"><strong>{{ctrl.Admin.schema[key].displayName || key}}:</strong> {{ctrl.object[key] | date:"MM/dd/yyyy \'at\' h:mma"}}</span> \n' +
    '\n' +
    '              <!-- Children -->\n' +
    '              <span ng-if="key == \'children\'">\n' +
    '                <strong>{{ctrl.Admin.schema[key].displayName || key}}:</strong>\n' +
    '                <span ng-repeat="classType in value">\n' +
    '                  <a ui-sref="admin-list({\n' +
    '                      className: classType,\n' +
    '                      filter: ctrl.object._id,\n' +
    '                      filterClass: ctrl.Admin.className\n' +
    '                    })" class="text-muted">{{ classType }}</a><span ng-if="!$last">,</span>\n' +
    '                </span>\n' +
    '              </span>\n' +
    '\n' +
    '              <!-- Array -->\n' +
    '              <span ng-if="key != \'children\' && value.instance == \'Array\'"><strong>{{ctrl.Admin.schema[key].displayName || key}}:</strong> {{ctrl.object[key].join(\', \')}}</span>\n' +
    '\n' +
    '              <!-- Relationships -->\n' +
    '              <span ng-if="value.instance == \'Relationships\'">\n' +
    '                <strong>{{ctrl.Admin.schema[key].displayName || key}}:</strong>\n' +
    '                <span ng-repeat="objectId in ctrl.object[key]">\n' +
    '                  <a ui-sref="admin-show({\n' +
    '                      className: ctrl.Admin.schema[ctrl.Admin.schema[key].relationshipKey].options.ref, \n' +
    '                      id: objectId\n' +
    '                    })" class="text-muted">{{objectId}}</a><span ng-if="!$last">,</span>\n' +
    '                </span>\n' +
    '              </span>\n' +
    '\n' +
    '              <!-- Image -->\n' +
    '              <span ng-if="value.instance == \'Image\'">\n' +
    '                <strong>{{ctrl.Admin.schema[key].displayName || key}}:</strong> \n' +
    '                <img ng-if="ctrl.object[key].hostedType && ctrl.object[key].hostedType == \'external\'" ng-src="{{ctrl.object[key].styles.thumb_square}}" style="max-width: 200px; max-height: 200px;">\n' +
    '                <img ng-if="ctrl.object[key] && (!ctrl.object[key].hostedType || ctrl.object[key].hostedType == \'local\')" ng-src="{{ctrl.Admin.constant.AWS_S3_BASE_URL}}/{{ctrl.object[key].styles.thumb_square}}" style="max-width: 200px; max-height: 200px;">\n' +
    '              </span>\n' +
    '\n' +
    '              <!-- Boolean -->\n' +
    '              <span ng-if="value.instance == \'Boolean\'">\n' +
    '                <strong>{{ctrl.Admin.schema[key].displayName || key}}:</strong> \n' +
    '                <i ng-if="ctrl.object[key]" class="fa fa-check-circle"></i>\n' +
    '                <i ng-if="!ctrl.object[key]" class="fa fa-times-circle"></i>\n' +
    '              </span>   \n' +
    '            </li>\n' +
    '          </ul>\n' +
    '\n' +
    '        </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
})();
