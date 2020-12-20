const thousandSeparator = (x) => {
    if(x === '') x = 0
    let normalize = parseInt(x.toString().replace(/\./g, "")).toString()
    return normalize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default thousandSeparator