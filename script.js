// Get the element with the ID 'fetchAPI', which will be used to trigger the fetch function
const clickToFetchAPI = document.getElementById('fetchAPI'); 

// Get the element with the ID 'contentSESVLatest', where the fetched data will be displayed
const content = document.getElementById('contentSESVLatest'); 

// The URL from SESV that will be fetched data
const url = `https://www.sesvtutorial.com/page-data/index/page-data.json`; 

// Variable to keep track of lesson count
let countLesson; 

// Function to display the fetched data (takes 'data' as a parameter)
function displayData(data) {

    // Extract 'edges' arrays from 'latest' and 'popular' sections of the API response
    const edges1 = data.result.data.latest.edges; 
    const edges2 = data.result.data.popular.edges; 

    // Loop through the edge1 of json data
    edges1.forEach(element => {

        // Construct the full URL for the lesson link
        const link = `https://www.sesvtutorial.com` + element.node.fields.slug; 
        
        // Get the title of the lesson
        const title = element.node.frontmatter.title; 
        
        // Create the HTML structure for the lesson (link, number lesson and title) with a line break
        const lesson = `<a href=${link}><h3>${countLesson}. ${title}</h3></a></br>`; 
        
        // Insert the created HTML into the content div
        content.insertAdjacentHTML("beforeend", lesson); 
        
        // Increment the lesson count by 1
        countLesson += 1; 
    });

    // Loop through the edge2 of json data
    edges2.forEach(element => {
        
        // Construct the full URL for the lesson link
        const link = `https://www.sesvtutorial.com` + element.node.fields.slug; 
        
        // Get the title of the lesson
        const title = element.node.frontmatter.title; 
        
        // Create the HTML structure for the lesson (link, number lesson and title) with a line break
        const lesson = `<a href=${link}><h3>${countLesson}. ${title}</h3></a></br>`; 
        
        // Insert the created HTML into the content div
        content.insertAdjacentHTML("beforeend", lesson); 
        
        // Increment the lesson count by 1
        countLesson += 1; 
    });
}

// Asynchronous function to fetch data from the API
async function fetchAPI() {
    try {
        // Use 'fetch' to get data from the API with CORS proxy (cors anywhere)
        const resp = await fetch(`https://cors-anywhere.herokuapp.com/${url}`); 

        // If the response is not OK, throw an error
        if (!resp.ok) {
            throw new Error('Failed to fetch the tutorials'); 
        }

        // Convert the response to JSON format
        const dataJSON = await resp.json(); 

        // Clear the previous content in the content div
        content.innerHTML = ""; 

        // Set the lesson count to 1 to avoid user can fetch api again
        countLesson = 1; 

        // Call the function to display the fetched data
        displayData(dataJSON); 
    
    } catch (error) {
        // Log any errors to the console
        console.error("Error:", error); 
    }
}

// Add an event listener to the 'clickToFetchAPI' element to trigger fetchAPI when clicked
clickToFetchAPI.addEventListener('click', fetchAPI); 