window.addEventListener("load",() => {
	console.log("asdf")
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
	const $body = $(".content__body");
	
	$.ajax({
		url:`${window.location.origin}/01newpf/html/main.html`
		, dataType:'html'
		, beforeSend: () => {
			console.log("before")
		}
		, success: (data) => {
			console.log("ok")
			$body.html(data);
		}
		, complete: () => {
			console.log("end")
		}
	});
}

function setPage(page){
	const $body = $(".content__body");

	$.ajax({
		url:`${window.location.origin}/01newpf/html/${page}.html`
		, dataType:'html'
		, beforeSend: () => {
			console.log("before")
		}
		, success: (data) => {
			console.log("ok")
			$body.html(data);
		}
		, complete: () => {
			console.log("end")
		}
	});
}