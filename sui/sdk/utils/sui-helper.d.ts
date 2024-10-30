import { CoinStruct, EventId, PaginatedEvents, SuiClient, SuiEvent, SuiObjectResponse } from '@mysten/sui.js/client';
import { AnyNumber } from "../types";
export declare const ADDRESS_ZERO: string;
export declare function getObjectAs<T>(obj: SuiObjectResponse): T;
