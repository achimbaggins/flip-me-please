const timeFormat = time => {
    let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember']
    let date = new Date(time)
    return `${date.getDate()} ${bulan[date.getMonth()]} ${date.getFullYear()}`
}

export default timeFormat