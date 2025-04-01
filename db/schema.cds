namespace contract.atm;

entity OrderItemDetails {
    key SalesOrganization : String(4);
    key CustomerNumber : String(10);
    key CreationDate : Date;
    key CumulativeOrderQuantity : Decimal(13, 3);
    PrecedingDocumentNumber : String(10);
    PrecedingItemNumber : String(6);
    MaterialDescription : String(40);
    OverallStatus : String(1);
    PricingDate : Date;
    BillingDate : Date;
    NetValueInDocumentCurrency : Decimal(13, 3);
    DocumentCurrency : String(5);
}