const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// creates a virtual attribute with getters and setters
AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.first_name} ${this.family_name}`;
  }

  return fullname;
});

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("lifeline").get(function () {
  return `${
    this.date_of_birth
      ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(
          DateTime.DATE_MED
        )
      : "Not available"
  } - ${this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : "present"}`;
});

AuthorSchema.virtual("date_of_death_fmt").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toFormat('y-MM-dd')
});
AuthorSchema.virtual("date_of_birth_fmt").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toFormat('y-MM-dd')
});
module.exports = mongoose.model("Author", AuthorSchema);
