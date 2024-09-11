const productTab = document.querySelector('.product-tab')

const prooductTabButtonList = productTab.querySelectorAll(
  '.product-tab-item button'
)

let currentActiveTab = productTab.querySelector('.is-active')

function toggleActiveTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = tabItem
  }
}

prooductTabButtonList.forEach(function (button) {
  button.addEventListener('click', toggleActiveTab)
})
