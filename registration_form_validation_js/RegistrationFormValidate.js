function ValidateStudentField(executionContext) {
  const formContext = executionContext.getFormContext();
  const recordId = formContext.data.entity.getId();

  const studentField = formContext.getAttribute("crdae_student");
  const studentValue = studentField.getValue();

  if (!studentValue) {
    formContext.ui.setFormNotification(
      "A student is required in order to save this record",
      "ERROR",
      "studentError"
    );
  } else {
    formContext.ui.clearFormNotification("studentError");
  }

  console.log(studentValue);
}

function ValidateClassField(executionContext) {
  const formContext = executionContext.getFormContext();
  const recordId = formContext.data.entity.getId();

  const classField = formContext.getAttribute("crdae_class");
  const classValue = classField.getValue();

  if (!classValue) {
    formContext.ui.setFormNotification(
      "A class is required in order to save this record",
      "ERROR",
      "classError"
    );
  } else {
    formContext.ui.clearFormNotification("classError");
  }

  console.log(classValue);
}
