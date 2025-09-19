using OrderService as service from '../../srv/service';

annotate service.ContractDataParameters with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Sales Organization',
                Value: Vkorg,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Customer Number',
                Value: Kunnr,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Doc Date Limit',
                Value: Erdat,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Valid Days',
                Value: Days,
            },
            {
                $Type: 'UI.DataField',
                Label: 'One Month Range',
                Value: OneMonth,
            },
        ],
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup',
    }, ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Label: 'Sales Organization',
            Value: Vkorg,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Customer Number',
            Value: Kunnr,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Doc Date Limit',
            Value: Erdat,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Valid Days',
            Value: Days,
        },
        {
            $Type: 'UI.DataField',
            Label: 'One Month Range',
            Value: OneMonth,
        },
    ],
    UI.HeaderInfo.Title          : {
        $Type: 'UI.DataField',
        Value: 'Parameters for Contract Data',
    },
    UI.HeaderInfo.Description          : {
        $Type: 'UI.DataField',
        Value: 'Sales Organization {Vkorg} Customer {Kunnr}',
    },
    UI.SelectionFields           : [
        Vkorg,
        Kunnr,
    //Erdat,
    //Days,
    //OneMonth
    ]        
);

annotate service.ContractDataParameters with {
   Vkorg @UI.UpdateHidden : true;
   Kunnr @UI.UpdateHidden : true;
};
