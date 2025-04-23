using {contract.atm as db} from '../db/schema.cds';
 

service OrderService {
    entity OrderItemDetails as projection on db.OrderItemDetails ;
    function jobRetrieve() returns String;
}

annotate OrderService.OrderItemDetails with{
    Arktx             ;
    Kmeng @title : 'Order Quantity'    ;
    Bstkd              ;
    Erdat              ;
    Fixmg              ;
    Ernam              ;
    Faksk              ;
    Gbstk              ;
    GbstkDesc          ;
    Netpr              ;
    Netwr              ;
    Prsdt              ;
    VbelnSdr           ;
    VbelnRdm           ;
    Fkdat              ;
    NetwrBilling       ;
    WaerkBilling       ;
    Belnr              ;
    NetwrAcc           ;
    WaerkAcc           ;
    Datab @title : 'Valid From Date';
    Datbi @title : 'Valid To Date';
    Vbeln              ;
    Posnr              ;
    Vkorg @title : 'Sales Organization' ;
    Kunnr @title : 'Sold To'    ;
    Matnr @title : 'Material Number'  ;    
};
