const productCarousel = tns({
  container: '.product-carousel .slider-list',
  controls: false,
  navContainer: '.product-carousel .thumbnail-list',
  navAsThumbnails: true,
  arrowKeys: true,
  autoplay: false,
  autoplayHoverPause: true,
  autoplayButtonOutput: false,
  mouseDrag: true,
  preventScrollOnTouch: true, //스크립트오류 없애려고사용
})

const userGallery = tns({
  container: '.user-gallery .slider-list',
  gutter: 4,
  edgePadding: 16,
  controls: false,
  loop: false,
  arrowKeys: true,
  mouseDrag: true,
  preventScrollOnTouch: true, //스크립트오류 없애려고사용
  responsive: {
    768: {
      gutter: 6,
      edgePadding: 75,
      controls: true,
    },
  },
})
