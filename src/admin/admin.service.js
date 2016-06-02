'use strict';

class Admin {

  constructor($http, $httpParamSerializer, _, constant) {
    this.$http = $http;
    this.$httpParamSerializer = $httpParamSerializer;
    this._ = _;
    this.constant = constant;

    this.className;
    this.schema;
  }

  loadSchema(id) {
    return this.$http.get(`/api/admin/${this.className}/schema`)
      .then((response) => {
          this.schema = response.data;

          // Overwrite the schema properties for any UI changes (set in /config/constants.js)
          this._.merge(this.schema, this.constant.ADMIN_SCHEMA_OPTIONS[this.className]);

          // Return updated schema to be used in promise if needed
          return this.schema;
        });
  }

  find(id) {
    return this.$http.get(`/api/admin/${this.className}/` + id);
  }

  query(params) {
    let className = params.className || this.className;
    let queryUrl = `/api/admin/${className}?` + this.$httpParamSerializer(params);
    return this.$http.get(queryUrl);
  }

  create(object) {
    return this.$http.post(`/api/admin/${this.className}`, object);
  }

  update(object) {
    return this.$http.put(`/api/admin/${this.className}/` + object._id, object);
  }

  delete(id) {
    return this.$http.delete(`/api/admin/${this.className}/` + id);
  }

  deleteMultiple(ids) {
    let requestUrl = `/api/admin/${this.className}/deleteMultiple`;
    return this.$http.post(requestUrl, { ids: ids });
  }

  importFromCsv(object) {
    return this.$http.post(`/api/admin/${this.className}/importFromCsv`, object);
  }

}

export { Admin };
