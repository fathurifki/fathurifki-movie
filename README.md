# Movie Database

Techstack
1. React ( Vite + React )
4. React-persist
5. bootstrap + react-bootstrap for Component Library
6. Axios 
7. React Lottie for micro interaction library adobe to JSON
8. Styled Component for Styling the component
9. Redux Toolkit with RTK Query for Server State Management

The API used is the [**OMDb API**](https://www.omdbapi.com/). We'll be required to register and submit request to retreive API key. To get info on how to request for API key, head over to [API Key](https://www.omdbapi.com/apikey.aspx) page.

How to run :

    1. git clone git@github.com:fathurifki/fathurifki-movie.git
    2. yarn
    3. yarn dev
    4. add file .env with VITE_API_KEY=<apikey>

Note: 
Because on Search component using event onKeyDown, make sure after input value, press the Enter button for get the result


Deployed at Vercel: https://fathurifki-movie.vercel.app/
