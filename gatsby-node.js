"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser = require("rss-parser");
// import FeedParser from 'feedparser';
const helpers_1 = require("./helpers");
exports.sourceNodes = async ({ actions, cache, createContentDigest }, configOptions) => {
    const { createNode, touchNode } = actions;
    const { rss } = configOptions;
    if (typeof rss !== 'string' || rss.substr(0, 4) !== 'http') {
        helpers_1.throwError('rss must be a valid URL!');
    }
    console.time(helpers_1.colorizeLog('\nAnchor podcats fetched in'));
    const parser = new Parser();
    const anchorData = await parser.parseURL(rss);
    if (!anchorData || !anchorData.title) {
        helpers_1.throwError("Couldn't fetch data from the specified RSS feed");
    }
    const getEpisodeId = (guid) => `anchor-episode-${guid}`;
    for (const p of anchorData.items) {
        const episodeDigest = JSON.stringify(p);
        createNode(Object.assign({}, p, { 
            // meta information for the node
            id: getEpisodeId(p.guid), parent: null, children: [], internal: {
                type: 'AnchorEpisode',
                mediaType: 'text/html',
                content: episodeDigest,
                contentDigest: createContentDigest(episodeDigest),
            } }));
    }
    const podcastMeta = Object.assign({}, anchorData, { items: anchorData.items.map(i => ({
            item___NODE: getEpisodeId(i.guid)
        })) });
    const podcastDigest = JSON.stringify(podcastMeta);
    createNode(Object.assign({}, podcastMeta, { 
        // meta information for the node
        id: `anchor-podcast-${anchorData.feedUrl}`, parent: null, children: [], internal: {
            type: 'AnchorPodcast',
            mediaType: 'text/html',
            content: podcastDigest,
            contentDigest: createContentDigest(podcastDigest),
        } }));
    console.timeEnd(helpers_1.colorizeLog('\nAnchor podcats fetched in'));
};
