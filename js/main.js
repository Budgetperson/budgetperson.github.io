google.load("feeds", "1");
google.setOnLoadCallback(onGoogleReady);

function onGoogleReady() {
  var feed_url = "http://yash.svbtle.com/feed";
  var google_feed = new google.feeds.Feed(feed_url);

  google_feed.load(function(result) {
    for (var i = 0; i < 4 && typeof result.feed.entries[i] != 'undefined'; i++) {
      var entry = result.feed.entries[i];
      var post_html = "<li><a href=\"" + entry.link + "\">" + entry.title + "</a></li>";
      $("#posts").append(post_html);
    }
  });
}