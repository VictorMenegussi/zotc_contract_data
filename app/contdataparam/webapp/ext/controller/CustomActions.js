sap.ui.define([
  "sap/m/MessageToast",
  "sap/ui/core/message/Message",
  "sap/ui/core/Messaging"
], function (MessageToast, Message, Messaging, PDFViewer, CodeEditor) {
  "use strict";

  return {  
    runBackGroundUpdate: function(oEvent) {
      console.log("running background update...");
    },  
    runHelperUpdate: function(oEvent) {
      console.log("running background update...");
    }, 
    uploadData: function(oEvent) {
        console.log("Upload Data action triggered");
    }
  }
})
