/** In-house product surfaces (single source for CTAs and SEO). */
export const inHouseProducts = {
  ticketos: {
    id: "ticketos",
    name: "TicketOS",
    shortName: "TicketOS",
    url: "https://portal.arwindpianist.com/",
    anchorId: "ticketos",
    legacyAnchorId: "ticketos",
  },
  condoclean: {
    id: "condoclean",
    name: "CondoClean",
    displayName: "CondoClean (AssetLink)",
    shortName: "CondoClean",
    engineeringName: "AssetLink",
    url: "https://condoclean.arwindpianist.com/",
    anchorId: "condoclean",
    legacyAnchorId: "assetlink",
  },
  myceliumlink: {
    id: "myceliumlink",
    name: "MyceliumLink",
    shortName: "MyceliumLink",
    url: "https://myceliumlink.com/",
    anchorId: "myceliumlink",
    legacyAnchorId: "myceliumlink",
  },
  quickklinik: {
    id: "quickklinik",
    name: "QuickKlinik",
    shortName: "QuickKlinik",
    url: "https://www.quickklinik.com/",
    anchorId: "quickklinik",
    legacyAnchorId: "quickklinik",
  },
} as const

export type InHouseProductKey = keyof typeof inHouseProducts

export const inHouseProductList = Object.values(inHouseProducts)
