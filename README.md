# SnapMobile-Admin
A npm module to include the SnapMobile Admin Panel

# Usage

Include this private module by adding the following under `dependencies` in `package.json`, and run `npm install`.

    "snapmobile-admin": "git+https://62c8578b25fe85a6cd679783c834bee2ece03e39:x-oauth-basic@github.com/SnapMobileIO/SnapMobile-Admin.git",

To configure, add the following to `app.js`:

    import 'snapmobile-admin';
    
Finally, add 'adminApp' as a dependency for the angular app.

# Updating

Make any changes in `/src`.

Once changes are completed, run `gulp dist` to process JavaScript and HTML files and add to `/dist`.
