const detailData = () => {
  const preloader = document.querySelector('.preloder');
	const renderGanreList = (ganres) => {
		const dropdownBlock = document.querySelector(
			'.header__menu .dropdown'
		);
	
		ganres.forEach((ganre) => {
			dropdownBlock.insertAdjacentHTML(
				'beforeend',
				`<li><a href="/categories.html?ganre=${ganre}">${ganre}</a></li>`
			);
		});
	};
	const renderAnimeDetails = (array, itemId) => {

    const animeObj = array.find(item => item.id === Number(itemId))
    const imageBlock = document.querySelector('.anime__details__pic')
    const viewsBlock = document.querySelector('.view')
    const titleBlock = document.querySelector('.anime__details__title h3')
    const subTitleBlock = document.querySelector('.anime__details__title span')
    const descriptionBlock = document.querySelector('.anime__details__text p')
    const widgetList = document.querySelectorAll('.anime__details__widget ul li')
    const breadcrumb = document.querySelector('.breadcrumb__links > span')
		
    console.log(animeObj);
    console.log('itemId', itemId);

    if(animeObj) {
      imageBlock.dataset.setbg = animeObj.image
      
      viewsBlock.insertAdjacentHTML('beforeend', `
          <div class="view"><i class="fa fa-eye"></i>${animeObj.views} </div>
        `)

        document.querySelectorAll('.set-bg').forEach((elem) => {
          elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
        });

        titleBlock.textContent = animeObj.title
        subTitleBlock.textContent = animeObj['original-title']
        descriptionBlock.textContent = animeObj.description
        breadcrumb.textContent = animeObj.ganre
        widgetList[0].insertAdjacentHTML('beforeend', `
            <span>Date aired:</span> ${animeObj.date}
          `)
        widgetList[1].insertAdjacentHTML('beforeend', `
            <span>Rating:</span> ${animeObj.rating}
          `)
        widgetList[2].insertAdjacentHTML('beforeend', `
            <span>Genre:</span> ${animeObj.tags.join(', ')}
          `)
        
          setTimeout(() => {
            preloader.classList.remove('active');
          }, 500);

    } else {
      console.log('Anime not found');
      
    }
	};

	

	fetch('./db.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const ganres = new Set();
			const ganreParams = new URLSearchParams(
				window.location.search
			).get('itemId');

			console.log(ganreParams);

			data.anime.forEach((item) => {
				ganres.add(item.ganre);
			});

			

			if (ganreParams) {
				renderAnimeDetails(data.anime, ganreParams);
			} else {
				console.log('No anime');        
			}

			renderGanreList(ganres);
		});
};

detailData();
