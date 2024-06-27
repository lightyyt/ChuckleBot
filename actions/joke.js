const _joke = (msg) => {
  get_joke().then((joke) => {
    msg.reply(joke[0]).then((emsg) => {
      setTimeout(function () {
        emsg.edit(joke[0] + "\n" + joke[1]);
          }, 2000);
        });
    });
}

async function get_joke(type = "") {
  try {
    const response = await fetch("https://joke.deno.dev/" + type);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const setup = data.setup;
    const punchline = data.punchline;
    return [setup, punchline];
  } catch (error) {
    console.error("Error fetching Joke:", error.message);
  }
}

module.exports = _joke;