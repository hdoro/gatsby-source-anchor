import * as Parser from 'rss-parser';
// import FeedParser from 'feedparser';
import { colorizeLog, throwError } from './helpers';

export interface IPluginOptions {
  plugins: any[];
  rss: string;
}

export const sourceNodes = async (
  { actions, cache, createContentDigest }: any,
  configOptions: IPluginOptions
) => {
  const { createNode } = actions;
  const {
    rss
  } = configOptions;

  if(typeof rss !== 'string' || rss.substr(0,4) !== 'http') {
    throwError('rss must be a valid URL!');
  }

  console.time(colorizeLog('\nAnchor podcasts fetched in'));
  const parser = new Parser();
  const anchorData = await parser.parseURL(rss);
  if (!anchorData || !anchorData.title) {
    throwError("Couldn't fetch data from the specified RSS feed");
  }

  const getEpisodeId = (guid: string) => `anchor-episode-${guid}`;

  for (const p of anchorData.items) {
    const episodeData = {
      ...p,
      embedLink: p.link.replace(/\/episodes/g, "/embed/episodes")
    }
    const episodeDigest = JSON.stringify(episodeData);
    createNode({
      ...episodeData,
      // meta information for the node
      id: getEpisodeId(episodeData.guid),
      parent: null,
      children: [],
      internal: {
        type: 'AnchorEpisode',
        mediaType: 'text/html',
        content: episodeDigest,
        contentDigest: createContentDigest(episodeDigest),
      },
    });
  }

  const podcastMeta = {
    ...anchorData,
    items: anchorData.items.map(i => ({
      item___NODE: getEpisodeId(i.guid)
    }))
  };
  const podcastDigest = JSON.stringify(podcastMeta);

  createNode({
    ...podcastMeta,
    // meta information for the node
    id: `anchor-podcast-${anchorData.feedUrl}`,
    parent: null,
    children: [],
    internal: {
      type: 'AnchorPodcast',
      mediaType: 'text/html',
      content: podcastDigest,
      contentDigest: createContentDigest(podcastDigest),
    },
  });
  console.timeEnd(colorizeLog('\nAnchor podcasts fetched in'));
};
