const express = require("express");
const { Font, RankCardBuilder, LeaderboardBuilder } = require("canvacord");
const random = require('@sefinek/random-animals');
const app = express();

Font.fromFileSync("./ggsans-bold.ttf");

app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/rankcard", async (req, res) => {
  const { name, avatar, currentXp, requiredXp, level, rank, barColor, bgColor } =
    req.query;

  const card = new RankCardBuilder()
    .setDisplayName(name)
    .setAvatar(avatar)
    .setCurrentXP(currentXp)
    .setRequiredXP(requiredXp)
    .setLevel(level)
    .setRank(rank)
    .setOverlay(90)
    .setBackground(bgColor ? `#${bgColor}` : "#23272a");

  card.setStyles({
    progressbar: {
      thumb: {
        style: {
          backgroundColor: `#${barColor}`,
        },
      }
    },
  });

  res.setHeader("Content-Type", "image/png");
  res.send(await card.build());
});

app.post('/leaderboard', async (req, res) => {
    const {header, players} = req.body;

    const leaderboard = new LeaderboardBuilder()
    .setHeader(header)
    .setPlayers(players)
    .setVariant("default");

    res.setHeader("Content-Type", "image/png");
    res.send(await leaderboard.build());
})

app.get('/cat', async (req, res) => {
  const data = await random.cat();

  res.send(data.message);
})

app.get('/dog', async (req, res) => {
  const data = await random.dog();

  res.send(data.message);
})

app.listen(3000, () => console.log("Image API is ready!"));
