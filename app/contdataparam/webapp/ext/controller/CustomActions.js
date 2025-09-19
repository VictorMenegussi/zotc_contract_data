sap.ui.define([
  "sap/m/MessageToast",
  "sap/ui/core/message/Message",
  "sap/ui/core/Messaging"
], function (MessageToast, Message, Messaging, PDFViewer, CodeEditor) {
  "use strict";

  return {    
    uploadData: function(oEvent) {
        console.log("Upload Data action triggered");
    }    
  }
})
