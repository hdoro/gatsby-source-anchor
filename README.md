# gatsby-source-anchor

Use your [Anchor.fm](https://anchor.fm)'s RSS feed to download your podcast info into [Gatsby](https://www.gatsbyjs.org/)'s GraphQL data layer!

⚠ **Please note**: This plugin is super simple and you can probably achieve the same thing with `gatsby-source-rss`, but I figured it wouldn't hurt to publish a new package considering I had already formatted everything nicely for you ;)

## Table of content

- [Basic Usage](#basic-usage)
- [Options](#options)
- [Todo](#todo)
- [License](#license)

## Basic usage

```
yarn add gatsby-source-anchor
# or
npm i gatsby-source-anchor --save
```

```js
// in your gatsby-config.js
module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-source-anchor',
      options: {
        rss: 'https://anchor.fm/s/26das9ce/podcast/rss',
      },
    },
  ],
  // ...
};
```

This plugin generates nodes of types `anchorPodcast` and `anchorEpisodes`. Go through http://localhost:8000/___graphql after running `gatsby develop` to understand the created data and create a new query and checking available collections and fields by typing `CTRL + SPACE`.

## Options

| Options | Type   | Default | Description                                               |
| ------- | ------ | ------- | --------------------------------------------------------- |
| rss     | string |         | **[required]** Your podcasts' RSS URL, as given by Anchor |

## TODO

- Maybe save images into Gatsby?

## License

I'm not very literate on licensing, so I just went with **MIT**, if you have any considerations just let me know! Oh, and, of course, feel free to contribute to this plugin, even bug reports are welcome!
