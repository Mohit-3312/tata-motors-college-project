import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

export default function BookTestDrive() {
  const [allCars, setAllCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Fuel filter state: All / EV / ICE
  const [fuelFilter, setFuelFilter] = useState('All');

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    city: 'Junagadh',
    carName: '',
    carCategory: '',
    preferredDate: '',
    preferredSlot: '10:00 AM - 12:00 PM',
    testDriveLocation: 'Showroom Visit',
  });

  // ============================================================
  // STEP 1: FETCH EV + ICE CARS
  // ============================================================
  useEffect(() => {
    setLoading(true);

    Promise.all([
      // --------------------------------------------------------
      // EV CARS
      // --------------------------------------------------------
      fetch('http://localhost:8080/tata_database/tata_ev_car_data_fetch')
        .then((res) => res.json())
        .then((data) => {

          const mappedEV = data.map((c) => {
            const car = {
              id: `ev-${c.id}`,
              name: c.name,
              category: 'Electric (.ev)',
              fuelGroup: 'EV',
              image: `/ev/${c.imageurl}.webp`,
            };


            return car;
          });


          return mappedEV;
        })
        .catch((err) => {
          console.error('❌ Error fetching EV cars:', err);
          return [];
        }),

      // --------------------------------------------------------
      // ICE CARS
      // --------------------------------------------------------
      fetch('http://localhost:8080/tata_database/tata_cars_data_fetch')
        .then((res) => res.json())
        .then((data) => {

          const mappedICE = data.map((c) => {
            const car = {
              id: `ice-${c.id}`,
              name: c.name,
              category: 'Petrol / Diesel / CNG',
              fuelGroup: 'ICE',
              image: `/car/${c.imageUrl}.avif`,
            };


            return car;
          });


          return mappedICE;
        })
        .catch((err) => {
          console.error('❌ Error fetching ICE cars:', err);
          return [];
        }),
    ])
      .then(([evList, iceList]) => {
        // Combine both lists
        const combined = [...evList, ...iceList];


      

        // Specifically check Tigor and Sierra
        const tigorCars = combined.filter((car) =>
          car.name.toLowerCase().includes('tigor')
        );

        const sierraCars = combined.filter((car) =>
          car.name.toLowerCase().includes('sierra')
        );


        setAllCars(combined);

        // Select first car automatically
        if (combined.length > 0) {
          setSelectedCar(combined[0]);

          setFormData((prev) => ({
            ...prev,
            carName: combined[0].name,
            carCategory: combined[0].category,
          }));

        }
      })
      .catch((err) => {
        console.error('❌ Error in Promise.all:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ============================================================
  // STEP 2: FILTER CARS
  // ============================================================
  const filteredCars = allCars.filter((car) => {
    if (fuelFilter === 'All') {
      return true;
    }

    return car.fuelGroup === fuelFilter;
  });

  // ============================================================
  // STEP 3: CHANGE FUEL FILTER
  // ============================================================
  const handleFilterChange = (filterType) => {

    setFuelFilter(filterType);

    const available = allCars.filter((car) =>
      filterType === 'All'
        ? true
        : car.fuelGroup === filterType
    );


    if (available.length > 0) {
      const firstCar = available[0];


      setSelectedCar(firstCar);

      setFormData((prev) => ({
        ...prev,
        carName: firstCar.name,
        carCategory: firstCar.category,
      }));
    }
  };

  // ============================================================
  // STEP 4: SELECT CAR FROM DROPDOWN
  // IMPORTANT: USE ID, NOT NAME
  // ============================================================
  const handleCarSelect = (selectedId) => {

    const carObj = allCars.find(
      (car) => car.id === selectedId
    );


    if (carObj) {
      setSelectedCar(carObj);

      setFormData((prev) => ({
        ...prev,
        carName: carObj.name,
        carCategory: carObj.category,
      }));
    } else {
      console.error(
        '❌ Could not find car with ID:',
        selectedId
      );
    }
  };

  // ============================================================
  // STEP 5: SUBMIT TEST DRIVE
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);


    try {
      const response = await fetch(
        'http://localhost:8080/tata_database/book_test_drive_store',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();


      if (response.ok && result.status === 'success') {
        setSuccessMessage(true);

        const firstCar = allCars[0];

        setFormData({
          customerName: '',
          phone: '',
          email: '',
          city: 'Junagadh',
          carName: firstCar?.name || '',
          carCategory: firstCar?.category || '',
          preferredDate: '',
          preferredSlot: '10:00 AM - 12:00 PM',
          testDriveLocation: 'Showroom Visit',
        });

        if (firstCar) {
          setSelectedCar(firstCar);
        }
      } else {
        alert(
          'Booking failed: ' +
            (result.message || 'Error occurred')
        );
      }
    } catch (error) {
      console.error(
        '❌ Error submitting test drive booking:',
        error
      );

      alert(
        'Could not connect to the backend server.'
      );
    } finally {
      setSubmitting(false);

      setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
      }}
    >
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans pb-24">

        {/* ======================================================
            HEADER
        ====================================================== */}
        <section className="relative pt-28 pb-12 px-6 max-w-7xl mx-auto text-center">

          <span className="text-xs uppercase tracking-widest bg-blue-950/80 text-blue-400 border border-blue-800/50 px-4 py-1.5 rounded-full mb-4 inline-block font-semibold">
            Seamless Dealership Experience
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Schedule a Free Test Drive
          </h1>

          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Choose your desired Tata vehicle directly from our active inventory and pick a convenient date for a doorstep or showroom test drive.
          </p>

        </section>

        {/* ======================================================
            FORM + PREVIEW
        ====================================================== */}
        <section className="px-6 max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* ==================================================
                LEFT: VEHICLE PREVIEW
            ================================================== */}
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between"
            >

              <div>

                <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block mb-2">
                  Selected Model Preview
                </span>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {selectedCar?.name ||
                    (loading
                      ? 'Loading Vehicles...'
                      : 'No Car Selected')}
                </h3>

                {/* IMAGE */}
                <div className="relative h-60 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 mb-6 flex items-center justify-center">

                  {selectedCar?.image ? (

                    <>
                      

                      <img
                        src={selectedCar.image}
                        alt={selectedCar.name || 'Car'}
                        className="w-full h-full object-cover transition-all duration-500"
                        onError={(e) => {
                          console.error(
                            '❌ IMAGE FAILED TO LOAD:',
                            selectedCar.image
                          );
                        }}
                        
                      />
                    </>

                  ) : (

                    <>
                      

                      <span className="text-red-500 text-xs">
                        Image Undefined
                      </span>
                    </>

                  )}

                  {selectedCar?.category && (
                    <div className="absolute top-4 right-4 bg-blue-950/90 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-blue-800/60">
                      {selectedCar.category}
                    </div>
                  )}

                </div>

                

                {/* VEHICLE INFO */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs text-slate-400">

                  <div className="flex justify-between">
                    <span>
                      Test Drive Duration:
                    </span>

                    <span className="text-white font-medium">
                      30 - 45 Minutes
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Executive Assigned:
                    </span>

                    <span className="text-white font-medium">
                      Dedicated Product Specialist
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>
                      Document Required:
                    </span>

                    <span className="text-emerald-400 font-medium">
                      Valid Driving License
                    </span>
                  </div>

                </div>

              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-500">
                *Doorstep test drives are subject to vehicle availability in your local jurisdiction.
              </div>

            </motion.div>

            {/* ==================================================
                RIGHT: BOOKING FORM
            ================================================== */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 md:p-8"
            >

              {/* SUCCESS MESSAGE */}
              {successMessage && (
                <div className="mb-6 p-4 bg-emerald-950/90 border border-emerald-500/50 rounded-xl text-emerald-400 text-xs font-medium text-center">
                  ✓ Test drive request saved to database! Our representative will call you to confirm your slot.
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* ==================================================
                    VEHICLE SELECTOR
                ================================================== */}
                <div>

                  <div className="flex items-center justify-between mb-2">

                    <label className="block text-slate-300 text-xs font-medium">
                      Select Vehicle Model
                    </label>

                    {/* FUEL FILTER */}
                    <div className="flex gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">

                      {[
                        {
                          label: 'All',
                          value: 'All',
                        },
                        {
                          label: '⚡ EV',
                          value: 'EV',
                        },
                        {
                          label: '⛽ Petrol/Diesel',
                          value: 'ICE',
                        },
                      ].map((tab) => (

                        <button
                          key={tab.value}
                          type="button"
                          onClick={() =>
                            handleFilterChange(
                              tab.value
                            )
                          }
                          className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                            fuelFilter === tab.value
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {tab.label}
                        </button>

                      ))}

                    </div>

                  </div>

                  {/* ==================================================
                      DROPDOWN
                      IMPORTANT: VALUE = ID
                  ================================================== */}
                  <select
                    value={selectedCar?.id || ''}
                    onChange={(e) =>
                      handleCarSelect(
                        e.target.value
                      )
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                  >

                    {filteredCars.map((car) => (

                      <option
                        key={car.id}
                        value={car.id}
                      >
                        {car.name} ({car.category})
                      </option>

                    ))}

                  </select>

                </div>

                {/* ==================================================
                    PERSONAL DETAILS
                ================================================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-slate-300 text-xs font-medium mb-1.5">
                      Full Name
                    </label>

                    <input
                      type="text"
                      required
                      pattern="[A-Za-z ]+"
                      title="Name should contain alphabets only"
                      placeholder="Full Name"
                      value={
                        formData.customerName
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerName:
                            e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                    />

                  </div>

                  <div>

                    <label className="block text-slate-300 text-xs font-medium mb-1.5">
                      Mobile Number
                    </label>

                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      title="Phone number must contain exactly 10 digits"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                    />

                  </div>

                </div>

                {/* ==================================================
                    EMAIL + CITY
                ================================================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-slate-300 text-xs font-medium mb-1.5">
                      Email Address
                    </label>

                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                    />

                  </div>

                  <div>

                    <label className="block text-slate-300 text-xs font-medium mb-1.5">
                      City / Dealer Location
                    </label>

                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          city: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    />

                  </div>

                </div>

                {/* ==================================================
                    DATE + TIME
                ================================================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-slate-300 text-xs font-medium mb-1.5">
                      Preferred Date
                    </label>

                    <input
                      type="date"
                      required
                       min={new Date().toISOString().split("T")[0]}
                      value={
                        formData.preferredDate
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredDate:
                            e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 [color-scheme:dark]"

                      //className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    />

                  </div>

                  <div>

                    <label className="block text-slate-300 text-xs font-medium mb-1.5">
                      Preferred Time Slot
                    </label>

                    <select
                      value={
                        formData.preferredSlot
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredSlot:
                            e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    >

                      <option value="10:00 AM - 12:00 PM">
                        10:00 AM - 12:00 PM
                      </option>

                      <option value="12:00 PM - 02:00 PM">
                        12:00 PM - 02:00 PM
                      </option>

                      <option value="02:00 PM - 04:00 PM">
                        02:00 PM - 04:00 PM
                      </option>

                      <option value="04:00 PM - 06:00 PM">
                        04:00 PM - 06:00 PM
                      </option>

                    </select>

                  </div>

                </div>

                {/* ==================================================
                    TEST DRIVE TYPE
                ================================================== */}
                <div>

                  <label className="block text-slate-300 text-xs font-medium mb-1.5">
                    Test Drive Type
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          testDriveLocation:
                            'Showroom Visit',
                        })
                      }
                      className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        formData.testDriveLocation ===
                        'Showroom Visit'
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      🏢 Showroom Visit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          testDriveLocation:
                            'Home Delivery',
                        })
                      }
                      className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        formData.testDriveLocation ===
                        'Home Delivery'
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      🏠 Home / Office Delivery
                    </button>

                  </div>

                </div>

                {/* ==================================================
                    SUBMIT
                ================================================== */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all text-xs shadow-lg shadow-blue-600/30 disabled:opacity-50 mt-2"
                >
                  {submitting
                    ? 'Saving Booking to Database...'
                    : 'Confirm Test Drive Booking'}
                </button>

              </form>

            </motion.div>

          </div>

        </section>

      </div>
    </ReactLenis>
  );
}
