import { useContext, useEffect, useState } from 'react';
import logo from '../assets/Logo2.jpg'
import room from '../contracts/Room.json'
import Chat from './Chat';
import Chatbox from './Chatbox';
import { MainContext } from './Main';

function Rooms() {

    const { web3, contract, userAccount } = useContext(MainContext);


    const [rooms, setRooms] = useState([]);

    const [roomContract, setRoomContract] = useState(null)



    useEffect(() => {
        async function loadRooms() {
            const length = await contract.methods.getNumberOfRooms(userAccount).call();
            const roooms = [];
            for (let i = 0; i < length; i++) {
                const address = await contract.methods.userRooms(userAccount, i).call();
                const name = await loadContractName(address);
                roooms.push(<li key={i} onClick={() => displayChat(address)}><p className='roomname'>{name}</p><p className='roomAddress'>{address}</p></li>)
            }
            setRooms(roooms);
        }
        userAccount && loadRooms();
    }, [userAccount, contract])


    async function loadRoomContract(address) {
        const cont = new web3.eth.Contract(room.abi, address);
        setRoomContract(cont);
    }

    async function loadContractName(address) {
        const cont = await new web3.eth.Contract(room.abi, address);
        const name = await cont.methods.name().call();
        return name;
    }

    async function loadChat(cont) {
        const length = await cont.methods.getNumberOfMessages().call();
        console.log(length);
        for (let i = 0; i < length; i++) {
            const message = cont.methods.messages(i).call();
            console.log(message);
        }
    }

    async function displayChat(address) {
        const cont = await new web3.eth.Contract(room.abi, address);
        showChat();
        loadRoomContract(address)
        loadChat(cont)
    }

    function showChat() {
        const box = document.getElementById('chat')
        box.style.display = 'none';
        const box2 = document.getElementById('chatBox')
        box2.style.display = 'flex'
    }




    return (
        <>
            <div className="Rooms-outer">
                <div className="rooms">
                    <ul>
                        <li id='chatHeading'><h3>Chats</h3></li>
                        {rooms.length == 0 ?
                            <p>Start messaging by creating a room.</p>
                            :
                            rooms
                        }

                    </ul>
                </div>
                <div id="chat">
                    <div id="left">
                        <img src={logo} alt="" />
                        <h1>Welcome</h1>
                        <p>Sandesha == Decentralized == Privacy</p>
                        <p>Start messaging...</p>
                    </div>
                </div>
                <div id='chatBox'>
                    <Chatbox roomContract={roomContract} />
                </div>
            </div>
        </>
    )
}
export default Rooms;