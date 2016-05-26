var module = angular.module('adminApp');
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('admin/views/show.html',
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
    '            <li class="list-group-item" ng-repeat="(key, value) in ctrl.Admin.schema" ng-if="value.instance">\n' +
    '\n' +
    '              <!-- String or ID -->\n' +
    '              <span ng-if="value.instance == \'String\' || key == \'_id\'"><strong>{{key}}:</strong> {{ctrl.object[key]}}</span>\n' +
    '\n' +
    '              <!-- ObjectID that isn\'t the object ID -->\n' +
    '              <span ng-if="value.instance == \'ObjectID\' && key != \'_id\'">\n' +
    '                <strong>{{key}}:</strong> \n' +
    '                <a ui-sref="admin-show({ \n' +
    '                              className: ctrl.Admin.schema[key].options.ref, \n' +
    '                              id: ctrl.object[key] \n' +
    '                            })" class="text-muted">{{ctrl.object[key]}}</a>\n' +
    '              </span>\n' +
    '\n' +
    '              <!-- Mixed -->\n' +
    '              <span ng-if="value.instance == \'Mixed\'"><strong>{{key}}:</strong> <pre>{{ctrl.object[key]}}</pre></span>\n' +
    '\n' +
    '              <!-- Number -->\n' +
    '              <span ng-if="value.instance == \'Number\'"><strong>{{key}}:</strong> {{ctrl.object[key]}}</span>\n' +
    '\n' +
    '              <!-- Date -->\n' +
    '              <span ng-if="value.instance == \'Date\'"><strong>{{key}}:</strong> {{ctrl.object[key] | date:"MM/dd/yyyy \'at\' h:mma"}}</span> \n' +
    '\n' +
    '              <!-- Array -->\n' +
    '              <span ng-if="value.instance == \'Array\'"><strong>{{key}}:</strong> {{ctrl.object[key].join(\', \')}}</span>\n' +
    '\n' +
    '              <!-- Image -->\n' +
    '              <span ng-if="value.instance == \'Image\'">\n' +
    '                <strong>{{key}}:</strong> \n' +
    '                <img ng-src="{{ctrl.Admin.constant.AWS_S3_BASE_URL}}/{{ctrl.object[key].styles.thumb_square}}" ng-if="ctrl.object[key]" style="max-width: 200px; max-height: 200px;">\n' +
    '              </span>\n' +
    '\n' +
    '              <!-- Boolean -->\n' +
    '              <span ng-if="value.instance == \'Boolean\'">\n' +
    '                <strong>{{key}}:</strong> \n' +
    '                <i ng-if="ctrl.object[key]" class="fa fa-check-circle"></i>\n' +
    '                <i ng-if="!ctrl.object[key]" class="fa fa-times-circle"></i>\n' +
    '              </span>        \n' +
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
