//First name, Second name, Email address

function User(f_name, s_name, email, password) {
  this.f_name = f_name;
  this.s_name = s_name;
  this.email = email;
  this.password = password;
}

function Post(user, message, comments, stars, community) {
  this.user = user;
  this.message = message;
  this.comments = comments;
  this.stars = stars;
  this.community = community;
}

function Community(users, posts, images) {
  this.users = users;
  this.posts = post;
  this.images = images;
}
