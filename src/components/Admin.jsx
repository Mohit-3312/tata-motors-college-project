import React, { useEffect, useState } from "react";

const API =
  "http://localhost:8080/tata_database/AdminDataServlet";

export default function Admin() {

  const [activeTab, setActiveTab] = useState("cars");

  const [data, setData] = useState({
    cars: [],
    evcars: [],
    contacts: [],
    services: [],
    testdrives: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(API);

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const result = await response.json();

      setData({
        cars: result.cars || [],
        evcars: result.evcars || [],
        contacts: result.contacts || [],
        services: result.services || [],
        testdrives: result.testdrives || []
      });

    } catch (err) {

      console.error(err);

      setError(
        "Unable to connect to Tomcat. Check that Tomcat is running and the WAR is deployed."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteRecord = async (action, id) => {

    if (!window.confirm(
      "Are you sure you want to delete this record?"
    )) {
      return;
    }

    try {

      const response = await fetch(
        `${API}?action=${action}&id=${id}`,
        {
          method: "DELETE"
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Delete failed"
        );
      }

      await loadData();

    } catch (err) {

      alert(err.message);
    }
  };

  const tabs = [
    ["cars", "Cars"],
    ["evcars", "EV Cars"],
    ["contacts", "Contact Inquiries"],
    ["services", "Service Bookings"],
    ["testdrives", "Test Drives"]
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-gray-900 text-white px-8 py-5">
        <h1 className="text-2xl font-bold">
          Car Showroom Admin
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Manage vehicles and customer inquiries
        </p>
      </header>

      <div className="flex">

        <aside className="w-64 min-h-[calc(100vh-88px)] bg-white border-r">

          <div className="p-4 space-y-2">

            {tabs.map(([key, label]) => (

              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={
                  `w-full text-left px-4 py-3 rounded-lg ` +
                  `font-medium transition ${
                    activeTab === key
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {label}

                <span
                  className={
                    `float-right text-xs rounded-full px-2 py-1 ${
                      activeTab === key
                        ? "bg-blue-500"
                        : "bg-gray-200 text-gray-700"
                    }`
                  }
                >
                  {data[key].length}
                </span>
              </button>

            ))}

          </div>

        </aside>

        <main className="flex-1 p-8">

          <div className="flex justify-between items-center mb-6">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {tabs.find(
                  ([key]) => key === activeTab
                )?.[1]}
              </h2>

              <p className="text-gray-500">
                {data[activeTab].length} records
              </p>
            </div>

            <button
              onClick={loadData}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Refresh
            </button>

          </div>

          {error && (

            <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>

          )}

          {loading ? (

            <div className="bg-white rounded-xl p-10 text-center">
              <p className="text-gray-500">
                Loading...
              </p>
            </div>

          ) : (

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

              {activeTab === "cars" && (
                <CarsTable
                  cars={data.cars}
                  onDelete={deleteRecord}
                />
              )}

              {activeTab === "evcars" && (
                <EvCarsTable
                  cars={data.evcars}
                  onDelete={deleteRecord}
                />
              )}

              {activeTab === "contacts" && (
                <ContactsTable
                  data={data.contacts}
                  onDelete={deleteRecord}
                />
              )}

              {activeTab === "services" && (
                <ServicesTable
                  data={data.services}
                  onDelete={deleteRecord}
                />
              )}

              {activeTab === "testdrives" && (
                <TestDrivesTable
                  data={data.testdrives}
                  onDelete={deleteRecord}
                />
              )}

            </div>

          )}

        </main>

      </div>

    </div>
  );
}


// =========================================================
// CARS
// =========================================================

function CarsTable({ cars, onDelete }) {

  if (!cars.length) {
    return <Empty />;
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-left">

        <thead className="bg-gray-50 border-b">

          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Car</th>
            <th className="p-4">Type</th>
            <th className="p-4">Price</th>
            <th className="p-4">Range</th>
            <th className="p-4">Safety</th>
            <th className="p-4">Fuel</th>
            <th className="p-4">Popular</th>
            <th className="p-4">Action</th>
          </tr>

        </thead>

        <tbody>

          {cars.map(car => (

            <tr
              key={car.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4">
                {car.id}
              </td>

              <td className="p-4">

                <div className="font-semibold">
                  {car.name}
                </div>

                <div className="text-xs text-gray-500">
                  {car.tagline}
                </div>

              </td>

              <td className="p-4">
                {car.type}
              </td>

              <td className="p-4">
                ₹{Number(car.price).toLocaleString()}
              </td>

              <td className="p-4">
                {car.rangeOrMileage}
              </td>

              <td className="p-4">
                {car.safetyRating}/5
              </td>

              <td className="p-4">
                {car.fuelType}
              </td>

              <td className="p-4">
                {car.popular ? "Yes" : "No"}
              </td>

              <td className="p-4">

                <button
                  onClick={() =>
                    onDelete("car", car.id)
                  }
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}


// =========================================================
// EV CARS
// =========================================================

function EvCarsTable({ cars, onDelete }) {

  if (!cars.length) {
    return <Empty />;
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-left">

        <thead className="bg-gray-50 border-b">

          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Car</th>
            <th className="p-4">Price</th>
            <th className="p-4">Range</th>
            <th className="p-4">Battery</th>
            <th className="p-4">Fast Charge</th>
            <th className="p-4">Warranty</th>
            <th className="p-4">Action</th>
          </tr>

        </thead>

        <tbody>

          {cars.map(car => (

            <tr
              key={car.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4">
                {car.id}
              </td>

              <td className="p-4">

                <div className="font-semibold">
                  {car.name}
                </div>

                <div className="text-xs text-gray-500">
                  {car.tagline}
                </div>

              </td>

              <td className="p-4">
                ₹{Number(car.price).toLocaleString()}
              </td>

              <td className="p-4">
                {car.claimedrange} km
              </td>

              <td className="p-4">
                {car.batterycapacity} kWh
              </td>

              <td className="p-4">
                {car.fastchargertime} min
              </td>

              <td className="p-4">
                {car.warranty} years
              </td>

              <td className="p-4">

                <button
                  onClick={() =>
                    onDelete("evcar", car.id)
                  }
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}


// =========================================================
// CONTACTS
// =========================================================

function ContactsTable({ data, onDelete }) {

  if (!data.length) {
    return <Empty />;
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-left">

        <thead className="bg-gray-50 border-b">

          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Subject</th>
            <th className="p-4">Message</th>
            <th className="p-4">Action</th>
          </tr>

        </thead>

        <tbody>

          {data.map(row => (

            <tr
              key={row.id}
              className="border-b align-top"
            >

              <td className="p-4">
                {row.id}
              </td>

              <td className="p-4">
                {row.name}
              </td>

              <td className="p-4">
                {row.email}
              </td>

              <td className="p-4">
                {row.phone}
              </td>

              <td className="p-4">
                {row.subject}
              </td>

              <td className="p-4 max-w-xs">
                <p className="truncate">
                  {row.message}
                </p>
              </td>

              <td className="p-4">

                <button
                  onClick={() =>
                    onDelete("contact", row.id)
                  }
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}


// =========================================================
// SERVICES
// =========================================================

function ServicesTable({ data, onDelete }) {

  if (!data.length) {
    return <Empty />;
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-left">

        <thead className="bg-gray-50 border-b">

          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Car</th>
            <th className="p-4">Service</th>
            <th className="p-4">Date</th>
            <th className="p-4">Notes</th>
            <th className="p-4">Action</th>
          </tr>

        </thead>

        <tbody>

          {data.map(row => (

            <tr
              key={row.id}
              className="border-b align-top"
            >

              <td className="p-4">
                {row.id}
              </td>

              <td className="p-4">
                {row.customer_name}
              </td>

              <td className="p-4">
                {row.phone}
              </td>

              <td className="p-4">
                {row.car_model}
              </td>

              <td className="p-4">
                {row.service_type}
              </td>

              <td className="p-4">
                {row.preferred_date}
              </td>

              <td className="p-4">
                {row.notes}
              </td>

              <td className="p-4">

                <button
                  onClick={() =>
                    onDelete("service", row.id)
                  }
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}


// =========================================================
// TEST DRIVES
// =========================================================

function TestDrivesTable({ data, onDelete }) {

  if (!data.length) {
    return <Empty />;
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full text-left">

        <thead className="bg-gray-50 border-b">

          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Email</th>
            <th className="p-4">City</th>
            <th className="p-4">Car</th>
            <th className="p-4">Date</th>
            <th className="p-4">Slot</th>
            <th className="p-4">Location</th>
            <th className="p-4">Action</th>
          </tr>

        </thead>

        <tbody>

          {data.map(row => (

            <tr
              key={row.id}
              className="border-b align-top"
            >

              <td className="p-4">
                {row.id}
              </td>

              <td className="p-4">
                {row.customer_name}
              </td>

              <td className="p-4">
                {row.phone}
              </td>

              <td className="p-4">
                {row.email}
              </td>

              <td className="p-4">
                {row.city}
              </td>

              <td className="p-4">
                {row.car_name}
              </td>

              <td className="p-4">
                {row.preferred_date}
              </td>

              <td className="p-4">
                {row.preferred_slot}
              </td>

              <td className="p-4">
                {row.test_drive_location}
              </td>

              <td className="p-4">

                <button
                  onClick={() =>
                    onDelete("testdrive", row.id)
                  }
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}


// =========================================================
// EMPTY
// =========================================================

function Empty() {

  return (
    <div className="p-12 text-center">

      <div className="text-gray-400 text-4xl mb-3">
        📭
      </div>

      <p className="text-gray-500">
        No records found.
      </p>

    </div>
  );
}
