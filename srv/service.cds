using {contract.atm as db} from '../db/schema.cds';
 

service OrderService @(requires: 'authenticated-user') 
{
    entity OrderItemDetails as projection on db.OrderItemDetails ;
    function jobMonthlyUpdate() returns String;
    function jobYearlyUpdate() returns String;
}

annotate OrderService.OrderItemDetails with{
    Arktx             @title : 'Material Description';
    Kmeng @title : 'Order Quantity'    ;
    Bstkd              @title : 'Purchase Order Number';
    Erdat              @title : 'Document Date';
    Fixmg             @title : 'Delivery Date';
    Ernam          @title : 'Created by User';
    Faksk             @title : 'Billing Block';
    Gbstk             @title : 'Overall Status';
    GbstkDesc         @title : 'Status Description';
    Netpr            @title : 'Net Price';
    Netwr             @title : 'Net Value';
    Prsdt              @title : 'Pricing Date';
    VbelnSdr         @title : 'Shortrun Debit M.req';
    VbelnRdm       @title : 'Rexam Debit Memo';
    Fkdat               @title : 'Billing Date';
    NetwrBilling       @title : 'Billing Net Value';
    WaerkBilling     @title : 'Debit Memo Currency';
    Belnr       @title : 'Accounting Document Number';
    NetwrAcc   @title : 'Accounting Net Value';
    WaerkAcc   @title : 'Invoice Currency';
    Datab @title : 'Valid From Date';
    Datbi @title : 'Valid To Date';
    Vbeln @title : 'Sales Document';
    Posnr @title : 'Item Number';
    Vkorg @title : 'Sales Organization' ;
    Kunnr @title : 'Sold To'    ;
    Matnr @title : 'Material Number'  ;    
};
