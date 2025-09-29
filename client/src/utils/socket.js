import { BASE_URL } from "../redux/constants"
import io from "socket.io-client"

export const createSocketConnection = () => {
    return io(BASE_URL)
}