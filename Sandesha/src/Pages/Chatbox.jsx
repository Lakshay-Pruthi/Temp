import { useContext, useEffect, useState } from "react";
import Chat from "./Chat";
import { MainContext } from "./Main";

function Chatbox(props) {

    const { contract, userAccount } = useContext(MainContext)

    const { roomContract } = props;

    const [roomName, setRoomName] = useState('Room')

    const [Members, setMembers] = useState(userAccount)

    const [reload, setReload] = useState(false);

    const [sending, setSending] = useState(false)

    const [addingMember, setAddingMember] = useState(false)


    useEffect(() => {
        async function loadName() {
            const name = await roomContract.methods.name().call();
            console.log(name);
            setRoomName(name);
        }
        roomContract && loadName();
    }, [roomContract])


    useEffect(() => {
        async function loadMembers() {
            const length = await roomContract.methods.getNumberOfMembers().call();
            const memb = [];
            for (let i = 0; i < length; i++) {
                const member = await roomContract.methods.members(i).call();
                memb.push(<li>{member}</li>)
            }
            setMembers(memb);
        }
        roomContract && loadMembers();
    }, [roomContract, Members])

    async function addMemberToRoom(e) {
        e.preventDefault();
        setAddingMember(true)
        const address = e.target[0].value;

        const memberAdded = await roomContract.methods.addMember(address).send({ from: userAccount, gas: 200000 })

        contract.methods.addUserRoom(address, roomContract._address).send({ from: userAccount, gas: 200000 })

        setMembers()
        console.log(addingMember);
        setAddingMember(false)
        console.log(addingMember);
    }

    async function SendMessage(e) {
        e.preventDefault();
        setSending(true);
        const message = e.target[0].value;
        const sending = await roomContract.methods.sendMessage(userAccount, message).send({ from: userAccount });
        setReload(!reload)
        setSending(false)
    }


    return (
        <>
            <header>
                {roomName}
                <div>
                    <ul>Members
                        <li>{userAccount}</li>
                        {Members}
                    </ul>
                    <form onSubmit={addMemberToRoom} id="header-form">
                        <input type="text" placeholder="Enter address of the user" />
                        <button>{addingMember ? 'Adding...' : '+ Add member'}</button>
                    </form>
                </div>
            </header>
            <div className='chatBody'>

                <div className="message-outer-left"><div className='message-left'><p>Sandesha Bot</p>Welcome! Before sending messages or adding members to this group please note :<br /> 1. Once a member added can't be removed <br />2. Once a message sent can't be edited or deleted.</div></div>
                <Chat roomContract={roomContract} reload={reload} />
            </div>
            <form onSubmit={SendMessage} id='message-form'>
                <input type="text" id="msgInput" placeholder='your message here....' />
                <button className='primaryBtnDesign' id="sendbutton" type='submit'>{sending ? 'sending' : 'send'}</button >
            </form>
        </>
    )
}

export default Chatbox;