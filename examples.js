<!-- 1 -->
function* gen() {
  let res = yield '3 + 3';
  alert(res); // 6
}

let generator = gen();

alert( generator.next().value ); // '3 + 3'
alert( generator.next(6).done ); // true

<!-- 2 -->
function* getGithubUser() {
  const user = {'login' : 'KatrynDm7'};
  let githubFetch = yield fetch(`https://api.github.com/users/${user.login}`);
  let githubUserInfo = yield githubFetch.json();

  let img = new Image();
  img.src = githubUserInfo.avatar_url;
  document.body.appendChild(img);
  return img.src;
}

// function for execution code from generators
function execute(generator, yieldValue) {
  let next = generator.next(yieldValue);

  if (!next.done) {
    next.value.then(
      result => execute(generator, result),
      err => generator.throw(err)
    );
  } else {
    // block is for 'return' from generators
    alert(next.value);
  }
}
execute(getGithubUser());
