import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import './hotel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext.jsx'
import { AuthContext } from '../../context/AuthContext.jsx'
import Reserve from '../../components/reserve/Reserve.jsx'

function Hotel() {

  const location = useLocation()
  const path = location.pathname.split("/")[2]

  const [slide, setSlide] = useState({
    number: 0,
    open: false
  })

  const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/find/${path}`);

  const { date, options } = useContext(SearchContext)


  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(date[0].endDate, date[0].startDate)

  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];

  const handleArrow = (position) => {
    if ((slide.number === 0 && position === 'l') || (slide.number === photos.length - 1 && position === 'r')) {
      setSlide(prev => {
        return { ...prev, number: photos.length - prev.number - 1 }
      })
    } else if (position === 'l') {
      setSlide(prev => {
        return {
          ...prev, number: prev.number - 1
        }
      })
    } else {
      setSlide(prev => {
        return {
          ...prev, number: prev.number + 1
        }
      })
    }
  }

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className="hotelContainer">
        {slide.open && <div className='slider'>
          <FontAwesomeIcon icon={faCircleXmark} className='cancel' onClick={() => setSlide(prev => { return { ...prev, open: false } })} />
          <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleArrow('l')} />
          <div className="sliderWrapper">
            <img src={data.photos[slide.number]} alt="" className="sliderImage" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleArrow('r')} />
        </div>}
        {loading ? ("loading") : (<div className="hotelWrapper">
          <button className='bookNow'>Reserve or Book Now</button>
          <h1 className="hotelTitle">
            {data.name}
          </h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent Location - {data.distance}m from City Center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get free airport Taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div key={i} className="hotelImgWrapper">
                <img onClick={() => setSlide(prev => { return { ...prev, number: i, open: true } })} src={photo} alt="asb" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.description}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>)}

      </div>
      <MailList />
      <Footer />
      {openModal && <Reserve setOpen={setOpenModal} hotelId={path} />}
    </div>
  )
}

export default Hotel