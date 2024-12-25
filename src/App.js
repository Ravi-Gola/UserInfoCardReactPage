import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [user,setuser]=useState({});
  async function fetchUserData() {
    try {
      const response = await fetch('https://randomuser.me/api/?page=1&results=1&seed=abc');
      const data = await response.json();
      console.log(data,data.results[0].name.title); // Print the data in the console
      let obj={};
      obj["first"]=`${data.results[0].name.title} ${data.results[0].name.first}`;
      obj["last"]=data.results[0].name.last;
      obj["phone"]=data.results[0].phone
      obj["gender"]=data.results[0].gender
      obj["imgurl"]=data.results[0].picture.large
      setuser(obj);
    } catch (error) {
      console.error('Error fetching data:', error); // Handle errors
    }
  }

  // useEffect to call fetchUserData when the component mounts
  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <div className="App-body flex justify-center items-center min-h-screen bg-gray-100 p-7">
        <div className='flex flex-row bg-slate-950 shadow-lg rounded-lg overflow-hidden w-full max-w-md md:max-w-2xl p-6'>
               {/* Left Section - Image */}
        <div className="w-1/3">
          <img
            src={user.imgurl}
            alt={`${user.first} ${user.last}`}
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Section - User Info */}
        <div className="w-2/3 ps-8 flex flex-col justify-start">
          {/* Name */}
          <div className="flex items-center gap-x-2.5">
            <div className="font-semibold text-white">
              <p>{user.first}</p>
            </div>
            <div className="font-semibold text-white">
              <p>{user.last}</p>
            </div>
          </div>

          {/* Gender */}
          <div className="mt-4">
            <p className="text-base text-left text-gray-500 font-medium">{user.gender}</p>
          </div>

          {/* Phone */}
          <div className="mt-4">
            <p className="text-base text-left text-gray-500 font-medium">{user.phone}</p>
          </div>
        </div>
        </div>
       
      </div>
    </div>
    
    
  );
}

export default App;
