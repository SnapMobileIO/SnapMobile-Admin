# SnapMobile-Admin
A npm module to include the SnapMobile Admin Panel

# Usage

Include this private module by adding the following under `dependencies` in `package.json`, and run `npm install`.

    "snapmobile-admin": "git+ssh://@github.com/SnapMobileIO/SnapMobile-Admin.git",

To configure, add the following to `app.js`:

    import 'snapmobile-admin';
    
Add 'adminApp' as a dependency for the angular app.

Finally, configure the sidebar items:

    .factory('adminConfiguration', function() {
     var adminService = {
         sidebarItems: constant.GLOBAL.SIDEBAR_ITEMS
       };
       return adminService;
     })

SIDEBAR_ITEMS should be in the form:

    [{
        title: "Companies",
        icon: "mobile",
        class: "Company"
      }...]
      
where `icon` is any Font Awesome icon class (without "fa").

# Updating

Make any changes in `/src`.

Once changes are completed, run `gulp dist` to process JavaScript and HTML files and add to `/dist`.
