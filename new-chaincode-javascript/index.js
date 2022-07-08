/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const newchaincode = require('./lib/newchaincode');

module.exports.NewChainCode = newchaincode;
module.exports.contracts = [newchaincode];
