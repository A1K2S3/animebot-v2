module.exports = waitForAnySelector = (page, selectors) => new Promise(resolve => {
  let hasFound = false
  selectors.forEach(selector => {
    page.waitFor(selector)
      .then(() => {
        if (!hasFound) {
          hasFound = true
          resolve(selector)
        }
      })
      .catch(() => 0)
  })
})