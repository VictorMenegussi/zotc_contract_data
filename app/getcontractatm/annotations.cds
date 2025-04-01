using OrderService as service from '../../srv/service';
annotate service.OrderItemDetails with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'SalesOrganization',
                Value : SalesOrganization,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CustomerNumber',
                Value : CustomerNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CreationDate',
                Value : CreationDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CumulativeOrderQuantity',
                Value : CumulativeOrderQuantity,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PrecedingDocumentNumber',
                Value : PrecedingDocumentNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PrecedingItemNumber',
                Value : PrecedingItemNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'MaterialDescription',
                Value : MaterialDescription,
            },
            {
                $Type : 'UI.DataField',
                Label : 'OverallStatus',
                Value : OverallStatus,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PricingDate',
                Value : PricingDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'BillingDate',
                Value : BillingDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'NetValueInDocumentCurrency',
                Value : NetValueInDocumentCurrency,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DocumentCurrency',
                Value : DocumentCurrency,
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
            Label : 'CumulativeOrderQuantity',
            Value : CumulativeOrderQuantity,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CreationDate',
            Value : CreationDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CustomerNumber',
            Value : CustomerNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'SalesOrganization',
            Value : SalesOrganization,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PrecedingDocumentNumber',
            Value : PrecedingDocumentNumber,
        },
    ],
);

