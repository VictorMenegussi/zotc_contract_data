const cds = require('@sap/cds');

module.exports = cds.service.impl (async function() {

    this.before('READ', 'OrderItemDetails', async (req) => {

        if(req.query.SELECT.where) {
            for (let i = 0; i < req.query.SELECT.where.length; i++) {
                const condition = req.query.SELECT.where[i]
                if (condition.ref && condition.ref[0] === 'Datab' && req.query.SELECT.where[i + 1] === '=') {
                    req.query.SELECT.where[i + 1] = '<='
                    console.log(`Changing condition from '=' to '<=' for Datab`)
                } else if (condition.ref && condition.ref[0] === 'Datbi' && req.query.SELECT.where[i + 1] === '=') {
                    req.query.SELECT.where[i + 1] = '>='
                    console.log(`Changing condition from '=' to '>=' for Datbi`)
                } else if (condition.ref && condition.ref[0] === 'Vkorg' )     {
                    console.log('Overwriting Vkorg condition to upper case')
                    if (req.query.SELECT.where[i + 2] && req.query.SELECT.where[i + 2].val) {
                        req.query.SELECT.where[i + 2].val = req.query.SELECT.where[i + 2].val.toUpperCase();
                    }           
                }      
            }
        }
    })

    this.on('jobYearlyUpdate', async () => {
        const today = new Date()
        let start = new Date(today.getFullYear() - 1, today.getMonth(), 1)

        for (let i = 0; i < 13; i++) {
            let monthStart = new Date(start.getFullYear(), start.getMonth() + i, 1)
            let monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)

            let startString = monthStart.toISOString().split('T')[0] + 'T00:00:00'
            let endString = monthEnd.toISOString().split('T')[0] + 'T00:00:00'

            await updateByDateRange(startString, endString)
        }
        return 'Yearly update completed'
    })
    this.on('jobMonthlyUpdate', async () => {
        const today = new Date();
        const thirtyOneDaysAgo = new Date();
        thirtyOneDaysAgo.setDate(today.getDate() - 31);

        const startString = thirtyOneDaysAgo.toISOString().split('T')[0] + 'T00:00:00';
        const endString = today.toISOString().split('T')[0] + 'T00:00:00';

        await updateByDateRange(startString, endString);

        return 'Monthly update completed';
    })

    async function updateByDateRange(startDate, endDate) {
        const eccSRV = await cds.connect.to('zotc')
        const { ZOTC_CONTRACT_ATM_DATASet } = eccSRV.entities
        var timestamp1 = Date.now()
        console.log(`Processing: ${startDate} to ${endDate}`)
        let eccEntity = await eccSRV.run(SELECT.from(ZOTC_CONTRACT_ATM_DATASet).where({
            Datab: startDate,
            Datbi: endDate
        }))
        var timestamp2 = Date.now()
        console.log(`ECC data selected in ${timestamp2 - timestamp1} ms`)   
        console.log(`Number of records selected: ${eccEntity.length}`)     
        let insert = eccEntity.map(item => ({
            Vbeln: item.Vbeln,
            Posnr: item.Posnr,
            Vkorg: item.Vkorg,
            Kunnr: item.Kunnr,
            Matnr: item.Matnr,
            Arktx: item.Arktx,
            Kmeng: parseFloat(item.Kmeng),
            Bstkd: item.Bstkd,
            Erdat: new Date(item.Erdat),
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
        const { OrderItemDetails } = cds.entities
        await cds.run(UPSERT.into(OrderItemDetails).entries(insert))
        var timestamp3 = Date.now()
        console.log(`Data inserted in ${timestamp3 - timestamp2} ms`)
        return 'Data update completed'
    }
})