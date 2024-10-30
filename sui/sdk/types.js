"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerStrategies = exports.WORKER_ASSET = exports.WORKER_STABLE = exports.BlockedValue = exports.CLOCK_OBJECT_ID = void 0;
exports.buildDepositWorkByte = buildDepositWorkByte;
exports.buildWithdrawWorkByte = buildWithdrawWorkByte;
exports.buildWorkByte = buildWorkByte;
const bcs_1 = require("@mysten/sui.js/bcs");
exports.CLOCK_OBJECT_ID = "0x0000000000000000000000000000000000000000000000000000000000000006";
/**
 * BlockedValue to adapter Transaction and TransactionBlock (sui incompatible upgrade)
 */
class BlockedValue {
    static isBlockedValue(input) {
        return input instanceof BlockedValue || input?.TYPE_TAG === BlockedValue.CLS_TYPE_TAG;
    }
    static fromAddresses(addresses) {
        return new BlockedValue(tx => {
            return tx.makeMoveVec({ objects: addresses.map(v => tx.object(v)) });
        });
    }
    static fromBytes(bytes) {
        return new BlockedValue(tx => {
            return tx.pure([...bytes]);
            // return tx.pure([0,0,0,0,0,0,0,0], "vector<u8>");
            // return tx.pure(new Uint8Array([8,0,0,0,0,0,0,0,0]))
            // return tx.makeMoveVec({objects: [0,0,0,0,0,0,0,0].map( v=> tx.pure(v, "u8"))});
        });
    }
    static fromGetter(getter) {
        return new BlockedValue(tx => {
            return getter(tx);
        });
    }
    static clock() {
        return new BlockedValue(tx => {
            return tx.pure(exports.CLOCK_OBJECT_ID);
        });
    }
    constructor(callback) {
        this.TYPE_TAG = BlockedValue.CLS_TYPE_TAG;
        this.callback = callback;
    }
    make(tx) {
        return this.callback(tx);
    }
}
exports.BlockedValue = BlockedValue;
BlockedValue.CLS_TYPE_TAG = "BLOCKED_VALUE";
//#endregion
//#region standard fund encode
exports.WORKER_STABLE = 1n;
exports.WORKER_ASSET = 2n;
function buildDepositWorkByte(input) {
    const data = new Uint8Array([
        ...bcs_1.bcs.ser("u64", BigInt(input.farmingCoinAmount)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.minLpAmount)).toBytes()
    ]);
    return new Uint8Array([
        ...bcs_1.bcs.ser("u64", BigInt(input.workerType)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.id)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.baseCoinAmount)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.farmingCoinAmount)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.borrowAmount)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.maxReturn)).toBytes(),
        ...bcs_1.bcs.ser("u8", input.strategy).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(data.length)).toBytes(),
        ...data
    ]);
}
function buildWithdrawWorkByte(input) {
    const data = new Uint8Array([
        ...bcs_1.bcs.ser("u64", BigInt(input.maxLpTokenToLiquidate)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.maxDebtRepayment)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.minFarmingToken)).toBytes()
    ]);
    return new Uint8Array([
        ...bcs_1.bcs.ser("u64", BigInt(input.workerType)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.id)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.baseCoinAmount ?? 0n)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.farmingCoinAmount ?? 0n)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.borrowAmount ?? 0n)).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(input.maxReturn)).toBytes(),
        ...bcs_1.bcs.ser("u8", input.strategy).toBytes(),
        ...bcs_1.bcs.ser("u64", BigInt(data.length)).toBytes(),
        ...data
    ]);
}
function buildWorkByte(data) {
    return new Uint8Array([
        ...bcs_1.bcs.ser("u64", data.length).toBytes(),
        ...data.flatMap(v => [...v])
    ]);
}
//#endregion
exports.WorkerStrategies = {
    STRATEGY_ADD_BASE_TOKEN_ONLY: 1,
    STRATEGY_ADD_TWO_SIDES_OPTIMAL: 2,
    STRATEGY_LIQUIDATE: 3,
    STRATEGY_WITHDRAW_MINIMIZE_TRADING: 4,
    STRATEGY_PARTIAL_CLOSE_LIQUIDATE: 5,
    STRATEGY_PARTIAL_CLOSE_MINIMIZE_TRADING: 6
};
