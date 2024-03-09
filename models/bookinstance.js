const mongoose = require("mongoose");
const luxon = require("luxon");
const Schema = mongoose.Schema;
const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return luxon.DateTime.fromJSDate(this.due_back).toLocaleString(
    luxon.DateTime.DATE_MED
  );
});
BookInstanceSchema.virtual("due_back_yyyy_mm_dd").get(function () {
  // return luxon.DateTime.fromJSDate(this.due_back).toFormat("y-M-d");
  // we use MM and DD to make sure it's a 2 digit number for date input, 01 not just 1
  // REFERENCE: https://support.smartbear.com/testcomplete/docs/reference/program-objects/utilities/date-and-time-format-specifiers.html
  return luxon.DateTime.fromJSDate(this.due_back).toFormat("y-MM-dd");
});
// Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
