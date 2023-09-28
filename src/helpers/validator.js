class Validator {
  static validation(task) {
    if (
      task.hasOwnProperty("title") &&
      task.hasOwnProperty("desciption") &&
      task.hasOwnProperty("flag")
    )
      return { status: true, message: "Task has been created" };
    else return { status: false, message: "Validation failed" };
  }
}

module.exports = Validator;
