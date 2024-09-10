const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('input')
const gnbSearchHistroy = gnbSearch.querySelector('.search-history')
const gnbSearchHistroyList = gnbSearchHistroy.querySelector(
  '.search-history-list'
)

const deleteAllButton = gnbSearchHistroy.querySelector(
  '.search-history-header button'
)

function closeGnbSearchHistory(e) {
  if (!gnbSearch.contains(e.target)) {
    gnbSearchHistroy.classList.remove('is-active')
    window.removeEventListener('click', closeGnbSearchHistory)
  }
}

function openGnbSerchHistory() {
  // 체크 => gnbSearchHistroyList 안에 li가 몇개 있는지
  // li가 0개면 실행 x
  if (gnbSearchHistroyList.children.length === 0) {
    return
  }

  if (!gnbSearchHistroy.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistory)
  }
  gnbSearchHistroy.classList.add('is-active')
}

gnbSearchInput.addEventListener('focus', openGnbSerchHistory)

function deleteAllSearchHistoryItems() {
  //gnbSearchHistroyList안에 들어있는 모든 li를 삭제
  gnbSearchHistroyList.innerHTML = ''
  gnbSearchHistroy.classList.remove('is-active')
}

deleteAllButton.addEventListener('click', deleteAllSearchHistoryItems)
