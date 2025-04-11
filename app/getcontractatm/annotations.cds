using OrderService as service from '../../srv/service';
annotate service.OrderItemDetails with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Sales Document',
                Value : Vbeln,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Item Number',
                Value : Posnr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Sales Organization',
                Value : Vkorg,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Customer Number',
                Value : Kunnr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Material Number',
                Value : Matnr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Material Description',
                Value : Arktx,
            }, 
            {
                $Type : 'UI.DataField',
                Label : 'Quantity',
                Value : Kmeng,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Customer Purchase Order Number',
                Value : Bstkd,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Creation Date',
                Value : Erdat,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Fixed Quantity Date',
                Value : Fixmg,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Created by User',
                Value : Ernam,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Billing Block',
                Value : Faksk,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Overall Status',
                Value : Gbstk,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status Description',
                Value : GbstkDesc,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Net Price',
                Value : Netpr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Net Value',
                Value : Netwr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Pricing Date',
                Value : Prsdt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Subsequent Document',
                Value : VbelnSdr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Reference Document',
                Value : VbelnRdm,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Billing Date',
                Value : Fkdat,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Billing Net Value',
                Value: NetwrBilling,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Billing Currency',
                Value : WaerkBilling,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Accounting Document Number',
                Value : Belnr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Accounting Net Value',
                Value : NetwrAcc,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Accounting Currency',
                Value : WaerkAcc,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Valid From Date',
                Value : Datab,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Valid To Date',
                Value : Datbi,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
            {
                $Type : 'UI.DataField',
                Label : 'Sales Document',
                Value : Vbeln,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Item Number',
                Value : Posnr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Sales Organization',
                Value : Vkorg,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Customer Number',
                Value : Kunnr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Material Number',
                Value : Matnr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Material Description',
                Value : Arktx,
            }, 
            {
                $Type : 'UI.DataField',
                Label : 'Quantity',
                Value : Kmeng,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Customer Purchase Order Number',
                Value : Bstkd,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Creation Date',
                Value : Erdat,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Fixed Quantity Date',
                Value : Fixmg,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Created by User',
                Value : Ernam,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Billing Block',
                Value : Faksk,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Overall Status',
                Value : Gbstk,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status Description',
                Value : GbstkDesc,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Net Price',
                Value : Netpr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Net Value',
                Value : Netwr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Pricing Date',
                Value : Prsdt,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Subsequent Document',
                Value : VbelnSdr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Reference Document',
                Value : VbelnRdm,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Billing Date',
                Value : Fkdat,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Billing Net Value',
                Value: NetwrBilling,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Billing Currency',
                Value : WaerkBilling,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Accounting Document Number',
                Value : Belnr,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Accounting Net Value',
                Value : NetwrAcc,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Accounting Currency',
                Value : WaerkAcc,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Valid From Date',
                Value : Datab,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Valid To Date',
                Value : Datbi,
            },
    ],
    UI.SelectionFields : [
        Vkorg,
        Kunnr,
        Matnr,
    ],
);


annotate service.OrderItemDetails with @(
    //Disables the delete option dependent of the fields value
    Capabilities.DeleteRestrictions : {
        Deletable   : false, //Search-Term: #DynamicCRUD
    },
);