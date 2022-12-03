import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import { Contract } from "ethers";
import React from "react";
import Factory from '../library/Factory.json'
import Router from '../library/Router.json'

const FactoryAbi = Factory.abi;
const RouterAbi = Router.abi;
const factoryContractAddress = "0x606641683F7A0E6Eab06194d071dC4944f4a5aCf";
const routerContractAddress = "0x0A2906130B1EcBffbE1Edb63D5417002956dFd41";

const URL = "wss://rpc-testnet.reefscan.com/ws";

export const checkExtension = async (state, dispatch) => {
    try {
        let allInjected = await web3Enable("LiteSwap");

        if (allInjected.length === 0) {
            return false;
        }

        let injected;
        if (allInjected[0] && allInjected[0].signer) {
            injected = allInjected[0].signer;
        }

        const evmProvider = new Provider({
            provider: new WsProvider(URL),
        });

        evmProvider.api.on("ready", async () => {
            const allAccounts = await web3Accounts();

            const accounts = allAccounts.map((account) => {
                return {
                    ...account,
                    name: account.meta.name,
                    evmAddress: evmProvider.api.createType("Address", account.address).toString(),
                };
            });

            accounts[0] &&
                accounts[0].address &&
                dispatch({
                    type: "SET_ACCOUNTS",
                    payload: accounts,
                });

            console.log(allAccounts);

            const wallet = new Signer(
                evmProvider,
                accounts[0].address,
                injected
            );

            // Claim default account
            if (!(await wallet.isClaimed())) {
                console.log(
                    "No claimed EVM account found -> claimed default EVM account: ",
                    await wallet.getAddress()
                );
                await wallet.claimDefaultAccount();
            }

            dispatch({
                type: "SET_ACTIVE_ACCOUNT",
                payload: accounts[0],
            });

            dispatch({
                type: "SET_SIGNER",
                payload: wallet,
            });

            console.log(wallet, allAccounts, evmProvider, allInjected);

            return true;
        });
    } catch (error) {
        console.log(error);
        return false;
    }
};

const checkSigner = async (state, dispatch) => {
    if (!state.signer) {
        await checkExtension(state, dispatch);
    }
    return true;
};

const getFactoryContract = async (state, dispatch) => {
    await checkSigner(state, dispatch);
    const factoryContract = new Contract(
        factoryContractAddress,
        FactoryAbi,
        state.signer,
    );
    return factoryContract;
}

const getRouterContract = async (state, dispatch) => {
    await checkSigner(state, dispatch);
    const routerContract = new Contract(
        routerContractAddress,
        RouterAbi,
        state.signer,
    );
    return routerContract;
}

export const addLiquidity = async (state, dispatch, tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline) => {
    const router = await getRouterContract(state, dispatch);

    // const tx = await router.addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline);

    const tx = await router.addLiquidityETH(tokenA, amountADesired, amountAMin, amountBMin, to, deadline);

    // const tx = await router.factory()

    console.log(tx);
}