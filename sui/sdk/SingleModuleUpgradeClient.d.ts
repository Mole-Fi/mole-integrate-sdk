import { BaseClient } from "./BaseClient";
import { SuiClient } from '@mysten/sui.js/client';
import { DevInspectOptions, MoveCallTransaction, MoveModuleCallTransaction, Options } from "./types";
export declare class SingleModuleUpgradeClient extends BaseClient {
    address: string;
    upgradeAddr: string;
    module: string;
    constructor(client: SuiClient, address: string, upgradeAddr: string | undefined, module: string);
    funOf(name: string): string;
    private static humpToLine;
    moduleOf(): string;
    structOf(name: string, module?: string): string;
    
}
