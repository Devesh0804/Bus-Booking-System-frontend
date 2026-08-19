import {
  mockOnboardingDraft,
  mockOperator,
  mockOperatorCredentials,
  mockOperatorRegistration,
} from '../data/operatorData'

const delay = (value, time = 350) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(value), time)
  })

export function createOperatorAccount(registrationData) {
  return delay({
    ...mockOperatorRegistration,
    ...registrationData,
    id: 'operator-draft-001',
    status: 'pending',
  })
}

export function submitOperatorOnboarding(onboardingData) {
  return delay({
    ...mockOnboardingDraft,
    ...onboardingData,
    status: 'pending',
  })
}

export function loginOperator(credentials) {
  const isValid =
    credentials.email === mockOperatorCredentials.email &&
    credentials.password === mockOperatorCredentials.password

  if (!isValid) {
    return delay({
      ok: false,
      message: 'Use operator@example.com and operator123 for mock login.',
    })
  }

  return delay({
    ok: true,
    operator: mockOperator,
  })
}

export function getMockOperator() {
  return mockOperator
}
