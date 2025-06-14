---
title: "Writeups"
layout: archive
permalink: /writeups/
author_profile: true
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
