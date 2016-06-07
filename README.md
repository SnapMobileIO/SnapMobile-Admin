# SnapMobile-Admin
A npm module to include the SnapMobile Admin Panel

# Usage

Include this private module by adding the following under `dependencies` in `package.json`, and run `npm install`.

    "snapmobile-admin": "git+ssh://@github.com/SnapMobileIO/SnapMobile-Admin.git",

To configure, add the following to `app.js`:

    import 'snapmobile-admin';
    import 'angular-ui-tinymce';
    
Add 'adminApp' as a dependency for the angular app.

### Configuring sidebar

Add the following to `app.js`:

    .factory('adminConfiguration', function() {
     var adminService = {
         sidebarItems: constant.GLOBAL.SIDEBAR_ITEMS
       };
       return adminService;
     })

SIDEBAR_ITEMS should be a constant in the form:

    [{
        title: "Companies",
        icon: "mobile",
        class: "Company"
      }...]
      
where `icon` is any Font Awesome icon class (without "fa").

#### Display child objects

To display child objects of a Class, add `children:  ['ClassName'...]` to its schema in `ADMIN_SCHEMA_OPTIONS`.

#### Using wysiwyg

To use the wysiwyg editor, add the following to `index.html`:

    <script type="text/javascript" src="//tinymce.cachefly.net/4.0/tinymce.min.js"></script>
    
To use the editor for a class property, add `field: { instance: 'wysiwyg' }` to its schema in `ADMIN_SCHEMA_OPTIONS`.

# Updating

Make any changes in `/src`.

Once changes are completed, run `gulp dist` to process JavaScript and HTML files and add to `/dist`.
