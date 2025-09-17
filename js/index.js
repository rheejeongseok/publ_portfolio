window.addEventListener("load",() => {
	pageInit();
	clickEvt();
});

function clickEvt(){
	const $pageAnchor = document.querySelectorAll(".page__anchor");
	$pageAnchor.forEach(anchor => {
		anchor.addEventListener("click", e => {
			const pageType = e.currentTarget.dataset.anchor;
			setPage(pageType);
		});	
	});

	const $contentTabBtn = document.querySelectorAll(".content__tab-btn");
	$contentTabBtn.forEach(btn => {
		btn.addEventListener("click", e => {
			const $parent = e.currentTarget.parentElement;
			const $active = document.querySelector(".content__tab-item.on");

			if($active && $active !== $parent) $active.classList.remove("on");
			$parent.classList.add("on");
		});
	});
}

function pageInit(){
	const $loading = document.querySelector(".loading");
	const $loadingPan = document.querySelector(".loading__pan");
	const events = ["animationend", "webkitAnimationEnd", "oAnimationEnd", "MSAnimationEnd"];
	let fire = false;
	events.forEach(event => {
		$loadingPan.addEventListener(event, () => {
			setTimeout(() => {
				if(fire) return;
				fire = true;
				if($loading) $loading.remove();
				document.dispatchEvent(new Event("loadingRemove"));
			},500);
		});
	});

	document.addEventListener("loadingRemove", () => {
		setPage("work_list");
	});

}

function setPage(page, isPopState = false){
	const $body = document.querySelector(".content__body");
	const $anchor = document.querySelector(`.content__tab-wrap .page__anchor[data-anchor=${page}]`)?.closest(".content__tab-item");
	const url = window.location.origin;
	const path = url.indexOf("github") > -1 ? "publ_portfolio" : "01newpf";
	
	$.ajax({
		url:`${url}/${path}/html/${page}.html`
		, dataType:'html'
		, beforeSend: () => {
			$body.classList.remove("on");
		}
		, success: (data) => {
			$body.innerHTML = data;
			$anchor?.classList.add("on");
		}
		, complete: () => {
				setTimeout(() => {
					$body.classList.add("on");

					const scripts = $body.querySelectorAll('script');
					scripts.forEach(oldScript => {
						const newScript = document.createElement('script');
						if (oldScript.src) {
							newScript.src = oldScript.src;
						} else {
							newScript.textContent = oldScript.textContent;
						}
						$body.appendChild(newScript);
					});
				}, 100);
		}
	});
}
/* function setPage(page, isPopState = false){
	const $body = document.querySelector(".content__body");
	const $anchor = document.querySelector(`.content__tab-wrap .page__anchor[data-anchor=${page}]`);
	const url = window.location.origin;
	const path = url.indexOf("github") > -1 ? "publ_portfolio" : "01newpf";
	
	$.ajax({
		url:`${url}/${path}/html/${page}.html`
		, dataType:'html'
		, beforeSend: () => {
			$body.classList.remove("on");
		}
		, success: (data) => {
			$body.innerHTML = data;
			if($anchor) $anchor.closest(".content__tab-item").classList.add("on");
		}
		, complete: () => {
				setTimeout(() => {
					$body.classList.add("on");

					const scripts = $body.querySelectorAll('script');
					scripts.forEach(oldScript => {
						const newScript = document.createElement('script');
						if (oldScript.src) {
							newScript.src = oldScript.src;
						} else {
							newScript.textContent = oldScript.textContent;
						}
						$body.appendChild(newScript);
					});
				}, 100);
		}
	});
} */