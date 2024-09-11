const productTab = document.querySelector('.product-tab')
const prooductTabButtonList = productTab.querySelectorAll(
  '.product-tab-item button'
)

const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

let currentActiveTab = productTab.querySelector('.is-active')

function toggleActiveTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = tabItem
  }
}

function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')

  const tabPanel = document.querySelector(`#${tabPanelId}`)

  const scrollAmout =
    tabPanel.getBoundingClientRect().top -
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE)

  window.scrollBy({
    top: scrollAmout,
    behavior: 'smooth',
  })
}

prooductTabButtonList.forEach(function (button) {
  button.addEventListener('click', toggleActiveTab)
  button.addEventListener('click', scrollToTabPanel)
})

// 1 . 각 tabPanel 의 y축 위치 (문서의 시작점에서부터 얼마나 아래에 있는지)
// 2. 요소의 y 축 위치 = window.scrollY + element.getBoundingCiientRect().top

const productTabPanelIdList = [
  'product-spec',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recommendation',
]

const productTabpPanelList = productTabPanelIdList.map(function (panelId) {
  const tabPanel = document.querySelector(`#${panelId}`)
  return tabPanel
})

const productTabpPanelPositionMap = {}

function detectTabPanelPosition() {
  // 각각의 tabPanel의 y축 위치를 찾는다
  // productTabpPanelPositionMap에 그 값을 업데이트
  // ex
  // {
  //   'product-spec': 1000,
  //   'product-review': 5000,
  //   ...
  // }
  productTabpPanelList.forEach(function (panel) {
    const id = panel.getAttribute('id')
    const position = window.scrollY + panel.getBoundingClientRect().top
    productTabpPanelPositionMap[id] = position
  })
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', detectTabPanelPosition)
