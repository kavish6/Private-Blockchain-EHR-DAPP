/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class NewChainCode extends Contract{

    async InitLedger(ctx) {
        const records = [
            {
                ID: 'P1',
                Name: 'Kavish',
                Age: 10,
                Gender: 'Male',
                BloodGrp:'O+',
                ContactNo:'123411211',
                Address:'x street y house',
                Email:'a@123.com',
                Medicalvisits:[
                    {
                        Date:'5/5/22',
                        Description:'Sore throat,Fever',
                        Doctor:'Dr A Thakur',
                        Diagnosis:'Throat Infection',
                        Testperformed:'Endoscopy',
                        Prescription:'abc 1mg ,bcd',
                        Testreports:'../images'
                },
                {
                    Date:'5/5/22',
                    Description:'Sore throat,Fever',
                    Doctor:'Dr A Thakur',
                    Diagnosis:'Throat Infection',
                    Testperformed:'Endoscopy',
                    Prescription:'abc 1mg ,bcd',
                    Testreports:'../images'
            },    {
                Date:'5/5/22',
                Description:'Sore throat,Fever',
                Doctor:'Dr A Thakur',
                Diagnosis:'Throat Infection',
                Testperformed:'Endoscopy',
                Prescription:'abc 1mg ,bcd',
                Testreports:'../images'
        },]
            },
            {
                ID: 'P2',
                Name: 'Samyak',
                Age: 21,
                Gender: 'Male',
                BloodGrp:'B+',
                ContactNo:'123411211',
                Address:'x street y house',
                Email:'b@123.com',
                Medicalvisits:[
                    {
                        Date:'5/5/22',
                        Description:'Sore throat,Fever',
                        Doctor:'Dr A Thakur',
                        Diagnosis:'Throat Infection',
                        Testperformed:'Endoscopy',
                        Prescription:'abc 1mg ,bcd',
                        Testreports:'../images'
                },
                {
                    Date:'5/5/22',
                    Description:'Sore throat,Fever',
                    Doctor:'Dr A Thakur',
                    Diagnosis:'Throat Infection',
                    Testperformed:'Endoscopy',
                    Prescription:'abc 1mg ,bcd',
                    Testreports:'../images'
            },],
            },
            {
                ID: 'P3',
                Name: 'karan',
                Age: 41,
                Gender: 'Female',
                BloodGrp:'A+',
                ContactNo:'123411211',
                Address:'x street y house',
                Email:'c@123.com',
                Medicalvisits:[
                    {
                        Date:'5/5/22',
                        Description:'Sore throat,Fever',
                        Doctor:'Dr A Thakur',
                        Diagnosis:'Throat Infection',
                        Testperformed:'Endoscopy',
                        Prescription:'abc 1mg ,bcd',
                        Testreports:'../images'
                },
            ],
            },
        ];

        for (const record of records) {
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(record.ID, Buffer.from(stringify(sortKeysRecursive(record))));
        }
    }
    async CreateRecord(ctx, id, name, age, gender,bloodgrp,contactno,address) {
        const exists = await this.RecordExists(ctx, id);
        if (exists) {
            throw new Error(`The asset ${id}  exists`);
        }

        const record = {
            ID: id,
            Name: name,
            Age: age,
            Gender:gender,
            BloodGrp:bloodgrp,
            ContactNo:contactno,
            Address:address,
            Medicalvisits:[],
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(record))));
        return JSON.stringify(record);
    }
    async ReadRecord(ctx, id) {
        const recordJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!recordJSON || recordJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return recordJSON.toString();
    }
    async AddNewVisit(ctx,id,date,description,doctor,diagnosis,testperformed,prescription,testreports)
    {
        const exists = await this.RecordExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        const recordString = await this.ReadRecord(ctx, id);
        const record = JSON.parse(recordString);
        record.Medicalvisits.push({Date:date,Description:description,Doctor:doctor,Diagnosis:diagnosis,Testperformed:testperformed,Prescription:prescription,Testreports:testreports});
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(record))));
        return JSON.stringify(record);
    }
    async RecordExists(ctx, id) {
        const recordJSON = await ctx.stub.getState(id);
        return recordJSON && recordJSON.length > 0;
    }
    async DeleteRecord(ctx,id){
        const exists = await this.RecordExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }
    async GetAllRecords(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}
module.exports=NewChainCode;
