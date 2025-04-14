namespace contract.atm;

entity OrderItemDetails {
    key Vbeln      : String(10);        // Sales Document
    key Posnr      : String(6);         // Item Number
    Vkorg          : String(4);         // Sales Organization
    Kunnr          : String(10);        // Customer Number
    Matnr          : String(40);        // Material Number
    Arktx          : String(255);       // Material Description
    Kmeng          : Decimal(13,2);     // Quantity
    Bstkd          : String(35);        // Customer Purchase Order Number
    Erdat          : Date;              // Creation Date
    Fixmg          : Date;              // Fixed Quantity Date
    Ernam          : String(12);        // Created by User
    Faksk          : String(10);        // Billing Block
    Gbstk          : String(1);         // Overall Status
    GbstkDesc      : String(255);       // Status Description
    Netpr          : Decimal(13,2);     // Net Price
    Netwr          : Decimal(15,2);     // Net Value
    Prsdt          : Date;              // Pricing Date
    VbelnSdr       : String(10);        // Subsequent Document
    VbelnRdm       : String(10);        // Reference Document
    Fkdat          : Date;              // Billing Date
    NetwrBilling   : Decimal(15,2);     // Billing Net Value
    WaerkBilling   : String(5);             // Billing Currency
    Belnr          : String(10);        // Accounting Document Number
    NetwrAcc       : Decimal(15,2);     // Accounting Net Value
    WaerkAcc       : String(5);          // Accounting Currency
    Datab          : Date;              // Valid From Date
    Datbi          : Date;              // Valid To Date
}
