class Validator {
  static validation(task) {
    if (
      task.hasOwnProperty("title") &&
      task.hasOwnProperty("desciption") &&
      task.title.trim() !== "" && // Check if title is not empty after trimming
      task.description.trim() !== "" && // Check if description is not empty after trimming
      task.hasOwnProperty("flag")
    )
      return { status: true, message: "Task has been created" };
    else return { status: false, message: "Validation failed" };
  }
}

module.exports = Validator;
