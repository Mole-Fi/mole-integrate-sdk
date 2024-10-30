import { DynamicFieldName, PaginatedObjectsResponse, PaginationArguments, SuiClient, SuiObjectData, SuiObjectDataOptions, SuiObjectResponse, SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { DevInspectOptions, MoveCallTransaction, Options, SuiWallet } from "./types";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Keypair, Signer } from "@mysten/sui.js/cryptography";
export declare class BaseClient {
    static hasRegisterCommonTypes: boolean;
    static registerCommonTypes(): void;
    client: SuiClient;
    suiWallet?: SuiWallet;
    constructor(client: SuiClient, suiWallet?: SuiWallet);
    private static attachOptions;
    static getTxBlockByMoveCallTx(moveCall: MoveCallTransaction, signer?: Signer): TransactionBlock;
    static getEstimateMaxGasAmount(maxGasAmount: number, ratio?: number): number;
    getObject(id: string, // ObjectId
    options?: SuiObjectDataOptions): Promise<SuiObjectResponse>;
}
