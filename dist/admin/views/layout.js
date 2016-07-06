(function(module) {
try {
  module = angular.module('adminApp');
} catch (e) {
  module = angular.module('adminApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app/admin/views/layout.html',
    '<div class="admin-layout">\n' +
    '  <div class="wrapper">\n' +
    '\n' +
    '  <!-- Navbar -->\n' +
    '  <nav class="navbar navbar-default navbar-fixed-top">\n' +
    '    <div class="container-fluid">\n' +
    '      <!-- Brand and toggle get grouped for better mobile display -->\n' +
    '      <div class="navbar-header">\n' +
    '        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false" ng-init="isCollapsed=true" ng-click="isCollapsed = !isCollapsed">\n' +
    '          <span class="sr-only">Toggle navigation</span>\n' +
    '          <span class="icon-bar"></span>\n' +
    '          <span class="icon-bar"></span>\n' +
    '          <span class="icon-bar"></span>\n' +
    '        </button>\n' +
    '        <a class="navbar-brand" ui-sref="admin-list({ className: \'User\' })">&nbsp;</a>\n' +
    '      </div>\n' +
    '\n' +
    '      <!-- Collect the nav links, forms, and other content for toggling -->\n' +
    '      <div uib-collapse="isCollapsed" class="collapse navbar-collapse" id="navbar-collapse">\n' +
    '        <ul class="nav navbar-nav navbar-right">\n' +
    '\n' +
    '          <!-- These are only displayed when the nav is collapsed -->\n' +
    '          <li ng-repeat="item in ctrl.sidebarItems" class="collapsed-display">\n' +
    '            <a ng-click="ctrl.goToUrl(item)" ng-class="{\'active\': ctrl.Admin.className == item.class}">\n' +
    '              <i class="fa fa-{{ item.icon }} fa=fw"></i>&nbsp;&nbsp; {{ item.title }}\n' +
    '            </a>\n' +
    '          </li>\n' +
    '\n' +
    '          <!-- Single button -->\n' +
    '          <li class="dropdown" uib-dropdown>\n' +
    '            <a id="single-button" type="button" class="dropdown-toggle" uib-dropdown-toggle ng-disabled="disabled">\n' +
    '              <span ng-if="currentUser">Logged in <span ng-if="currentUser.displayName">as {{currentUser.displayName}}</span></span> <span class="caret"></span>\n' +
    '              <span ng-if="!currentUser">Not Logged In <span class="caret"></span></span>\n' +
    '            </a>\n' +
    '            <ul class="dropdown-menu" uib-dropdown-menu role="menu" aria-labelledby="single-button">\n' +
    '              <li ng-if="currentUser" role="menuitem"><a ui-sref="logout">Logout</a></li>\n' +
    '              <li ng-if="!currentUser" role="menuitem"><a ui-sref="login">Login</a></li>\n' +
    '            </ul>\n' +
    '          </li>\n' +
    '\n' +
    '        </ul>\n' +
    '      </div><!-- /.navbar-collapse -->\n' +
    '    </div><!-- /.container-fluid -->\n' +
    '  </nav>\n' +
    '\n' +
    '  <!-- Sidebar -->\n' +
    '  <div class="sidebar-wrapper">\n' +
    '    <ul class="sidebar-nav">\n' +
    '      <li role="separator" class="divider">Navigation</li>\n' +
    '      <li ng-repeat="item in ctrl.sidebarItems">\n' +
    '        <a ng-click="ctrl.goToUrl(item)" ng-class="{\'active\': ctrl.Admin.className == item.class}">\n' +
    '          <i class="fa fa-{{ item.icon }} fa=fw"></i>&nbsp;&nbsp; {{ item.title }}\n' +
    '        </a>\n' +
    '      </li>\n' +
    '    </ul>\n' +
    '  </div>\n' +
    '  <!-- /#sidebar-wrapper -->\n' +
    '\n' +
    '  <!-- Page Content -->\n' +
    '  <div class="page-content-wrapper">\n' +
    '    <div ui-view></div>\n' +
    '  </div>\n' +
    '\n' +
    '</div>\n' +
    '</div>\n' +
    '');
}]);
})();
