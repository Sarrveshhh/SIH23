
import styles from "./ChatList.module.css";

const ChatList = ({ data, setChatClicked }) => {
    
    return (
        <div className={styles.list}>

            <div className={styles.header}>

            </div>

            {data.map((agency) => {
                return (
                    <div className={styles.listItem} onClick={() => setChatClicked(agency.name)}>
                        <p>{agency.name}</p>
                    </div>
                )
            })}

        </div>
    )

}

export default ChatList