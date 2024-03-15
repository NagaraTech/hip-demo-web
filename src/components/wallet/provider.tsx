import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import { hooks as metaMaskHooks, metaMask } from './connectors.tsx'



const connectors: [MetaMask][] = [
    [metaMask, metaMaskHooks]
]

function Child() {
    const { connector } = useWeb3React()
    console.log(`Priority Connector is: ${(connector)}`)
    return null
}

export default function MetaMaskProvider() {
    return (
        <Web3ReactProvider connectors={connectors}>
            <Child />
        </Web3ReactProvider>
    )
}