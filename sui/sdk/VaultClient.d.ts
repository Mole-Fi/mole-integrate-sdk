import { PaginatedEvents, SuiClient, SuiEvent, SuiMoveObject } from '@mysten/sui.js/client';
import { AnyNumber, DevInspectOptions, Options, SuiMove, SuiTable, Supply } from "./types";
import { SingleModuleUpgradeClient } from "./SingleModuleUpgradeClient";
export interface VaultInfo {
    config_addr: string;
    vault_debt_share: string;
    vault_debt_val: string;
    last_accrue_time: string;
    reserve_pool: string;
    decimals: number;
    coin: string;
    magic_coin_supply: SuiMove<Supply>;
    debt_coin_supply: SuiMove<Supply>;
    positions: SuiMove<SuiTable>;
    next_position_id: string;
    fair_launch_user_cap: SuiMoveObject;
}
export interface Position {
    worker: string;
    owner: string;
    debt_share: string;
}
export interface DepositEvent {
    account: string;
    amount: string;
    share: string;
}
export interface WithdrawEvent {
    account: string;
    share: string;
    amount: string;
}
export interface WorkEvent {
    id: string;
    loan: string;
}
export interface KillEvent {
    id: string;
    killer: string;
    owner: string;
    posVal: string;
    debt: string;
    prize: string;
    left: string;
}
export interface AddCollateralEvent {
    id: string;
    amount: string;
    health_before: string;
    health_after: string;
}
export declare class VaultClient extends SingleModuleUpgradeClient {
    constructor(client: SuiClient, address: string, upgradeAddr?: string | undefined);
    
    getVaultInfo(vaultInfoId: string): Promise<VaultInfo>;
    
}
