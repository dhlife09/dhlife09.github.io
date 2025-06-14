---
layout: category
title: "Writeups"
permalink: /writeups/
taxonomy: writeups
author_profile: true
entries_layout: list   # (선택사항) 글 목록 방식
---

<div class="posts">
  {% for post in site.categories.writeups %}
    <article class="post">
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
      <div>{{ post.excerpt }}</div>
    </article>
  {% endfor %}
</div>
