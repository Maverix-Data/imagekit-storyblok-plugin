# ImageKit Storyblok Plugin

> **⚠️ Work in Progress**  
> This plugin is under active development and **not yet production-ready**. The API may change without notice, and breaking changes may be introduced as new features are added. If you choose to use or fork this project, consider pinning to a specific commit and watch the repository for updates.

A Storyblok field plugin that embeds the [ImageKit Media Library Widget](https://imagekit.io/docs/dam/embeddable-media-library-widget), allowing content editors to browse and select assets from ImageKit directly within Storyblok.

## Plugin Options

These options are configured per field when adding the plugin to a block schema in Storyblok (`Edit field > Plugin Options`):

| Option key | Type | Required | Description |
|---|---|---|---|
| `imagekitId` | string | Yes | Your ImageKit account ID (found in the ImageKit dashboard) |
| `multiple` | `"true"` / `"false"` | No | Allow selecting multiple assets. Defaults to `true` |
| `maxFiles` | numeric string e.g. `"5"` | No | Maximum number of assets selectable in one session |

The selected assets are stored as an array on the field's content value, each with: `fileId`, `name`, `filePath`, `url`, `thumbnail`, `fileType`, `mime`, `width`, `height`, `size`.

## Usage

For development, run the application locally with

```shell
npm run dev
```

and open the [Sandbox](https://plugin-sandbox.storyblok.com/field-plugin/).

## Deployment

Issue a [personal access token](https://app.storyblok.com/#/me/account?tab=token), rename `.env.local.example` to `.env.example`, set the value of `STORYBLOK_PERSONAL_ACCESS_TOKEN`, and run

```shell
npm run deploy
```

This builds the project and deploys it to your Storyblok account under `My account > My Plugins`.

For CI/CD, define `STORYBLOK_PERSONAL_ACCESS_TOKEN` as an environment variable and run:

```shell
npm run deploy --name $NAME --skipPrompts
```
