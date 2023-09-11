
import styles from "./EachChat.module.css";

const EachChat = ({ chatClicked }) => {
    return (
        <>
            <div className={styles.eachChat}>
                {
                    chatClicked===""
                    ?
                    <div className={styles.initial}>
                        <p>Select a chat to get started...</p>
                    </div>
                    :
                    <div className={styles.chat}>
                        <div className={styles.header}>
                            {chatClicked}
                        </div>
                        <div>
                            <input type="text" placeholder="   Type your message" className={styles.text}/>
                        </div>
                    </div>
                }
            </div>        
        </>
    )
}

export default EachChat;