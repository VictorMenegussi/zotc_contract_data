sap.ui.define([
    'sap/ui/core/mvc/ControllerExtension',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/BusyIndicator',
    'sap/m/library',
    'sap/ui/core/Element',
    'sap/m/MessageBox',
    'contdataparam/app/contdataparam/xlsx'
], function (ControllerExtension,
    JSONModel,
    BusyIndicator,
    mlibrary,
    Element,
    MessageBox,
    XLSX) {
    'use strict';
    const PAGE_ID = 'contdataparam::ContractDataParametersList--fe';
    const TABLE_ID = PAGE_ID + '::table::ContractDataParameters::LineItem';
    const BUTTON_ID = TABLE_ID + '::CustomAction::upload';

    console.log('netproduction.ext.controller.MainExtension.js loaded')

    let _files = [];

    return ControllerExtension.extend('netproduction.ext.controller.MainExtension', {
        override: {
            onAfterRendering: function () {
                const api = this.base.getExtensionAPI();
                const oView = api._view;
                const oUploadButton = oView.byId(BUTTON_ID);
                oUploadButton.attachPress(this.onUploadFile.bind(this));
            }
        },
        onUploadFile: function () {
            const oView = this.getView();
            const api = this.base.getExtensionAPI();
            if (!this.oFileUploaderDialog) {
                api.loadFragment({
                    name: 'contdataparam.ext.dialog.fileUploader',
                    controller: this
                }).catch((err) => console.log(err))
                    .then(function (oDialog) {
                        this.oFileUploaderDialog = oDialog;
                        oView.addDependent(this.oFileUploaderDialog);
                        this.oFileUploaderDialog.open();
                    }.bind(this));
            } else {
                this.oFileUploaderDialog.open();
            }
        },
        onFileChange: function (oEvent) {
            const eventFiles = oEvent.getParameter('files');
            _files = eventFiles;
        },
        onSendFileToBackend: function () {
            const busyDialog = new sap.m.BusyDialog({
                title: "Processing",
                text: "Please wait...",
                showCancelButton: false
            });
            busyDialog.open();
            this.readFileAsArrayBuffer(_files[0]).then((content) => {
                const workbook = XLSX.read(new Uint8Array(content), { type: 'array' })
                const [firstSheetName] = workbook.SheetNames
                const worksheet = workbook.Sheets[firstSheetName]
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
                const result = []
                let duplicates = []
                let seen = new Set()
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i]
                    const key = `${row[0].toString()}|${row[1].toString()}`
                    if (seen.has(key)) {
                        duplicates.push({
                            Vkorg: row[0].toString(),
                            Kunnr: row[1].toString(),
                        })
                    } else {
                        seen.add(key)
                        const obj = {
                            Vkorg: row[0].toString(),
                            Kunnr: row[1].toString(),
                            Erdat: typeof row[2] === 'number' ? this.excelDateToISO(row[2]) : null,
                            Days: row[3] == null ? 0 : parseInt(row[3]),
                            OneMonth: this.toBoolean(row[4])
                        }
                        result.push(obj)
                    }
                }
                const body = { contracts: result }
                console.log('File read as ArrayBuffer:', JSON.stringify(body))
                const serviceUrl = this.getView().getModel().sServiceUrl
                if (duplicates.length > 0) {
                    MessageBox.confirm(`Duplicate Keys found and removed. Continue?`, {
                        onClose: (oAction) => {
                            if (oAction == 'CANCEL') {
                                busyDialog.close()
                                if (this.oFileUploaderDialog) {
                                    this.oFileUploaderDialog.close();
                                }
                            } else if (oAction == 'OK') {
                                this.uploadContracts(serviceUrl, body, busyDialog)
                            }
                        }
                    })
                } else {
                    this.uploadContracts(serviceUrl, body, busyDialog)
                }
                if (this.oFileUploaderDialog) {
                    this.oFileUploaderDialog.close();
                }
            })
        },
        onDialogCancelButtonPress: function () {
            if (this.oFileUploaderDialog) {
                this.oFileUploaderDialog.close();
            }
        },
        readFileAsArrayBuffer(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsArrayBuffer(file);
            });
        },
        excelDateToISO: function (serial) {
            const utcDays = Math.floor(serial - 25569)
            const utcValue = utcDays * 86400
            const date = new Date(utcValue * 1000)
            return date.toISOString().split('T')[0]
        },
        toBoolean: function (value) {
            const trueWords = new Set([
                '1', 'yes', 'sim', 'si', 'oui', 'ja', 'sí', 'hai', 'evet', 'da', 'aye', 'igen', 'ano', 'ye', 'ken', 'oo', 'ae', 'tak'
            ]);
            if (typeof value === 'string') { return trueWords.has(value.trim().toLowerCase()) ? 1 : 0 }
            if (typeof value === 'number') { return value === 1 ? 1 : 0 }
            if (typeof value === 'boolean') { return value ? 1 : 0 }
            return 0;
        },
        uploadContracts: async function (serviceUrl, body, busyDialog) {
            fetch(serviceUrl + 'UploadContractData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(async (response) => {
                let text = await response.text();
                console.log('fetch response', text)
                MessageBox.success("Operation completed successfully!")
            }).catch(error => {
                console.error('raise error', error);
                MessageBox.error("Something went wrong. Please try again.")
            }).finally(() => {
                busyDialog.close();
            });
        }
    })
})