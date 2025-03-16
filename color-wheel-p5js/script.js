function setContentHeight(content, isActive) {
	if (isActive) {
		const contentHeight = content.scrollHeight + 2;
		content.style.height = contentHeight + "px";
	} else {
		content.style.height = "0px";
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const accordionHeaders = document.querySelectorAll(".accordion-heading");

	accordionHeaders.forEach((header) => {
		const item = header.parentElement;
		const content = item.querySelector(".accordion-content");
		const isActive = item.classList.contains("active");
		setContentHeight(content, isActive);

		header.addEventListener("click", function () {
			const isActive = item.classList.toggle("active");
			setContentHeight(content, isActive);
		});
	});
});
