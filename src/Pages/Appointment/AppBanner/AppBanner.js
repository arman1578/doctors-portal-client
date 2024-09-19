import bg from "../../../assets/images/bg.png";
import chair from "../../../assets/images/chair.png";
import { DayPicker } from 'react-day-picker';

const AppBanner = ({selectedDate, setSelectedDate}) => {
  return (
    <header style={{ background: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
     }}
      className="mt-12 ">
      <div className="hero pt-20 pb-20">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={chair}
            alt=""
            className="rounded-lg lg:ml-20 shadow-2xl lg:w-1/2"
          />
          <div className="lg:ml-20 mt-10 rounded-lg shadow-2xl bg-white">
            <DayPicker 
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
            </div>
        </div>
      </div>
    </header>
  );
};

export default AppBanner;
