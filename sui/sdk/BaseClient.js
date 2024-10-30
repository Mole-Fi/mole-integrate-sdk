"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClient = void 0;
const bcs_1 = require("@mysten/sui.js/bcs");
const types_1 = require("./types");
const sui_helper_1 = require("./utils/sui-helper");
const transactions_1 = require("@mysten/sui.js/transactions");
const MAX_BUDGET = 400000000;
const DEFAULT_MAX_GAS_AMOUNT_RATIO = 0.1;
class BaseClient {
    static registerCommonTypes() {
        if (BaseClient.hasRegisterCommonTypes)
            return;
        bcs_1.bcs.registerStructType("table::Table", {
            id: "address",
            size: "u64",
        });
        bcs_1.bcs.registerStructType("type_name::TypeName", {
            name: "string"
        });
        BaseClient.hasRegisterCommonTypes = true;
    }
    constructor(client, suiWallet) {
        this.client = client;
        this.suiWallet = suiWallet;
        BaseClient.registerCommonTypes();
    }
    static attachOptions(transaction, options) {
        if (!transaction.gasPayment && options.gasPayment) {
            transaction.gasPayment = options.gasPayment;
        }
        if (!transaction.gasBudget && options.gasBudget) {
            transaction.gasBudget = options.gasBudget;
        }
        if (!transaction.gasPrice && options.gasPrice) {
            transaction.gasPrice = options.gasPrice;
        }
    }
    static getTxBlockByMoveCallTx(moveCall, signer) {
        const block = new transactions_1.TransactionBlock();
        if (moveCall.prepare) {
            moveCall.prepare(block);
        }
        block.moveCall({
            target: `${moveCall.packageObjectId}::${moveCall.module}::${moveCall.function}`,
            arguments: moveCall.arguments.map(v => {
                if (types_1.BlockedValue.isBlockedValue(v)) {
                    return v.make(block);
                }
                return block.pure(v);
            }),
            typeArguments: moveCall.typeArguments
        });
        if (moveCall.gasBudget)
            block.setGasBudget(moveCall.gasBudget);
        if (moveCall.gasPayment)
            block.setGasPayment(moveCall.gasPayment);
        if (moveCall.gasPrice)
            block.setGasPrice(moveCall.gasPrice);
        if (signer)
            block.setSender(signer.toSuiAddress());
        return block;
    }
    static getEstimateMaxGasAmount(maxGasAmount, ratio) {
        let gas = BigInt(maxGasAmount);
        if (!ratio) {
            ratio = DEFAULT_MAX_GAS_AMOUNT_RATIO;
        }
        const ratioScale = 100000n;
        const ratioVal = BigInt((ratio * 100000 + 100000).toFixed(0));
        return Number.parseInt((gas * ratioVal / ratioScale).toString());
    }
    
    // //#region better sdk adapter
    getObject(id, // ObjectId
    options) {
        return this.client.getObject({
            id,
            options: options ?? {
                showContent: true,
                showOwner: true,
                showType: true
            }
        });
    }
    
}
exports.BaseClient = BaseClient;
BaseClient.hasRegisterCommonTypes = false;
