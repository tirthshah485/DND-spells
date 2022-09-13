import { SpellResponse } from "../types/SpellResponse";
import { paginate } from "./paginate";
import { memoize } from "lodash";

const PAGE_SIZE = 20;
const apiUrl = process.env.REACT_APP_APIURL;


// here we are fatching all list of spell by calling api 
// The input required is page number
async function getPagedSpells(page: number): Promise<SpellResponse> {
    try {
        // api url taken from the environment variable
        const response = await fetch(`${apiUrl}spells`);
        const result = await response.json();
        return {
            count: result.count,
            totalPages: Math.ceil(result.count / PAGE_SIZE),
            results: paginate(result.results, PAGE_SIZE, page),
        };
    } catch (error: any) {
        // we can implement error handling here as such we are printing the error and throwing error message
        console.log(error.message);
        throw error;
    }
}

// Tirth: Caching happens via lodash memoize
export default memoize(getPagedSpells);
