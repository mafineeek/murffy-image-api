const express = require("express");
const { Font, RankCardBuilder, LeaderboardBuilder } = require("canvacord");
const app = express();

Font.fromFileSync("./ggsans-bold.ttf");

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Image API is UP!",
    });
})

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

app.listen(5252, () => console.log("Image API is ready!"));
