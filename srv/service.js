const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');

module.exports = cds.service.impl(async function () {

    this.on('DELETE', 'ContractDataParameters', async (req, list) => {
        const id = req.data.ID
        const sel = await SELECT.one.from('ContractDataParameters').where({ ID: id })
        let vkorg = sel.Vkorg
        let kunnr = sel.Kunnr
        console.log(`Deleting related OrderItemDetails for Vkorg: ${vkorg}, Kunnr: ${kunnr}`)
        await cds.run(`DELETE FROM CONTRACT_ATM_ORDERITEMDETAILS WHERE VKORG='${vkorg}' AND KUNNR='${kunnr}'`)
        return cds.run(req.query)
    })

    this.before(['CREATE', 'UPDATE'], 'ContractDataParameters', async (req) => {
        const { Vkorg, Kunnr } = req.data;
        if (req.query.UPDATE) {
            const serchId = await SELECT.one.from('ContractDataParameters').where({ ID: req.data.ID })
            if (serchId.Vkorg !== Vkorg || serchId.Kunnr !== Kunnr) {
                const existingRecord = await SELECT.one.from('ContractDataParameters').where({Vkorg,Kunnr})
                if (existingRecord) {
                    if (req.locale === 'pt') {
                        req.error(409, 'Chave Duplicada');
                    } else if (req.locale === 'es') {
                        req.error(409, 'Clave Duplicada');
                    } else if (req.locale === 'de') {
                        req.error(409, 'Doppelter Schlüssel');
                    } else if (req.locale === 'sv') {
                        req.error(409, 'Duplicerad nyckel');
                    } else {
                        req.error(409, 'Duplicate Key');
                    }
                }
            }
        } else {
            const existingRecord = await SELECT.one.from('ContractDataParameters').where({
                Vkorg,
                Kunnr
            })
            if (existingRecord) {
                if (req.locale === 'pt') {
                    req.error(409, 'Chave Duplicada');
                } else if (req.locale === 'es') {
                    req.error(409, 'Clave Duplicada');
                } else if (req.locale === 'de') {
                    req.error(409, 'Doppelter Schlüssel');
                } else if (req.locale === 'sv') {
                    req.error(409, 'Duplicerad nyckel');
                } else {
                    req.error(409, 'Duplicate Key');
                }
            }

        }
    });

    this.before('READ', 'OrderItemDetails', async (req) => {
        if (req.query.SELECT.where) {
            for (let i = 0; i < req.query.SELECT.where.length; i++) {
                const condition = req.query.SELECT.where[i]
                if (condition.ref && condition.ref[0] === 'Datab' && req.query.SELECT.where[i + 1] === '=') {
                    req.query.SELECT.where[i + 1] = '<='
                    console.log(`Changing condition from '=' to '<=' for Datab`)
                } else if (condition.ref && condition.ref[0] === 'Datbi' && req.query.SELECT.where[i + 1] === '=') {
                    req.query.SELECT.where[i + 1] = '>='
                    console.log(`Changing condition from '=' to '>=' for Datbi`)
                } else if (condition.ref && condition.ref[0] === 'Vkorg') {
                    console.log('Overwriting Vkorg condition to upper case')
                    if (req.query.SELECT.where[i + 2] && req.query.SELECT.where[i + 2].val) {
                        req.query.SELECT.where[i + 2].val = req.query.SELECT.where[i + 2].val.toUpperCase();
                    }
                }
            }
        }
    })

    this.on('UploadContractData', async (req) => {
        let duplicates = []
        let insert = []
        let seen = new Set()
        let deletedKeys = new Set()
        let oldData = await cds.run(SELECT.from('ContractDataParameters'))
        for (const item of req.data.contracts) {
            const key = `${item.Vkorg}|${item.Kunnr}`
            if (seen.has(key)) {
                duplicates.push(item)
            } else {
                seen.add(key)
                insert.push(item)
            }
        }
        for (const old of oldData) {
            const key = `${old.Vkorg}|${old.Kunnr}`
            if (!seen.has(key)) {
                deletedKeys.add(key)
            }
        }
        await cds.run(DELETE.from('ContractDataParameters'))
        await cds.run(INSERT.into('ContractDataParameters').entries(insert))
        if (deletedKeys.size > 0) {
            deleteKeysString = ''
            firstIteration = true
            deletedKeys.forEach(async (key) => {
                if (!firstIteration) {
                    deleteKeysString += ','
                }
                firstIteration = false
                deleteKeysString += `'${key}'`
            })
            await cds.run(`DELETE FROM CONTRACT_ATM_ORDERITEMDETAILS WHERE CONCAT(CONCAT(VKORG,'|'),KUNNR) IN (${deleteKeysString})`)
        }
        if (duplicates.length > 0) {
            return { message: 'Duplicates found and removed', duplicates }
        }
        return { message: 'Data Uploaded Successfully' }
    })

    this.on('jobYearlyUpdate', async () => {
        const parametros = await cds.run(SELECT.from('ContractDataParameters'))
        for (const p of parametros) {
            const vkorg = p.Vkorg
            const kunnr = p.Kunnr
            const erdat = p.Erdat + 'T00:00:00'
            let days = 365
            const initialDate = new Date()
            const today = new Date()
            initialDate.setDate(today.getDate() - days)
            const startString = initialDate.toISOString().split('T')[0] + 'T00:00:00'
            const endString = today.toISOString().split('T')[0] + 'T00:00:00'
            try {
                await updateByDateRange(vkorg, kunnr, erdat, startString, endString)
            } catch (error) {
                console.log('Error logging parameters:', error)
            }
        }
        return 'Yearly update completed'
    })
    this.on('jobMonthlyUpdate', async () => {
        const parametros = await cds.run(SELECT.from('ContractDataParameters'))
        for (const p of parametros) {
            console.log(`Processing Vkorg: ${p.Vkorg}, Kunnr: ${p.Kunnr} Erdat: ${p.Erdat}`)
            const vkorg = p.Vkorg
            const kunnr = p.Kunnr
            const erdat = p.Erdat + 'T00:00:00'
            let days = 31
            const today = new Date()
            if (p.OneMonth) {
                days = 31
            } else {
                days = p.Days || 31
            }
            const initialDate = new Date()
            initialDate.setDate(today.getDate() - days)
            const startString = initialDate.toISOString().split('T')[0] + 'T00:00:00'
            const endString = today.toISOString().split('T')[0] + 'T00:00:00'
            try {
                updateByDateRange(vkorg, kunnr, erdat, startString, endString)
            } catch (error) {
                console.log(`Problem Vkorg: ${p.Vkorg}, Kunnr: ${p.Kunnr} Erdat: ${p.Erdat} Start: ${startString} End: ${endString}`)
                console.log('Error logging parameters:', error)
            }
        }
        return 'Update running in background';
    })

    this.on('PopulateValueHelp', async (req) => {
        const eccSRV = await cds.connect.to('zotc')
        const { VkorgVHSet, KunnrVHSet } = eccSRV.entities
        let vkorg = await eccSRV.run(SELECT.from(VkorgVHSet).where({ Spras: 'EN' }))
        await cds.run(DELETE.from('VkorgHelp'))
        await cds.run(INSERT.into('VkorgHelp').entries(vkorg))
        let kunnr = await eccSRV.run(SELECT.from(KunnrVHSet))
        await cds.run(DELETE.from('KunnrHelp'))
        await cds.run(INSERT.into('KunnrHelp').entries(kunnr))
        return 'ok'
    })

    this.on('READ', ['VkorgHelp'], async (req) => {
        result = await cds.run(req.query)
        if (req.query.SELECT.search && result.length == 0) {
            result.push({ Vkorg: req.query.SELECT.search[0].val })
        }
        return result
    })

    this.on('READ', ['KunnrHelp'], async (req) => {
        result = await cds.run(req.query)
        if (req.query.SELECT.search && result.length == 0) {
            result.push({ Kunnr: req.query.SELECT.search[0].val })
        } else if (req.query.SELECT.search) {
            let exists = false
            for (const r of result) {
                if (r.Kunnr === req.query.SELECT.search[0].val) {
                    exists = true
                }
            }
            if (!exists) {
                result.push({ Kunnr: req.query.SELECT.search[0].val })
            }
        }
        return result
    })

    async function updateByDateRange(vkorg, kunnr, erdat, startDate, endDate) {
        const eccSRV = await cds.connect.to('zotc')
        const { ZOTC_CONTRACT_ATM_DATASet } = eccSRV.entities
        var timestamp1 = Date.now()
        console.log(`Processing: ${startDate} to ${endDate}`)
        let eccEntity = await eccSRV.run(SELECT.from(ZOTC_CONTRACT_ATM_DATASet).where({
            Vkorg: vkorg,
            Kunnr: kunnr,
            Erdat: erdat,
            Datab: startDate,
            Datbi: endDate
        }))
        const uniqueEccEntity = Array.from(
            new Map(
                eccEntity.map(item => [item.Vbeln + '|' + item.Posnr, item])
            ).values()
        );
        var timestamp2 = Date.now()
        console.log(`ECC data selected in ${timestamp2 - timestamp1} ms`)
        console.log(`Number of records selected: ${uniqueEccEntity.length}`)
        let insert = uniqueEccEntity.map(item => ({
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
        await cds.run(`DELETE FROM CONTRACT_ATM_ORDERITEMDETAILS WHERE VKORG='${vkorg}' AND KUNNR='${kunnr}' AND ERDAT<'${erdat.split('T')[0]}'`)
        var timestamp3 = Date.now()
        console.log(`Data inserted in ${timestamp3 - timestamp2} ms`)
        return 'Data update completed'
    }

})
