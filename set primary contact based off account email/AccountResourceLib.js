// Best practice is to establish window namespaces for your code; doing so here
var afs_account_js = window.afs_account_js || {};

(function () {
  // Function to bind to the onSave event of the account form
  this.emailOnSave = function (executionContext) {
    const formContext = executionContext.getFormContext();
    const pcEmail = formContext.getAttribute("emailaddress1").getValue();

    // Escape if email has not been set
    if (!pcEmail) return;

    // Establish XML query for getting any contacts that have the same email as the one entered on the Account
    const fetchXML = "?$filter=emailaddress1 eq '" + pcEmail + "'";
    try {
      Xrm.WebApi.retrieveMultipleRecords("contact", fetchXML).then(
        (res) => {
          const contact = res.entities[0];
          console.log(contact);

          const newContact = new Array();
          newContact[0] = new Object();

          newContact[0].id = contact.contactid;
          newContact[0].entityType = "contact";
          newContact[0].name = contact.fullname;

          formContext.getAttribute("primarycontactid").setValue(newContact);
        },
        (error) => {
          console.error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
}.call(afs_account_js));
