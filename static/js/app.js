// from data.js
tableData = data;
var tbody = d3.select("tbody");
search = {}

function load(tableData) {
    d3.select("tbody").selectAll("tr").remove()
    tableData.forEach((data) => {
        var row = tbody.append("tr");
        Object.entries(data).forEach(([key, value]) => {
            var cell = row.append("td")
            cell.text(value);
        })
    })
}

d3.select("#filter-btn").on("click", function () {
    if (Object.values(search).length===0) {load(tableData)}
    else {load(listFilter(search,tableData))}
    
})

d3.selectAll("input").on("change", function (d,i) {
    if (!this.value.trim()==""){
        search[Object.keys(tableData[0])[i]]=this.value.trim()
    }
    else {delete search[Object.keys(tableData[0])[i]]} 
})

function listFilter(filters, data) {
    
    let keysList = Object.keys(filters)
    keysList.forEach(key => {
        data = data.filter((item) => { return filters[key] == item[key] });
    });
    return data
}

load(tableData)