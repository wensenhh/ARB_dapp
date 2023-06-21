export const networkConfig = {
    serverUrl: import.meta.env.VITE_BASE_URL,
    requestTimeout: 15000,
    chain: {
        Id: '0xa4b1',
        name: 'Arbitrum One',
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        blockExplorerUrls: ["https://explorer.arbitrum.io"],
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18
        },
    }
}