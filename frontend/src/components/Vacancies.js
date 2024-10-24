// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Vacancies = () => {
//   const [vacancies, setVacancies] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/jobs');
//         setVacancies(response.data);  // Update state with the fetched jobs
//       } catch (error) {
//         setError('Error fetching vacancies');
//       }
//     };

//     fetchJobs();  // Call the fetch function when the component loads
//   }, []);

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold">Vacancies</h2>
//       <ul>
//         {vacancies.map((vacancy) => (
//           <li key={vacancy.id} className="p-4 border-b">
//             <h3 className="font-bold">{vacancy.title}</h3>
//             <p>{vacancy.description}</p>
//             <p>Salary: {vacancy.salary}</p>
//             <p>Deadline: {new Date(vacancy.deadline).toLocaleDateString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Vacancies;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        console.log(response.data); // Log the fetched data to the console
        setVacancies(response.data);  // Update state with the fetched jobs
      } catch (error) {
        console.error(error); // Log the error to the console
        setError('Error fetching vacancies');
      }
    };

    fetchJobs();  // Call the fetch function when the component loads
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">Vacancies</h2>
      <ul>
        {vacancies.map((vacancy) => (
          <li key={vacancy.id} className="p-4 border-b">
            <h3 className="font-bold">{vacancy.title}</h3>
            <p>{vacancy.description}</p>
            <p>Salary: {vacancy.salary}</p>
            <p>Deadline: {vacancy.deadline}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vacancies;
