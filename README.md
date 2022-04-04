# Basic Template marketplace

SINGLE CHAIN - BASIC MARKETPLACE - ERC721 - USING CHAIN TOKEN

## Supported Chains

Just some of the EVM

- Ethereum
- Matic
- BinanceSmartChain

## Icons in project

using Iconify, so all icons from https://icon-sets.iconify.design/ can be used.

TO DO -> More info

## Setting up

Inside the src folder, you'll find a `configData.js`, in this file we will indicate everyting about the project, once filled up, it will look like this:

```js
export const configData = {
  chainInfo: {
    chainId: 80001,
    coinCurrency: "MATIC",
    coinIcon: "cryptocurrency:matic",
    color: "#6a5ea6",
  },

  nftCollection: {
    name: "D Olympus Character",
    contract: {
      name: "DOlympusChatacterERC721",
      address: "",
      abi: "",
    },
    nftStats: [
      {
        name: "Health",
        icon: "ant-design:heart-filled",
        color: "green",
      },
      {
        name: "Speed",
        icon: "bi:lightning-charge-fill",
        color: "yellow",
      },
      {
        name: "Strength",
        icon: "icon-park-outline:muscle",
        color: "red",
      },
      {
        name: "Magic",
        icon: "ant-design:star-filled",
        color: "purple",
      },
    ],
    nftTypesFilters: false,
    nftTypes: [
      {
        text: "Tank",
        icon: "mdi:shield-account",
        color: "#9908A3",
      },
      {
        text: "Mage",
        icon: "mdi:auto-fix",
        color: "#FFEE00",
      },
      {
        text: "Rider",
        icon: "mdi:horse-variant",
        color: "#2575cf",
      },
      {
        text: "Shooter",
        icon: "mdi:bow-arrow",
        color: "#1df2bd",
      },
      {
        text: "Pirate",
        icon: "mdi:skull-crossbones",
        color: "#e87021",
      },
      {
        text: "Support",
        icon: "mdi:bottle-tonic-plus",
        color: "#208a19",
      },
      {
        text: "Killer",
        icon: "mdi:knife-military",
        color: "#ad0c1f",
      },
    ],
    orderType: {
      sort: [
        { text: "Highest Price", id: 1 },
        { text: "Lowest Price", id: 2 },
        { text: "More Recent", id: 3 },
        { text: "Older", id: 4 },
      ],
      view: [
        { text: "GRID", icon: "dashicons:grid-view" },
        { text: "LIST", icon: "dashicons:excerpt-view" },
      ],
    },
  },

  pages: [
    {
      name: "Profile",
      icon: "map:storage",
      route: "/profile/inventory",
    },
    {
      name: "Marketplace",
      icon: "map:grocery-or-supermarket",
      route: "/",
    },

    {
      name: "Loot",
      icon: "map:jewelry-store",
      route: "/loot",
    },
    {
      name: "Battle",
      icon: "map:museum",
      route: "/battle",
      disabled: true,
    },
  ],
};
```

### ChainInfo

For **chainInfo** we'll need to specify the chain we'll be using and where the contracts are deployed.

```js
 chainInfo: {
    chainId: "<CHAIN_ID : number>",
    coinCurrency: "<TOKEN_NAME : string>",
    coinIcon: "<ICONIFY_TOKEN_ICON : string>",
    color: "<COLOR: string>",
 }
```

### NFT COLLECTION

We'll define all of our NFT COLLECTION

```js
    name: "D Olympus Character",
    contract: {
      name: "DOlympusChatacterERC721",
      address: "",
      abi: "",
    },
```

Metadata from nfts will be reflected in the following objects.

If the NFT has some stats, like a videogame character, indicate it in the **nftStats** field.

```js
     nftStats: [
      {
        name: "<STAT_NAME_IDENTIFIER>",
        icon: "<ICONIFY_ICON_IDENTIFIER>",
        color: "<COLOR_IDENTIFIER>",
      },
        .
        .
        .
```

If the NFT is classified, for rareness or class, idicate it in the **nftTypes** field

```js
    nftTypes: [
      {
        text: "<STAT_NAME_IDENTIFIER>",
        icon: "<ICONIFY_ICON_IDENTIFIER>",
        color: "<COLOR_IDENTIFIER>",
      },
        .
        .
        .
```

## MARKETPLACE

To Add sort and View filters, add **orderType** field

```js
  orderType: {
      sort: [
        { text: "<OPTION_TEXT>", id: "<NUMERIC_IDENTIFIER>" },
        .
        .
        .
      ],
      view: [
        { text: "GRID", icon: "dashicons:grid-view" },
        { text: "LIST", icon: "dashicons:excerpt-view" },
      ],
    },
  },
```

# Connect the frontend and the contracts

Find in the code for // TEMPLATE -

In this functions develop the singlurarities
