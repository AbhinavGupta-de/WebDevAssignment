const API_KEY = '89637ad769298da49cf9da13d62e0050';
const url = 'https://gnews.io/api/v4/search?q=';

window.addEventListener('load', () => fetchNews('entertainment'));

function reload() {
	window.location.reload();
}

async function fetchNews(query) {
	const res = await fetch(`${url}${query}&apikey=${API_KEY}`);

	const data = await res.json();
	console.log(data.articles);
	bindData(data.articles);
}

function bindData(articles) {
	const cardsContainer = document.getElementById('cards-container');
	const newsCardTemplate = document.getElementById('template-news-card');

	cardsContainer.innerHTML = '';

	if (articles && articles.length) {
		articles.forEach((article) => {
			if (!article.image) return;
			const cardClone = newsCardTemplate.content.cloneNode(true);
			fillDataInCard(cardClone, article);
			cardsContainer.appendChild(cardClone);
		});
	} else {
		console.log('No articles found');
	}
}

function fillDataInCard(cardClone, article) {
	const newsImg = cardClone.querySelector('#news-img');
	const newsTitle = cardClone.querySelector('#news-title');
	const newsSource = cardClone.querySelector('#news-source');
	const newsDesc = cardClone.querySelector('#news-desc');

	newsImg.src = article.image;
	newsTitle.innerHTML = article.title;
	newsDesc.innerHTML = article.description;

	const date = new Date(article.publishedAt).toLocaleString('en-US', {
		timeZone: 'Asia/Kolkata',
	});

	newsSource.innerHTML = `${article.source.name} · ${date}`;

	cardClone.firstElementChild.addEventListener('click', () => {
		window.open(article.url, '_blank');
	});
}

let currentSelctedNav = null;
function onNavItemClick(id) {
	fetchNews(id);
	const navItem = document.getElementById(id);
	currentSelctedNav?.classList.remove('active');
	currentSelctedNav = navItem;
	currentSelctedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
	const query = searchText.value;
	if (!query) return;
	fetchNews(query);
	currentSelctedNav?.classList.remove('active');
	currentSelctedNav = null;
});

searchText.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		searchButton.click();
	}
});

// Add javascript for modal

/* 		<div class="modal" id="modal">
			<div class="modal-content">
				<span class="close" id="close">&times;</span>
				<h2 id="modal-title">Title</h2>
				<p id="modal-desc">Description</p>
				<img
					src="https://via.placeholder.com/400x200"
					alt="news-image"
					class="modal-image"
					id="modal-img"
				/>
			</div>
		</div>	*/

const modal = document.getElementById('modal');
const close = document.getElementById('close');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalImg = document.getElementById('modal-img');

close.addEventListener('click', () => {
	modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
	if (e.target === modal) {
		modal.style.display = 'none';
	}
});

function openModal(title, desc, img) {
	modalTitle.innerHTML = title;
	modalDesc.innerHTML = desc;
	modalImg.src = img;
	modal.style.display = 'block';
}
