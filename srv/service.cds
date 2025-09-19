using {contract.atm as db} from '../db/schema.cds';

define type ObjContractData {
    Vkorg    : String(4); // Sales Organization
    Kunnr    : String(10); // Customer Number
    Erdat    : Date; // Creation Date Limit
    Days     : Integer; // Number of days for the contract validity
    OneMonth : Boolean; // One month validity
}

service OrderService
{
    entity OrderItemDetails       as projection on db.OrderItemDetails;
    entity ContractDataParameters as projection on db.ContractDataParameters;
    // entity VkorgHelp             as projection on db.VkorgHelp;
    // entity KunnrHelp             as projection on db.KunnrHelp;

    function jobMonthlyUpdate()                                      returns String;
    function jobYearlyUpdate()                                       returns String;
    action   UploadContractData(contracts: array of ObjContractData) returns String;
}

annotate OrderService.OrderItemDetails with {
    Arktx        @title: 'Material Description';
    Kmeng        @title: 'Order Quantity';
    Bstkd        @title: 'Purchase Order Number';
    Erdat        @title: 'Document Date';
    Fixmg        @title: 'Delivery Date';
    Ernam        @title: 'Created by User';
    Faksk        @title: 'Billing Block';
    Gbstk        @title: 'Overall Status';
    GbstkDesc    @title: 'Status Description';
    Netpr        @title: 'Net Price';
    Netwr        @title: 'Net Value';
    Prsdt        @title: 'Pricing Date';
    VbelnSdr     @title: 'Shortrun Debit M.req';
    VbelnRdm     @title: 'Rexam Debit Memo';
    Fkdat        @title: 'Billing Date';
    NetwrBilling @title: 'Billing Net Value';
    WaerkBilling @title: 'Debit Memo Currency';
    Belnr        @title: 'Accounting Document Number';
    NetwrAcc     @title: 'Accounting Net Value';
    WaerkAcc     @title: 'Invoice Currency';
    Datab        @title: 'Valid From Date';
    Datbi        @title: 'Valid To Date';
    Vbeln        @title: 'Sales Document';
    Posnr        @title: 'Item Number';
    Vkorg        @title: 'Sales Organization';
    Kunnr        @title: 'Sold To';
    Matnr        @title: 'Material Number';
};

annotate OrderService.ContractDataParameters with @odata.draft.enabled {
    Vkorg    @UI.UpdateHidden: true  @title: 'Sales Organization';
    Kunnr    @title: 'Customer Number';
    Erdat    @title: 'Doc Date Limit';
    Days     @title: 'Valid Days';
    OneMonth @title: 'One Month Range';
};
