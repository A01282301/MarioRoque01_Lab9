const API_TOKEN = "2abbf7c3-245b-404f-9473-ade729ed4653";

function fetchAllBookmarks(){
    let url = '/bookmarks';
    let settings = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        }
    }
    