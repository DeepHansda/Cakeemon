class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // search
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({
      ...keyword,
    });

    // console.log(this.query);
    return this;
  }

  // filter

  filter() {
    const mainQueryStr = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];
    for (var key in this.queryStr) {
      if (this.queryStr[key] == "") {
        removeFields.push(key);
      }
    }
    removeFields.forEach((key) => {
      delete mainQueryStr[key];
    });

    let queryStr = JSON.stringify(mainQueryStr);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // pagination

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
