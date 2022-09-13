import { memoize } from "lodash";
const apiUrl = process.env.REACT_APP_APIURL;



// here we are fetching particular spell information by calling api
// The input required is the index of the spell
export async function getSpellDetails(index: string | undefined) {
    try {
        const response = await fetch(`${apiUrl}spells/${index}`);
        return await response.json();
    } catch (error: any) {
         // we can implement error handling here as such we are printing the error and throwing error message
        console.log(error.message);
        throw error;
    }
}

// Caching happens via lodash memoize
export default memoize(getSpellDetails);
