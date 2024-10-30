const { SuiClient } = require('@mysten/sui.js/client');

function getSuiProvider(suiNodeUrl) {
    return new SuiClient({url: suiNodeUrl})
}

module.exports = {
    getSuiProvider,
}