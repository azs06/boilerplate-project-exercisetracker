const formatDate = (dateString) => {
  const options = { weekday: 'short', year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

module.exports = {
    formatDate
}