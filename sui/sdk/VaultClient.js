"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultClient = void 0;
const types_1 = require("./types");
const sui_helper_1 = require("./utils/sui-helper");
const utils_1 = require("@mysten/sui.js/utils");
const SingleModuleUpgradeClient_1 = require("./SingleModuleUpgradeClient");
// noinspection JSUnusedGlobalSymbols
class VaultClient extends SingleModuleUpgradeClient_1.SingleModuleUpgradeClient {
    constructor(client, address, upgradeAddr = undefined) {
        super(client, address, upgradeAddr, "vault");
    }
    
    getVaultInfo(vaultInfoId) {
        return this.getObject(vaultInfoId).then(v => (0, sui_helper_1.getObjectAs)(v).value.fields);
    }
   
}
exports.VaultClient = VaultClient;
