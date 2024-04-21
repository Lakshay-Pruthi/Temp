import { useContext } from "react";
import { MainContext } from "../Pages/Main";

function Form() {
    const { provider, setProvider, contract, userAccount } = useContext(MainContext);
    async function createRoom(e) {
        e.preventDefault();
        const name = e.target[0].value;
        const transaction = await contract.methods.createRoom(userAccount, name).send({ from: userAccount });
        console.log(transaction);
    }

    function ConnectToWallet() {
        setProvider();
        console.log('hello');
    }

    return (
        <>
            <form onSubmit={createRoom}>
                <input type="text" placeholder="Enter the name" />
                {provider ?
                    <button type="submit" className="primaryBtnDesign">Create Room</button>
                    :
                    <button onClick={ConnectToWallet} type="button" className="primaryBtnDesign">Connect wallet | Metamask required</button>

                }
            </form>
        </>
    )
}

export default Form;