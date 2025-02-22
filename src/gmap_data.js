import writeXlsxFile from 'write-excel-file'


function make_excel(data,query){
    // console.log(data,query);
    const schema = [
      { 
        column: 'Name', 
        value: (row) => row.title, 
        width: 30
      },
      { 
        column: 'Category', 
        value: (row) => row.category, 
        width: 20 
      },
      { 
        column: 'No. Of Reviews', 
        value: (row) => row.reviews, 
        width: 15 
      },
      { 
        column: 'Stars', 
        value: (row) => row.stars, 
        width: 10 
      },
      { 
        column: 'Phone Number', 
        value: (row) => row.completePhoneNumber, 
        width: 20 
      },
      { 
        column: 'Address', 
        value: (row) => row.address,
        wrap: true,
        width: 60
      },
      { 
        column: 'Place Website', 
        value: (row) => row.url===""? "" : `=HYPERLINK("${row.url}")`,
        type : "Formula",
        width: 50 
      },
      { 
        column: 'Gmap URL', 
        value: (row) => `=HYPERLINK("https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(row.title)}", "Click here")`,
        type:  "Formula",
        width: 25 
      }
    ];



    writeXlsxFile(data, {
      schema,
      fileName: `${query}.xlsx`,
    });
}

function AF_initDataCallback(dataScript) {
    const full_list = [];

    try {
        const placesData = dataScript["data"][1][0];

        for (let i = 0; i < placesData.length; i++) {
            const obj = {
                id: placesData[i][21]?.[0]?.[1]?.[4] || "",
                title: placesData[i][10]?.[5]?.[1] || "",
                category: placesData[i][21]?.[9] || "",
                address: "",
                phoneNumber: "",
                completePhoneNumber: "",
                domain: "",
                url: "",
                coor: "",
                stars: "",
                reviews: ""
            };

            try {
                obj.phoneNumber = placesData[i][10]?.[0]?.[0]?.[1]?.[0]?.[0] || "";
                obj.completePhoneNumber = placesData[i][10]?.[0]?.[0]?.[1]?.[1]?.[0] || "";
            } catch (error) {
                // Ignored
            }

            try {
                obj.domain = placesData[i][10]?.[1]?.[1] || "";
                obj.url = placesData[i][10]?.[1]?.[0] || "";
            } catch (error) {
                // Ignored
            }

            try {
                const addressData = decodeURIComponent(placesData[i][10]?.[8]?.[0]?.[2] || "");
                obj.address = addressData.split("&daddr=")[1]?.replace(/\+/g, " ") || "";
            } catch (error) {
                // Ignored
            }

            try {
                obj.coor = `${placesData[i][19]?.[0] || ""},${placesData[i][19]?.[1] || ""}`;
            } catch (error) {
                // Ignored
            }

            try {
                obj.stars = placesData[i][21]?.[3]?.[0] || "";
                obj.reviews = placesData[i][21]?.[3]?.[2] || "";
            } catch (error) {
                // Ignored
            }

            full_list.push(obj);
        }
    } catch (error) {
        return [];
        
    }

    // console.log(full_list.length);
    return full_list;
}

console.log(AF_initDataCallback);

async function fetchit(pagination){
        const url = `https://www.google.com/localservices/prolist?hl=en&ssta=1&q=${encodeURIComponent(query)}&oq=${encodeURIComponent(query)}&src=2&lci=${encodeURIComponent(pagination)}`;
        console.log(`Fetching: ${url}`);
        const flaskUrl = `http://corsproxyit.pythonanywhere.com/fetch?url=${encodeURIComponent(url)}`;
        await fetch(flaskUrl, {
                    headers: {
                        "User-Agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    }, signal
                }).then((response) => {
                    return response.json()
                }).then((html)=>{
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html.data, 'text/html');
                    if (doc.querySelector(".v6m4Rd")) {
                        // console.log("done");
                        // err = true; // Set the stop flag
                        tasks.forEach((task) => controller.abort()); // Abort remaining tasks
                        return; // Exit early
                    }
                    if (endpagination===0){
                        endpagination=+doc.querySelector('.AIYI7d').innerHTML.split(" ").at(-1);

                    }
                    const dataScript = doc.querySelector('#yDmH0d > script:nth-child(12)').innerHTML;
                    if (dataScript) {
                        const data = eval(dataScript);
                        // console.log(data)
                        if (data.length > 0) {
                            full_list.push(...data);
                        } 
                    }   
                }).catch((error) => {
                    console.error("Error fetching data:", error);
                })
    }


const full_list = [];
let endpagination=0;
let tasks = [];
const controller = new AbortController();
const signal = controller.signal;
let query;

async function search(q) {
    query=q;
    await fetchit(0);
    // console.log(endpagination,"outer loop");
    for(let pagination=1;pagination<endpagination+1;pagination++) {
    // console.log(endpagination,"in loop");
        
    tasks.push(
        fetchit(pagination)
    );
    


    }


    // Await all tasks to complete
    await Promise.all(tasks);

    // console.log("Search complete:", full_list);
    return [...new Set(full_list)];
}

export { search, make_excel };
// Usage
// search("gift shop in vandavasi ").then((data) => {
//     console.log("Final full_list:", data.length,JSON.stringify(data));
//     make_excel(data,query);
// });
