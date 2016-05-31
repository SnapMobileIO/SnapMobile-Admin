"use strict";

var admin = require('./dist/admin');

module.exports = {
	iconType: {
		DASHBOARD : "dashboard",
		USERS: "users",
		MOBILE: "mobile"
	},
	sidebarItems: function(items) {
		admin.sidebarItems(items);
	}
}