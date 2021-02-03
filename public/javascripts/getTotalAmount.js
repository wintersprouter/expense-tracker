
module.exports = {
  getTotalAmount: (records) => {
    let totalAmount = 0
    const item = []
    for (let i = 0; i < records.length; i++) {
      item.push(records[i])
      totalAmount += Number(item[i].amount)
    }
    const totalAmountText = totalAmount.toString()
    return totalAmountText
  },
}


