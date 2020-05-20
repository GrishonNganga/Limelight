function Community(name, user, post, links, comments) {
  this.communityName = name;
  this.user = user;
  this.post = post;
  this.links = links;
  this. comments = comments;
}
var newCommunity = new Community("techCommunity", "Bruno", "Check out my new project", "https://btg001.github.io/pizzeria/", "This is really nice!");
console.log(newCommunity);
console.log(newCommunity.communityName);
console.log(newCommunity.user);
console.log(newCommunity.post);
console.log(newCommunity.links);

