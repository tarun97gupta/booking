import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import './list.css'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'

function List() {
  //After Navigate from Header is set, we can use that using useLocation hook to access the state. (location.state)
  const location = useLocation()

  const [date, setDate] = useState(location.state.date)
  const [destination, setDestination] = useState(location.state.destination)
  const [options, setOptions] = useState(location.state.options)
  const [openDate, setOpenDate] = useState(false)
  const [min,setMin] = useState(undefined)
  const [max,setMax] = useState(undefined)

  const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min||0}&max=${max||999}`);

  const handleClick = ()=>{
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type='text' placeholder={destination} onChange={e=>{setDestination(e.target.value)}} />
            </div>
            <div className="lsItem">
              <label>CheckIn Date</label>
              <span onClick={() => setOpenDate((!openDate))}>{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate && <DateRange
                onChange={item => setDate([item.selection])}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date()}
              />}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsItemOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type='number' className='lsOptionInput' onChange={(e)=>setMin(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type='number' className='lsOptionInput' onChange={(e)=>setMax(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Adult
                  </span>
                  <input type='number' min={1} className='lsOptionInput' placeholder={options.adult} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Children
                  </span>
                  <input type='number' min={0} className='lsOptionInput' placeholder={options.children} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Room
                  </span>
                  <input type='number' min={1} className='lsOptionInput' placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List