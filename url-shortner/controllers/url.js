const { nanoid } = require("nanoid");
const URL = require("../models/url");

const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body?.url) return res.status(400).json({ error: "URL is required!" });
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  res.render("home", { id: shortId });
};

const handleRedirection = async (req, res) => {
  const shortId = req.params.id;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry?.redirectUrl);
};

const handleAnalytics = async (req, res) => {
  const shortId = req.params.id;
  const analytics = await URL.findOne({
    shortId,
  });
  return res.json({
    totalClicks: analytics.visitHistory.length,
    analytics: analytics.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortUrl,
  handleRedirection,
  handleAnalytics,
};
