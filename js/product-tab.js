const productTab = document.querySelector('.product-tab')
const prooductTabButtonList = productTab.querySelectorAll(
  '.product-tab-item button'
)

const TOP_HEADER_DESKTOP = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

let currentActiveTab = productTab.querySelector('.is-active')
let disableUpdating = false

function toggleActiveTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    disableUpdating = true
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = tabItem

    setTimeout(function () {
      disableUpdating = false
    }, 1000)
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

  updateActiveTabOnScroll()
}

function updateActiveTabOnScroll() {
  if (disableUpdating) {
    return
  }

  const scrolledAmount =
    window.scrollY +
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP + 80 : TOP_HEADER_MOBILE + 8)

  let newActiveTab
  if (scrolledAmount >= productTabpPanelPositionMap['product-recommendation']) {
    newActiveTab = prooductTabButtonList[4] // 추천 버튼
  } else if (
    scrolledAmount >= productTabpPanelPositionMap['product-shipment']
  ) {
    newActiveTab = prooductTabButtonList[3] // 배송/환불 버튼
  } else if (scrolledAmount >= productTabpPanelPositionMap['product-inquiry']) {
    newActiveTab = prooductTabButtonList[2] // 문의 버튼
  } else if (scrolledAmount >= productTabpPanelPositionMap['product-review']) {
    newActiveTab = prooductTabButtonList[1] // 리뷰 버튼
  } else {
    newActiveTab = prooductTabButtonList[0] // 상품정보 버튼
  }

  // 추가 끝까지 스크롤한 경우 newActiveTab = prooductTabButtonList[4]
  // window.scrollY + sindwo.ineerHeight === body의 전체 height
  // window.ineerWidth < 1200 - orderCta, 56px
  const bodyHeight =
    document.body.offsetHeight + (window.innerWidth < 1200 ? 56 : 0)
  if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
    newActiveTab = prooductTabButtonList[4]
  }

  if (newActiveTab) {
    newActiveTab = newActiveTab.parentNode

    if (newActiveTab !== currentActiveTab) {
      newActiveTab.classList.add('is-active')
      if (currentActiveTab !== null) {
        currentActiveTab.classList.remove('is-active')
      }
      currentActiveTab = newActiveTab
    }
  }
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', detectTabPanelPosition)
window.addEventListener('scroll', updateActiveTabOnScroll)
