"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleModuleUpgradeClient = void 0;
const BaseClient_1 = require("./BaseClient");
class SingleModuleUpgradeClient extends BaseClient_1.BaseClient {
    // 没有升级过的也能够用这个client，upgradeAddr 传空值，或者传老的 address 就能够使用
    constructor(client, address, upgradeAddr, module) {
        super(client);
        this.address = address;
        if (!upgradeAddr) {
            this.upgradeAddr = address;
        }
        else {
            this.upgradeAddr = upgradeAddr;
        }
        this.module = module;
    }
    funOf(name) {
        return SingleModuleUpgradeClient.humpToLine(name);
    }
    static humpToLine(name) {
        return name.replace(/([A-Z])/g, "_$1").toLowerCase();
    }
    moduleOf() {
        return `${this.address}::${module ?? this.module}`;
    }
    structOf(name, module) {
        return `${this.address}::${module ?? this.module}::${name}`;
    }
    
}
exports.SingleModuleUpgradeClient = SingleModuleUpgradeClient;
