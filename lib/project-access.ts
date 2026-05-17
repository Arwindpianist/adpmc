export const PROJECT_ACCESS_PRODUCT_TYPE = "github_access"
export const PROJECT_ACCESS_TITLE = "Repository catalog access"
export const PROJECT_ACCESS_DESCRIPTION =
  "Unlock secure browsing for implementation repositories referenced in Case Studies in Infrastructure."

export function getProjectAccessAmount(): number {
  const raw = process.env.PROJECT_ACCESS_AMOUNT?.trim()
  const parsed = Number(raw)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error("PROJECT_ACCESS_AMOUNT is not configured.")
  }

  return Math.round(parsed)
}

export function getProjectAccessCurrency(): string {
  return process.env.PROJECT_ACCESS_CURRENCY?.trim() || "MYR"
}

export function getProjectAccessAmountLabel(): string {
  const label = process.env.NEXT_PUBLIC_PROJECT_ACCESS_AMOUNT_LABEL?.trim()
  if (label) return label

  const amount = getProjectAccessAmount()
  const currency = getProjectAccessCurrency()

  if (currency === "MYR") {
    return `MYR ${(amount / 100).toFixed(0)}`
  }

  return `${currency} ${(amount / 100).toFixed(2)}`
}
