import Navbar from "../../components/Navbar/Navbar";
import ChatList from "../../components/ChatList/ChatList";
import EachChat from "../../components/EachChat/EachChat";

import agencies from "../../agencies.json";

import styles from "./Chat.module.css";
import { useState } from "react";


const agenciesData = agencies.agencies;

const Chat = () => {

    const [chatClicked, setChatClicked] = useState("");

    return (
        <>
        <Navbar />
        <div className={styles.chat}>
            <div className={styles.main}>

                <ChatList data={agenciesData} setChatClicked={setChatClicked}/>

                <EachChat chatClicked={chatClicked}/>

            </div>
        </div>
        </>
    );
};

export default Chat;
