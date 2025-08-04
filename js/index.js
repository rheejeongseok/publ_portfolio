window.addEventListener("load",() => {
	pageInit();
	clickEvt();
});

function clickEvt(){
	$(".page__anchor").click(e => {
		const $this = $(e.currentTarget);
		const pageType = $this.data("anchor");
		setPage(pageType)
	});

	$(".content__tab-btn").click(e => {
		const $parent = $(e.currentTarget).parent();
		$parent.addClass("on").siblings().removeClass("on");
	})
}

function pageInit(){
	setPage("intro");
}

function setPage(page, isPopState = false){
	const $body = $(".content__body");
	const url = window.location.origin
	const path = url.indexOf("github") > -1 ? "publ_portfolio" : "01newpf";
	console.log(url, path)
	$.ajax({
		url:`${url}/${path}/html/${page}.html`
		, dataType:'html'
		, beforeSend: () => {
			console.log("before")
			$body.removeClass("on");
		}
		, success: (data) => {
			console.log("ok")
			$body.html(data);
		}
		, complete: () => {
			console.log("end")
			setTimeout(() => {
				$body.addClass("on");
			}, 100);
		}
	});
}