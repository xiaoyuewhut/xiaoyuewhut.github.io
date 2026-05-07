import { posts } from "/content/posts.js";

const formatDate = (value) =>
  new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(value));

const postGrid = document.querySelector("#post-grid");
const archiveList = document.querySelector("#archive-list");
const homePostPreview = document.querySelector("#home-post-preview");

if (postGrid) {
  postGrid.innerHTML = posts
    .map(
      (post) => `
        <article class="post-card ${post.featured ? "post-card-featured" : ""}">
          <div class="post-meta">
            <span>${post.category}</span>
            <span>${formatDate(post.date)}</span>
          </div>
          <h3><a href="/posts/${post.slug}.html">${post.title}</a></h3>
          <p>${post.summary}</p>
          <a class="post-link" href="/posts/${post.slug}.html">阅读文章</a>
        </article>
      `
    )
    .join("");
}

if (archiveList) {
  archiveList.innerHTML = posts
    .map(
      (post) => `
        <article class="archive-item">
          <div>
            <p class="archive-meta">${post.category} / ${formatDate(post.date)}</p>
            <h2><a href="/posts/${post.slug}.html">${post.title}</a></h2>
          </div>
          <p>${post.summary}</p>
        </article>
      `
    )
    .join("");
}

if (homePostPreview) {
  homePostPreview.innerHTML = posts
    .slice(0, 2)
    .map(
      (post) => `
        <article class="signal-item">
          <p class="archive-meta">${post.category} / ${formatDate(post.date)}</p>
          <h3><a href="/posts/${post.slug}.html">${post.title}</a></h3>
          <p>${post.summary}</p>
        </article>
      `
    )
    .join("");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});
