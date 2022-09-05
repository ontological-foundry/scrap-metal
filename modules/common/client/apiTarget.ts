export enum TargetName {
  Edge = 'edge',
  Dev = 'dev',
  Staging = 'staging',
  Production = 'production',
}

const targetKey = 'API-Target'

let currentTarget = localStorage.getItem(targetKey)

if (currentTarget == null) {
  currentTarget = process.env.TARGET!
  localStorage.setItem(targetKey, currentTarget)
}

export function setTarget(target: TargetName) {
  currentTarget = target
  localStorage.setItem(targetKey, target)
}

export function getTarget(): TargetName {
  return currentTarget as TargetName
}
