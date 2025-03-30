const bgElements = () => {
  const container = document.querySelectorAll(".set-bg");

  container.forEach((item) => {
    let bg = item.dataset.setbg;
    item.style.backgroundImage = `url(${bg})`;
  });
};

bgElements();
