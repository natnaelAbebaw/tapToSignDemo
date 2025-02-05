async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const dropdownContents = document.querySelectorAll(`.dropdown-content`);
  dropdownContents.forEach((e) => e.classList.remove("visible"));

  const dropdownContent = document.querySelector(`#dropdown${index}`);

  const currentElement = e.target;
  dropdownContent.classList.toggle("visible");

  function handleOutsideClick(e) {
    if (
      !currentElement.contains(e.target) &&
      !dropdownContent.contains(e.target)
    ) {
      dropdownContent.classList.remove("visible");
    }

    document.removeEventListener("click", handleOutsideClick);
  }

  document.addEventListener("click", handleOutsideClick);
};

let deals = [];

const statusMapping = {
  Preparing: `<span class="item-score badge text-bg-secondary-subtle  text-capitalize">Preparing</span>`,
  Waiting: `<span class="item-score badge text-bg-info-subtle text-capitalize">Waiting</span>`,
  Funded: `<span class="badge text-bg-success-subtle text-capitalize">Funded</span>`,
  Resign: `<span class="item-score badge text-bg-info-subtle text-capitalize">Resign</span>`,
  Signed: `<span class="item-score badge text-bg-warning-subtle text-capitalize">Signed</span>`,
  Incomplete: `<span class="item-score badge text-bg-danger-subtle  text-capitalize">Incomplete</span>`,
  Verified: ` <span class="item-score badge text-bg-primary-subtle  text-capitalize">Verified</span>`,
  Printed: `<span class="item-score badge text-bg-secondary-subtle  text-capitalize">Printed</span>`,
  Resigned: ` <span class="item-score badge text-bg-warning-subtle text-capitalize">Resigned</span>`,
  Capped: `<span class="item-score badge text-bg-primary-subtle  text-capitalize">Capped</span>`,
  Unwind: `<span class="item-score badge text-bg-danger-subtle  text-capitalize">Unwind</span>`,
  Titled: `<span class="item-score badge text-bg-info-subtle  text-capitalize">Titled</span>`,
};

const url = new URL("https://taptosign.com/getSalesPersonTapToSignLogNew");

// Add query parameters
const params = {
  search: "",
  page: 0,
  size: 25,
  showDeleted: false,
  showHidden: false,
  selectedDealFilter: "",
  selectedDealTypeFilter: "",
  salesPersonFilter: "",
  dateTypeFilter: "Sale Date",
  secondDealershipId: "",
  sortby: -1,
  startDate: "",
  endDate: "",
};
Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

function getToken() {
  let cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [name, value] = cookie.split("=");
    if (name === "auth_token") {
      return value;
    }
  }
  return null;
}

if (!getToken()) {
  window.location.href = "/tapToSignDemo/pages/login.html";
}

// Set headers
const headers = {
  accept: "*/*",
  "accept-encoding": "gzip, deflate, br, zstd",
  "accept-language": "en-US,en;q=0.9",
  "content-length": "0",
  "content-type": "text/plain; charset=utf-8",
  "user-agent":
    "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.188 Safari/537.36 CrKey/1.54.250320",
};

