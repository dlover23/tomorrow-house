const gnbSearch = document.querySelector('.gnb-search')
const gnbSearchInput = gnbSearch.querySelector('input')
const gnbSearchHistroy = gnbSearch.querySelector('.search-history')

function closeGnbSearchHistory(e) {
  if (!gnbSearch.contains(e.target)) {
    gnbSearchHistroy.classList.remove('is-active')
    window.removeEventListener('click', closeGnbSearchHistory)
  }
}

function openGnbSerchHistory() {
  if (!gnbSearchHistroy.classList.contains('is-active')) {
    window.addEventListener('click', closeGnbSearchHistory)
  }
  gnbSearchHistroy.classList.add('is-active')
}

gnbSearchInput.addEventListener('focus', openGnbSerchHistory)
