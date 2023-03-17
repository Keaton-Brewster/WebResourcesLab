var AccountFieldControls = window.AccountFieldControls || {};

(function () {
  this.passContextOnLoad = function (executionContext) {
    const formContext = executionContext.getFormContext();

    const wrCtrl = formContext.getControl("WebResource_fieldlock_button");

    if (wrCtrl !== null && wrCtrl !== undefined) {
      wrCtrl.getContentWindow().then(function (win) {
        win.InitButton(executionContext);
      });
    }
  };
}.call(AccountFieldControls));