const loadEvent = new Event("contentLoaded");
let isLoading = true;
// Make the POST request
fetch(url, {
  method: "GET",
  headers: headers,
  body: null, // No body for this request
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => {
    deals = data.data;
    document.dispatchEvent(loadEvent);
    // console.log(deals);
  })

  .catch((error) => console.error("Error:", error));

const tableBody = document.getElementById("table-body");
const spinner = document.getElementById("spinner");

document.addEventListener("contentLoaded", renderDeals);

if (isLoading) {
  spinner.classList.remove("d-none");
}

function renderDeals() {
  console.log(deals);
  isLoading = false;
  spinner.classList.add("d-none");
  deals.forEach(function (deal, i) {
    tableBody.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
               <!-- <td>
                        <div class="form-check">
                                <input
                                  class="form-check-input list-checkbox"
                                  type="checkbox"
                                  id="listCheckboxSeventeen"
                                />
                                <label
                                  class="form-check-label"
                                  for="listCheckboxSeventeen"
                                ></label>
                              </div>
                            </td> -->
                            <td>
                            
                          
                                <a
                                class="item-name text-reset"
                                href="profile-posts.html"
                                >${deal.BuyerName}</a
                              >
                              <div class="fs-5 text-secondary">${
                                deal.BuyerEmail
                              }</div>

                              ${
                                deal.DealType != "IsRetailDeal"
                                  ? `  <div class="btn-group">
                                <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" data-bs-auto-close="false" aria-expanded="false">
                                  Select Deal Type
                                </button>
                                <ul class="dropdown-menu">
                                
                                  <li >
                                    <label  class="dropdown-item d-flex align-items-center gap-2" >
                                      
                                      <span class="fs-5 text-capitalize">Retail Deal</span>
                                    </label>
                                  </li>
  
                                  <li>
                                    <label  class="dropdown-item d-flex align-items-center gap-2" >
                                      
                                      <span class="fs-5 text-capitalize">Quote</span>
                                    </label>
                                  </li>
                          
                                  <li >
                                    <label  class="dropdown-item  d-flex align-items-center gap-2" >
                                      
                                      <span class="fs-5 text-capitalize">Test Drive</span>
                                    </label>
                                  </li>
  
                                  <li >
                                    <label  class="dropdown-item  d-flex align-items-center gap-2" >
                                     
                                      <span class="fs-5 text-capitalize">Wholesale</span>
                                    </label>
                                  </li>

                                  <li >
                                    <label  class="dropdown-item  d-flex align-items-center gap-2" >
                                     
                                      <span class="fs-5 text-capitalize">Car Buying</span>
                                    </label>
                                  </li>  <li >
                                    <label  class="dropdown-item  d-flex align-items-center gap-2" >
                                      
                                      <span class="fs-5 text-capitalize">Credit App
                                      </span>
                                    </label>
                                  </li>
                                </ul>
                              </div>`
                                  : "Retail Deal"
                              }
                            </td>
                            <td class="">
                              <!-- Text -->
                                <a
                                class="item-name text-reset"
                                href="profile-posts.html"
                                > ${deal.Make ? deal.Make : deal.TradeMake} ${
        deal.Model
      } </a> 
                            </td>
                            <td>
                              <!-- Email -->
                              <a
                                class="item-email text-reset"
                                href="mailto:john.doe@company.com"
                                >
                                ${deal.SalesPersonName}
                                </a>
                                <div class="fs-5 text-secondary">${
                                  deal.Lienholder
                                }</div>
                            </td>
                            <td>
                           
                              <div class="btn-group mb-2">
                              <button type="button" class="btn custom-btn text-secondary">Still Preparing</button>
                                <button type="button" class="btn custom-btn custom-btn-last dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <span class="visually-hidden">Toggle Dropdown</span>
                              
                                </button>
                                
                                <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">
                                    <div class="d-flex align-items-center gap-2">
  
                                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M10 18l5 -5a1.414 1.414 0 0 0 -2 -2l-5 5v2h2z" /></svg>
                                    
                                    <span>Sign Another Form</span>
                                  </div>
                                  </a></li>
                                  <li><a class="dropdown-item" href="#">
                                    <div  class="d-flex align-items-center gap-2">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-square-number-3"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M10 9a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1" /></svg>
                                    <span> 3rd Party Trade</span>
                                  </div>
                                   </a></li>
                                  <li><a class="dropdown-item" href="#">
                                    <div  class="d-flex align-items-center gap-2">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M12 11l0 6" /><path d="M9 14l6 0" /></svg>
                                    <span> Add Stips From App</span>
                                  </div>
                                 
                                   </a></li>
                                   <div class="dropdown-divider"></div>
                                  <li><a class="dropdown-item" href="#">
                                    <div class="d-flex align-items-center gap-2">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    <span>Delete</span>
                                    </div>
                                    </a></li>
  
                                </ul>
                              </div>
  
             
                            </td>
                            <td>
                              <!-- Badge -->
                             
      

                                 ${statusMapping[deal.DealStatus]}
                             
                            </td>
                            <td>
                              <!-- Link -->
                              <div
                              class=" d-flex flex-column fs-5 text-secondary"
                              href="team-overview.html"
                              >
                              <span>${deal.SaleDate}</span>
                         
                          </div>
                            </td>
  
                          
                            <td >
  
                             <div class="d-flex align-items-center">
  
                              <button type="button" class="btn btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="Request Stips">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-import"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 13v-8a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5m-9.5 -2h7m-3 -3l3 3l-3 3" /></svg>
                              </button>
                            

                              
                              <button type="button" class="btn btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="Delete Deal">
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>

                              </button>

                        
  
                              <button type="button" class="btn btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="Google Review">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
    
                                  </button>
  
                     
  
                              <div class="dropdown">
                                 <a
                                  class="dropdown-ellipses dropdown-toggle d-flex justify-content-center align-items-center btn-dropdown"
                                  href="#"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                > 
                                <button  class="btn btn-sm">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dots-circle-horizontal"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M8 12l0 .01" /><path d="M12 12l0 .01" /><path d="M16 12l0 .01" /></svg>
                              </button>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                 
                                  <a href="#!" class="dropdown-item">
                                    <div class="d-flex align-items-center gap-3">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                                    <span>Add Notes</span>
                                  </div>
                                  </a>
                                  <a href="#!" class="dropdown-item">
                                    <div class="d-flex align-items-center gap-3">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-message-chatbot"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" /><path d="M9.5 9h.01" /><path d="M14.5 9h.01" /><path d="M9.5 13a3.5 3.5 0 0 0 5 0" /></svg>
                                   <span>Get Support</span>
                                   </div>
                                  </a>
                                  <a href="#!" class="dropdown-item">
                                    <div class="d-flex align-items-center gap-3">
  
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-notes"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" /><path d="M9 7l6 0" /><path d="M9 11l6 0" /><path d="M9 15l4 0" /></svg>
                                    <span>
                                      Logs
                                    </span> 
                                   </div>
  
                                  </a>
                                </div>
                              </div>
  
                            </div>
                            </td>

                            <td class="text-center fixed-Wdith"></td>

                            <td class="text-center fixed-column">
                                <button class="btn btn-white btn-custom-2 ">
                                  <div class="d-flex align-items-center gap-2">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
                                  <span>Edit</span>
                                </button>
                            </td>
  
                          </tr>`
    );
  });
}
