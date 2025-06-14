---
layout: category
title: "learned"
author_profile: true
permalink: /learned/
---
<div class="posts">
  {% for post in site.categories.learned %}
    <article class="post">
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
      <div>{{ post.excerpt }}</div>
    </article>
  {% endfor %}
</div>
