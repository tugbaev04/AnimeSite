const mainData = () => {
    
    
    const renderAnimeList = (array, genres) => {
        console.log(genres);
        console.log(array);
    }
        
    
    const renderTopAnime = (array) => {
        const wrapper = document.querySelector(".filter__gallery");
        wrapper.innerHTML = "";
        array.forEach((item) => {
            wrapper.insertAdjacentHTML("beforeend", `
                <div class="product__sidebar__view__item set-bg mix day years" data-setbg="${item.image}">
                    <div class="ep">${item.rating} / 10</div>
                    <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                    <h5><a href="/anime-details.html">${item.title}</a></h5>
                </div>
            `);
        });
        wrapper.querySelectorAll(".set-bg").forEach((item) => {
            item.style.backgroundImage = `url(${item.dataset.setbg})`
        });
    }

    fetch("./db.json").then((response) => {
        return response.json();
    })
    .then((data) => {

        const genres = new Set();
        const topAnime = data.anime.sort((a, b) => b.views - a.views).slice(0, 5);
        renderTopAnime(topAnime);

        data.anime.forEach((item) => {
            genres.add(item.genres);
        });
        renderAnimeList(data.anime, genres);
    });
};

mainData();