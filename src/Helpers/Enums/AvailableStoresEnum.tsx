export enum AvailableStoresEnum {
  STEAM = "Steam",
  EPIC_GAMES = "Epic Games",
  XBOX = "Xbox Store",
  GOG = "GOG.com",
  PRIME_GAMING = "Prime Gaming",
  ITCH_IO = "itch.io",
}

export const AvailableStoreIds: Record<AvailableStoresEnum, number> = {
  [AvailableStoresEnum.STEAM]: 1,
  [AvailableStoresEnum.EPIC_GAMES]: 2,
  [AvailableStoresEnum.GOG]: 3,
  [AvailableStoresEnum.XBOX]: 4,
  [AvailableStoresEnum.PRIME_GAMING]: 5,
  [AvailableStoresEnum.ITCH_IO]: 6,
};