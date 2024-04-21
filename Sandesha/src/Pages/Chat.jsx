import { useContext, useEffect, useState } from "react";
import { MainContext } from "./Main";

function Chat(props) {
    const { roomContract, reload } = props;
    const { userAccount } = useContext(MainContext);


    const [Messages, setMessages] = useState(null);

    useEffect(() => {
        async function loadMessage() {
            const length = await roomContract.methods.getNumberOfMessages().call();
            const messages = [];
            for (let i = 0; i < length; i++) {
                const messageObject = await roomContract.methods.messages(i).call();
                const sender = messageObject[0];
                const message = messageObject[1];
                if (sender == userAccount) {
                    messages.push(
                        <div key={i} className="message-outer-right"><div className='message-right'><p>{sender}</p>{message}</div></div>
                    )
                } else {
                    messages.push(
                        <div key={i} className="message-outer-left"><div className='message-left '><p>{sender}</p>{message}</div></div>
                    )
                }
            }
            setMessages(messages);
        }
        roomContract && loadMessage();
    }, [roomContract, reload])
    return (
        <>
            {Messages}
        </>
    )
}

export default Chat;