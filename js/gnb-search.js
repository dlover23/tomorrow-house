const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('input')
const gnbSearchHistroy = gnbSearch.querySelector('.search-history')
const gnbSearchHistroyList = gnbSearchHistroy.querySelector(
  '.search-history-list'
)

const deleteAllButton = gnbSearchHistroy.querySelector(
  '.search-history-header button'
)

const deleteButtonList = gnbSearchHistroyList.querySelectorAll('.delete-button')

function closeGnbSearchHistory() {
  gnbSearchHistroy.classList.remove('is-active')
  window.removeEventListener('click', closeGnbSearchHistoryOnClickingOutside)
}

function closeGnbSearchHistoryOnClickingOutside(e) {
  if (!gnbSearch.contains(e.target)) {
    closeGnbSearchHistory()
  }
}

function openGnbSerchHistory() {
  // 체크 => gnbSearchHistroyList 안에 li가 몇개 있는지
  // li가 0개면 실행 x
  if (gnbSearchHistroyList.children.length === 0) {
    return
  }

  if (!gnbSearchHistroy.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistoryOnClickingOutside)
  }
  gnbSearchHistroy.classList.add('is-active')
}

gnbSearchInput.addEventListener('focus', openGnbSerchHistory)

function deleteAllSearchHistoryItems() {
  //gnbSearchHistroyList안에 들어있는 모든 li를 삭제
  gnbSearchHistroyList.innerHTML = ''
  closeGnbSearchHistory()
}

deleteAllButton.addEventListener('click', deleteAllSearchHistoryItems)

function deleteSearchHistoryItem(e) {
  e.stopPropagation()
  const itemToDelete = this.parentNode
  gnbSearchHistroyList.removeChild(itemToDelete)

  if (gnbSearchHistroyList.children.length === 0) {
    closeGnbSearchHistory()
  }
}

deleteButtonList.forEach(function (button) {
  button.addEventListener('click', deleteSearchHistoryItem)
})
