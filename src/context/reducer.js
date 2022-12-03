const reducer = (state, action) => {
    switch (action.type) {
        case "SET_ACCOUNTS":
            console.log("Setting account to: ", action.payload)
            return {
                ...state,
                accounts: action.payload,
            }
        case "SET_SIGNER":
            console.log("Setting signer to: ", action.payload)
            return {
                ...state,
                signer: action.payload,
            }
        case "SET_ACTIVE_ACCOUNT":
            console.log("Setting active account to: ", action.payload)
            return {
                ...state,
                activeAccount: action.payload,
            }
        default:
            return state
    }
}

export default reducer