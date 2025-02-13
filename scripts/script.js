let accounts = [];

let searchedAccounts = [];
let isLoading = true;
const loadEvent = new Event("contentLoaded");
let isSearch = false;
const tableBody = document.getElementById("table-body");
const pagingContainer = document.getElementById("paging-container");
const spinner = document.getElementById("spinner");
const searchInput = document.getElementById("search");

const dataRenderFn = (dataPage) => {
  return `${dataPage
    .map(
      (account) =>
        `  <tr class="text-start">
                <td><div></div></td>
                <td class="max-width-1">
                  <a class="text-reset text-start" href="/profile-posts"
                    >${account.SalesPersonName}</a
                  >
                </td>
                <td class="max-width-2">
                  <a class="text-reset" href="mailto:Rick@carlink.com"
                    >${account.EmailId}</a
                  >
                </td>
                <td>
                  <a class="text-reset" href="tel:239-392-1400">${account.PhoneNo}</a>
                </td>
                <td>CarLink</td>
                <td><div class="text-reset">${account.UpdatedDate}</div></td>
                <td>
                  <button type="button" class="btn btn-light">Log in</button>
                </td>
                <td>
                  <div class="dropdown">
                    <span
                      class="dropdown-ellipses dropdown-toggle"
                      id="react-aria5413409790-:r2:"
                      aria-expanded="false"
                      role="button"
                      ><svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-more-vertical"
                      >
                        <g>
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </g></svg
                    ></span>
                  </div>
                </td>
              </tr>`
    )
    .join("")}`;
};

temGetAllAccounts();
document.addEventListener("contentLoaded", function () {
  spinner.classList.add("d-none");
  const options = {
    dataContainer: document.getElementById("table-body"),
    pagingContainer: document.getElementById("paging-container"),
    dataRenderFn: dataRenderFn,
    data: accounts,
  };

  new PaginationSystem(options);
});

async function getAllAccounts() {
  const url = `${window.location.origin}/getSalesPersonList`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({}),
    credentials: "include",
  });

  const data = await response.json();
  console.log(data);
  accounts = data.data;
  document.dispatchEvent(loadEvent);
}

async function temGetAllAccounts() {
  console.log("temGetAllAccounts");
  const url = "https://taptosign.com/getSalesPersonList";
  const headers = {
    "Content-Type": "text/plain;charset=UTF-8",
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9",
    Origin: "https://taptosign.com",
    Referer: "https://taptosign.com/accounts.html",
    "Sec-Ch-Ua":
      '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    Cookie:
      "G_ENABLED_IDPS=google; auth_token=wV_N95ZlmrzN6YtaWPAj_aWvazX77O6XgoK8cRsVpMfzARZ5WGCMpsLkelCdOAUHiSPQXnc9hpYmQGP3e8mOA91FEaX_e26HBJP4IueB2e8ed5ckRbWcr4ScNDY2NK_z8Xay1Bowoj21ASmzbzU_EqhMSfCMGoyjrKaV1Xyegw_buJnMhsHT0dytPtFFUHQkwrrej3i7L4DTJfpiiaq6aznYEy-pIkB1S341_JcRs1sWCJdPARtBJqZqN2MXRh_2Bk95jcqyn9874a7CtjtNzBE=; auth_account_token=74T1EUV9qY8FK54umDZW6S44KLQPm_UEDLPp-d26xpNFWfedH8RUJwF8ClIxgHAjeFkV_hnHos7SpbVfcU0oTsHpzUm9CWsDfoBX2FDATaGuuxSIR73xJ_BOphSm-QX6kqpnmQm1m3F-rSh4GiNXwuVuWVR3jsNbxTNc4jhACQw4VUc0S7k-hkDr86BnR_kbj1WeaG5w3RvCwHLwm7Oan7tq9TPTNwC7v0X77eC9Lv3qX9CJ1vxM3dgFDl4905AOI6GOCsVdsfje3GpXP62ZPux1dIqy9dhSeJMtvKD-l32tiw==; auth_token_new=6qzT7qOHQ8NcXn7hmGv6uO7cyzQlAAPfNEJrdVwzKqvt1881GInxHvL6Ss3bLGKf_ErawhVdC80mq3D4NNaRekdldrRwGjOTWASkz1Fgs2Z6oGcpz3NytF-Vd4dT2I9MxLOM64YXS2N433EtXKKc9StZWjcVHdJ4UlzO8BNDZhGtwU2l5-1glZ2Dt95GdtTCoV4YKMJRWI4OI4DvBkEqa9KABP38GkdEj-GvhSs7nd_5msrAR2u21zM79VDEnbOzfUg_9CHuYwi23Xpj64WFbQs=; auth_token_new=6qzT7qOHQ8NcXn7hmGv6uO7cyzQlAAPfNEJrdVwzKqvt1881GInxHvL6Ss3bLGKf_ErawhVdC80mq3D4NNaRekdldrRwGjOTWASkz1Fgs2Z6oGcpz3NytF-Vd4dT2I9MxLOM64YXS2N433EtXKKc9StZWjcVHdJ4UlzO8BNDZhGtwU2l5-1glZ2Dt95GdtTCoV4YKMJRWI4OI4DvBkEqa9KABP38GkdEj-GvhSs7nd_5msrAR2u21zM79VDEnbOzfUg_9CHuYwi23Xpj64WFbQs=",
  };

  const body = JSON.stringify({}); // Replace with actual request body if needed

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Sales Person List:", data);

    accounts = data.data.map((account, index) => ({
      SalesPersonName: account.SalesPersonName || "N/A",
      EmailId: account.EmailId || "N/A",
      PhoneNo: account.PhoneNo || "N/A",
      DealershipName: account.DealershipName || "N/A",
      UpdatedDate: account.UpdatedDate || "N/A",
      id: index + 1,
    }));

    document.dispatchEvent(loadEvent);
  } catch (error) {
    console.error("Error fetching sales person list:", error);
    throw error;
  }
}

function searchAccounts() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const options = {
    dataContainer: document.getElementById("table-body"),
    pagingContainer: document.getElementById("paging-container"),
    dataRenderFn: dataRenderFn,
    data: accounts,
  };

  const dataPaging = new PaginationSystem(options);
  // queryObj like
  const queryObj = {
    q: { value: searchValue }, // global search
  };

  dataPaging.filterData(queryObj).then((countRecords) => {
    console.log("Found:", countRecords);
  });
}

if (isLoading) {
  spinner.classList.remove("d-none");
}

searchInput.addEventListener("input", searchAccounts);
