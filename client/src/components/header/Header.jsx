import React, { useContext } from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext.jsx'
import { AuthContext } from '../../context/AuthContext.jsx'

function Header({type}) {
    const [openDate, setOpenDate] = useState(false)
    const [destination,setDestination] = useState('')
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    //helps to send date from this location to other.
    const navigate = useNavigate()


    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    //Use Context dispatch actions are mentioned below, where the actions mentioned in Context are used.

    const {dispatch} = useContext(SearchContext)

    const handleOption = (name, operation) => {
        if (options[name] === 0 && operation === 'd') {
            return
        }
        setOptions(prev => {
            return {
                ...prev,
                [name]: operation === 'i' ? prev[name] + 1 : prev[name] - 1
            }
        })
    }

    const handleSearch = ()=>{

        dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });

    //Navigate is used to send the state to other locations as object.
    
        navigate("/hotels",{state: {destination,date,options}})
    }

    const { user } = useContext(AuthContext)


    return (
        <div className='header'>
            <div className={type === 'list' ? "headerContainer listMode" : 'headerContainer'}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flight</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport Taxis</span>
                    </div>
                </div>
                {type !== 'list' && <>
                    <h1 className="headerTitle">A Lifetime of Discounts? It's Genius</h1>
                    <p className="headerDesc">
                        Get rewarded for your Travels - Unlock instant savings of 10% or more with a Free Tarun Booking Discount
                    </p>
                    {!user && (<button className="headerBtn">Sign In/Register</button>)}
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faBed} className='headerIcon' />
                            <input type='text' placeholder='Where are you going?' className='headerSearchInput' onChange={e=>setDestination(e.target.value)} />
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                            <span onClick={() => setOpenDate((!openDate))} className='headerSearchText'>{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>

                    //Creating a date range using DateRange addon, need to create a useState too.

                            {openDate && <DateRange
                                onChange={item => setDate([item.selection])}
                                editableDateInputs={true}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                className='date'
                                minDate={new Date()}
                            />}
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                            <span onClick={() => setOpenOptions(prev => !prev)} className='headerSearchText'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                            {openOptions && <div className='options'>
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOption('adult', 'd')}>-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption('adult', 'i')}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOption('children', 'd')}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption('children', 'i')}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <button className="optionCounterButton" onClick={() => handleOption('room', 'd')}>-</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button className="optionCounterButton" onClick={() => handleOption('room', 'i')}>+</button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="headerSearchItem">
                            <button className="headerBtn" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default Header