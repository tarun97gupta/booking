import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./reserve.css"
import { faCircleXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../../hooks/useFetch"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Reserve = ({ setOpen, hotelId }) => {

    const { data } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`)

    const { date } = useContext(SearchContext)

    const navigate = useNavigate()

//Getting the dates inside the date range function.

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        let list = []

        while (date <= end) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return list
    }

    const allDates = getDatesInRange(date[0].startDate, date[0].endDate)

//Here we are trying to flag a room if it is booked on that particular date and will disable it using this flag. Some Array operations are performed.

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        );

        return !isFound;
    };

    const [selectedRooms, setSelectedRooms] = useState([])

//Here we are checking if the room is selected or unselected and capturing the same data in above state.

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))
    }

    const handleClick = async () => {
        try {

//We are using Promise all as we are using a map function along with a put/fetch API. So that this function waits for all the operations to be finished asynchronously

            await Promise.all(selectedRooms.map((roomId) => {
                const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, { dates: allDates })
                return res.data
            }))
            setOpen(false)
            navigate("/")
        } catch (err) {

        }
    }

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
                <span>Select Your Rooms : </span>

//Here we are trying to display Different types of rooms along with Room numbers(hence the double map)

                {data.map((item) => {
                    return (
                        <div className="rItem" key={item._id}>
                            <div className="rItemInfo">
                                <div className="rTitle">{item.title}</div>
                                <div className="rDesc">{item.desc}</div>
                                <div className="rMax">
                                    Max people :<b>{item.maxPeople}</b>
                                </div>
                                <div className="rPrice">{item.price}</div>
                            </div>
                            <div className="rSelectRooms">
                                {item.roomNumbers.map((roomNumber) => {
                                    return (
                                        <div className="room">
                                            <label>{roomNumber.number}</label>
                                            <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)}></input>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <button onClick={handleClick} className="rButton">Reserve Now</button>
            </div>
        </div>
    )
}

export default Reserve