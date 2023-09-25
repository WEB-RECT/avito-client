import {io} from 'socket.io-client'
import Cookies from "universal-cookie";

const cookies = new Cookies();

const socket = io('http://localhost:8020/', {
    query: {
        token: cookies.get('token'),
    }
})

export default socket