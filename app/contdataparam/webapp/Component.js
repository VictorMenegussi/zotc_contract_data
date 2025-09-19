sap.ui.loader.config({
    paths: {
        'contdataparam/app/contdataparam/xlsx':
            'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min'
    },
    shim: {
        'contdataparam/app/contdataparam/xlsx': {
            amd: true,
            exports: 'XLSX'
        }
    },
    async: true
});
sap.ui.define(
    ["sap/fe/core/AppComponent"],
    function (Component) {
        "use strict";

        return Component.extend("contdataparam.Component", {
            metadata: {
                manifest: "json"
            }
        });
    }
);