import { SuiObjectRef } from "@mysten/sui.js/bcs";
import { ExecuteTransactionRequestType, SuiJsonValue } from "@mysten/sui.js/client";
import { TransactionArgument, TransactionBlock } from "@mysten/sui.js/transactions";
import { Keypair } from "@mysten/sui.js/cryptography";
export interface SuiWallet {
    signAndExecuteTransactionBlock?: (input: {
        transactionBlockSerialized: string;
    }) => Promise<any>;
    signAndSubmitTransactionBlock?: (input: {
        transactionBlockSerialized: string;
    }) => Promise<any>;
}
export type Options = {
    from?: Keypair;
    requestType?: ExecuteTransactionRequestType;
    gasPayment?: SuiObjectRef[];
    gasBudget?: number;
    gasPrice?: number;
    estimateSuccess?: boolean;
    estimateMaxGasAmountRatio?: number;
    estimateMaxGasAmount?: boolean;
    checkSuccess?: boolean;
    showBalanceChanges?: boolean;
    showEffects?: boolean;
    showEvents?: boolean;
    showInput?: boolean;
    showObjectChanges?: boolean;
};
export type DevInspectOptions = {
    from?: string;
    gasBudget?: number;
    gasPrice?: number;
    epoch?: string;
};
export declare const CLOCK_OBJECT_ID = "0x0000000000000000000000000000000000000000000000000000000000000006";
/**
 * BlockedValue to adapter Transaction and TransactionBlock (sui incompatible upgrade)
 */
export declare class BlockedValue {
    static CLS_TYPE_TAG: string;
    static isBlockedValue(input: any): boolean;
    static fromAddresses(addresses: string[]): BlockedValue;
    static fromBytes(bytes: Uint8Array | Iterable<number>): BlockedValue;
    static fromGetter(getter: (block: TransactionBlock) => TransactionArgument): BlockedValue;
    static clock(): BlockedValue;
    private readonly TYPE_TAG;
    private readonly callback;
    constructor(callback: (tx: TransactionBlock) => any);
    make(tx: TransactionBlock): any;
}
export type AnyNumber = bigint | number;
export type Bytes = Uint8Array;
export type BlockedSuiJsonValue = SuiJsonValue | BlockedValue;
export interface MoveModuleCallTransaction {
    packageObjectId?: string;
    module?: string;
    function: string;
    typeArguments: string[];
    arguments: BlockedSuiJsonValue[];
    gasPayment?: SuiObjectRef[];
    prepare?: (block: TransactionBlock) => void;
}
export interface MoveCallTransaction {
    packageObjectId: string;
    module: string;
    function: string;
    typeArguments: string[];
    arguments: BlockedSuiJsonValue[];
    gasPayment?: SuiObjectRef[];
    gasBudget?: number;
    gasPrice?: number;
    prepare?: (block: TransactionBlock) => void;
}
export interface LpCoinTypes {
    xCoinType: string;
    yCoinType: string;
}
export interface CoinTypes {
    xCoinType: string;
    yCoinType: string;
}
export interface ReinvestTypes {
    reinvestLP: string;
    midReinvestLP: string;
}
export interface WorkerCoinTypes {
    baseCoinType: string;
    farmingCoinType: string;
    lpCoinType: string;
}
export type WorkerCoinTypesWithSwap = WorkerCoinTypes & {
    otherCoinType: string;
};
export type WorkerCoinTypesWithSwapTwoOthers = WorkerCoinTypes & {
    otherCoinAType: string;
    otherCoinBType: string;
};
export interface DeltaNeutralCoinTypes {
    stableCoinType: string;
    assetCoinType: string;
    lpCoinType: string;
}
export interface OracleCoinTypes {
    xCoinType: string;
    yCoinType: string;
    lpCoinType: string;
}
export interface SuiMove<T> {
    type: string;
    fields: T;
}
export interface SuiDynamicField<T> {
    id: UID;
    name: string;
    value: SuiMove<T>;
}
export interface UID {
    id: string;
}
export interface Bag {
    id: UID;
    size: string;
}
export interface SuiTable {
    id: UID;
    size: string;
}
export interface Supply {
    value: string;
}
export interface Coin {
    id: UID;
    balance: string;
}
export interface TypeName {
    name: string;
}
export interface I32 {
    bits: number;
}
/**
 * address without 0x prefix
 */
export type BCSAddress = string;
export type BCSU64 = bigint;
export type BCSU8 = number;
export interface BCSTable {
    id: BCSAddress;
    size: BCSU64;
}
export interface BCSTypeName {
    name: string;
}
export declare const WORKER_STABLE = 1n;
export declare const WORKER_ASSET = 2n;
export interface DepositWorkByteInput {
    workerType: AnyNumber;
    id: AnyNumber;
    baseCoinAmount: AnyNumber;
    farmingCoinAmount: AnyNumber;
    borrowAmount: AnyNumber;
    maxReturn: AnyNumber;
    strategy: number;
    minLpAmount: AnyNumber;
}
export interface WithdrawWorkByteInput {
    workerType: AnyNumber;
    id: AnyNumber;
    baseCoinAmount?: AnyNumber;
    farmingCoinAmount?: AnyNumber;
    borrowAmount?: AnyNumber;
    maxReturn: AnyNumber;
    strategy: number;
    maxLpTokenToLiquidate: AnyNumber;
    maxDebtRepayment: AnyNumber;
    minFarmingToken: AnyNumber;
}
export declare function buildDepositWorkByte(input: DepositWorkByteInput): Uint8Array;
export declare function buildWithdrawWorkByte(input: WithdrawWorkByteInput): Uint8Array;
export declare function buildWorkByte(data: Uint8Array[]): Uint8Array;
export declare const WorkerStrategies: {
    STRATEGY_ADD_BASE_TOKEN_ONLY: number;
    STRATEGY_ADD_TWO_SIDES_OPTIMAL: number;
    STRATEGY_LIQUIDATE: number;
    STRATEGY_WITHDRAW_MINIMIZE_TRADING: number;
    STRATEGY_PARTIAL_CLOSE_LIQUIDATE: number;
    STRATEGY_PARTIAL_CLOSE_MINIMIZE_TRADING: number;
};
