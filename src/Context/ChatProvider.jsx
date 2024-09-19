import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [contactList, setContactList] = useState([]);
    const [openedChat, setOpenedChat] = useState({});
    const [loading, setLoading] = useState(true)
    const [server, setServer] = useState(false)
    const [fetchAgain, setFetchAgain] = useState(false)
    const [notification, setNotification] = useState([]);
    const checkServer = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/check`)
            if (data) {
                setServer(true)
            }
        } catch (error) {
            setTimeout(() => {
                checkServer()
            }, 5000)
        }
    }
    useEffect(() => {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"))
            setUser(userInfo)
            if (server&&!userInfo) {
                setLoading(false)
                navigate("/")
            }
            else if(!server){
                checkServer()
            }
    }, [navigate])

    useEffect(()=>{
        if(user)setLoading(false)
    },[user,loading])

    return <ChatContext.Provider value={{ user, setUser, contactList, setContactList, openedChat, setOpenedChat, loading, setLoading, notification, setNotification,fetchAgain, setFetchAgain, server}}>
        {children}
    </ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider;