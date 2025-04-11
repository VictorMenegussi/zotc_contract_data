const cds = require('@sap/cds');

module.exports = cds.service.impl (async function() {
    this.on('jobRetrieve', async (req) => { 
        const eccSRV = await cds.connect.to('zotc')
        const { ZOTC_CONTRACT_ATM_DATASet } = eccSRV.entities
        const { OrderItemDetails } = cds.entities
        const today = new Date();
        const thirtyOneDaysAgo = new Date();
        thirtyOneDaysAgo.setDate(today.getDate() - 31);
        const todayString = today.toISOString().split('T')[0] + 'T00:00:00'
        const thirtyOneDaysAgoString = thirtyOneDaysAgo.toISOString().split('T')[0] + 'T00:00:00'
        let eccEntity = await eccSRV.run(SELECT.from(ZOTC_CONTRACT_ATM_DATASet))//.where({
        //    Vkorg: 'RSE1',
        //    Kunnr: '271',
        //    Datab: thirtyOneDaysAgoString,
        //    Datbi: todayString,
        //  }))
        let insert = eccEntity.map(item => ({
            Vbeln: item.Vbeln,
            Posnr: item.Posnr,
            Vkorg: item.Vkorg,
            Kunnr: item.Kunnr,
            Matnr: item.Matnr,
            Arktx: item.Arktx,
            Kmeng: parseFloat(item.Kmeng),  // Convert to decimal
            Bstkd: item.Bstkd,
            Erdat: new Date(item.Erdat),  // Convert to Date
            Fixmg: new Date(item.Fixmg),
            Ernam: item.Ernam,
            Faksk: item.Faksk,
            Gbstk: item.Gbstk,
            GbstkDesc: item.GbstkDesc,
            Netpr: parseFloat(item.Netpr),
            Netwr: parseFloat(item.Netwr),
            Prsdt: new Date(item.Prsdt),
            VbelnSdr: item.VbelnSdr,
            VbelnRdm: item.VbelnRdm,
            Fkdat: new Date(item.Fkdat),
            NetwrBilling: parseFloat(item.NetwrBilling),
            WaerkBilling: item.WaerkBilling,
            Belnr: item.Belnr,
            NetwrAcc: parseFloat(item.NetwrAcc),
            WaerkAcc: item.WaerkAcc,
            Datab: new Date(item.Datab),
            Datbi: new Date(item.Datbi)
        }))
        
        // Insert into CAP CDS entity
        let resp = await cds.run(UPSERT.into(OrderItemDetails).entries(insert))
        return JSON.stringify(resp)
    })

})