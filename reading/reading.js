const table = document.getElementById('reading-list')

const response = fetch('reading-list.csv')
  .then((response) => response.text())
  .then((obj) => Papa.parse(obj))
  .catch((err) => console.log(err))

response.then((obj) => {
  console.log(obj)
  const data = obj.data
  data.forEach((entry, index) => {
    const row = document.createElement('tr')
    // keep only relevant items
    let cleanEntry = [entry[0], entry[1], entry[7], entry[5]]
    // add only if read
    if (cleanEntry[3] === 'read') {
      cleanEntry = cleanEntry.slice(0, 3)
      cleanEntry.forEach((column, index) => {
        let cellType = null
        if ((index = 0)) {
          // table head
          cellType = 'th'
        } else {
          cellType = 'td'
        }
        const tableCell = document.createElement(cellType)
        // clean date
        if (column.includes("/")) {
          const inputDate = column
          const [year, month, day] = inputDate.split('/')
          const dateObject = new Date(`${year}-${month}-${day}`)
          const cleanDate = dateObject.toLocaleDateString("de-CH", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
          })
          column = cleanDate
          console.log(cleanDate)
        }
        tableCell.innerText = column
        row.appendChild(tableCell)
      })
      table.appendChild(row)
    }
  })
})

/*
0: "Title" ​​​​
1: "Authors" ​​​​
6: "Date Added"
*/
