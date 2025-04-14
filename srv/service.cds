using {contract.atm as db} from '../db/schema.cds';
 

service OrderService {
    entity OrderItemDetails as projection on db.OrderItemDetails ;
    function jobRetrieve() returns String;
}

annotate OrderService.OrderItemDetails with{
    Arktx             ;
    Kmeng              ;
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
    NetwrBilling        ;
    WaerkBilling       ;
    Belnr             ;
    NetwrAcc           ;
    WaerkAcc           ;
    Datab             ;
    Datbi             ;
    Vbeln             ;
    Posnr            ;
    Vkorg         @title : 'Sales Organization' ;
    Kunnr        @title : 'Customer Number'    ;
    Matnr       @title : 'Material Number'      ;    

};
