const { VaultClient } = require("./sui/sdk/VaultClient");
const { getSuiProvider } = require("./sui/utils/provider");

// Replace the node url with your own node 
const suiNodeUrl = "https://sui-mainnet.blastapi.io/15edfa43-a00f-41d2-b4aa-622d14d93290"

// Find addresses from sui\config\.sui_mainnet.json
const moleVaultPackageAddr = "0x5ffa69ee4ee14d899dcc750df92de12bad4bacf81efa1ae12ee76406804dda7f"
const moleVaultUpgradeAddr = "0x78bf4657eba8b390474715d51dcee7513593cb9db349071653d1f0a6d2c3b294"
const buckVaultInfo = "0xb28d919bdc15549dd98c8318b574bb55d9557eb676db87395ad1502d6a4c8c47"
const buckTokenDecimal = 9

// Price , replace with your own price getter
baseTokenPrice = 1

const vault = new VaultClient(getSuiProvider(suiNodeUrl), moleVaultPackageAddr, moleVaultUpgradeAddr);

Promise.resolve().then(() => vault.getVaultInfo(buckVaultInfo)).then(vaultInfo=> 
{
    const vaultInfoTotalToken = BigInt(vaultInfo.coin) + BigInt(vaultInfo.vault_debt_val) - BigInt(vaultInfo.reserve_pool);
    const vaultInfoTotalSupply = BigInt(vaultInfo.magic_coin_supply.fields.value)
    const vaultInfoReservePool = BigInt(vaultInfo.reserve_pool)
    const vaultInfoVaultDebtVal = BigInt(vaultInfo.vault_debt_val)

    // Statics ---- 
    const baseTokenPerIbToken = vaultInfoTotalSupply === 0n ? 1 : vaultInfoTotalToken.toString() / vaultInfoTotalSupply.toString()
    const totalSupply = (vaultInfoTotalToken + vaultInfoReservePool).toString() / Math.pow(10, buckTokenDecimal)
    const totalToken = vaultInfoTotalToken.toString() /  Math.pow(10, buckTokenDecimal)
    const totalBorrowed = vaultInfoVaultDebtVal.toString() / Math.pow(10, buckTokenDecimal)
    const tvl = vaultInfoTotalToken.toString() * baseTokenPrice / Math.pow(10, buckTokenDecimal)
    
    console.log("Statics:" , 
                "\n mToken/Token ratio:", baseTokenPerIbToken, 
                "\n totalSupply:", totalSupply,
                "\n totalToken:", totalToken,
                "\n totalBorrowed:", totalBorrowed,
                "\n tvl:", tvl
            )
})


