//! select element :
const getDataBtn = document.querySelector(".getData-btn");
const dataContainer = document.querySelector(".data-container");
const searchContainer = document.querySelector(".search-container");
const tableData = document.querySelector(".table-body");
const searchInput = document.querySelector(".search-input");
const priceBtn = document.querySelector(".price-btn");
const dateBtn = document.querySelector(".date-btn");
const chevron = document.querySelectorAll(".fa-chevron-down");
//! add events :
getDataBtn.addEventListener("click", showTableData);
searchInput.addEventListener("input", searchByRefId);
priceBtn.addEventListener("click", sortByPrice);
dateBtn.addEventListener("click", sortByDate);

// ! FUNCTIONS

let data = [];
async function getAccountFromAPI() {
  try {
    const res = await axios.get("http://localhost:3000/transactions");
    data = res.data;
  } catch (err) {
    console.log(err, "error .....");
  }
}
const result = await getAccountFromAPI();

function showTableData(e) {
  e.preventDefault();
  getDataBtn.style.display = "none";
  dataContainer.style.display = "flex";
  searchContainer.style.display = "flex";
  getAccountFromAPI();
  createTableAccount(data);
}

function createTableAccount(account = []) {
  let result = "";
  account.forEach((a) => {
    result += `<tr>
          <td class="text-gray">${a.id}</td>
          <td class=${a.type === "افزایش اعتبار" ? "textGreen" : "textRed"}>
          ${a.type}</td>
          <td>${a.price}</td>
          <td class="text-gray">${a.refId}</td>
          <td class="text-gray">${new Intl.DateTimeFormat("fa-IR", {
            dateStyle: "short",
            timeStyle: "short",
          }).format(a.date)}</td>
        </tr>`;
  });
  tableData.innerHTML = result;
}

function searchByRefId(e) {
  e.preventDefault();
  const searchRefId = e.target.value;
  axios
    .get(`http://localhost:3000/transactions?refId_like=${searchRefId}`)
    .then((res) => {
      createTableAccount(res.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function sortByPrice() {
  if (chevron[0].classList.contains("deg-180")) {
    chevron[0].classList.remove("deg-180");
    axios
      .get("http://localhost:3000/transactions?_sort=price&_order=asc")
      .then((res) => {
        createTableAccount(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    chevron[0].classList.add("deg-180");
    axios
      .get("http://localhost:3000/transactions?_sort=price&_order=desc")
      .then((res) => {
        createTableAccount(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}

function sortByDate() {
  if (chevron[1].classList.contains("deg-180")) {
    chevron[1].classList.remove("deg-180");
    axios
      .get("http://localhost:3000/transactions?_sort=date&_order=asc")
      .then((res) => {
        createTableAccount(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } else {
    chevron[1].classList.add("deg-180");
    axios
      .get("http://localhost:3000/transactions?_sort=date&_order=desc")
      .then((res) => {
        createTableAccount(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
