import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type SignInFormState = {
  email: string
  password: string
  showPassword: boolean
  selectedMethod: string
}

type SignUpFormState = {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  acceptedTos: boolean
  showPassword: boolean
  selectedMethod: string
}

type RecoveryFormState = {
  email: string
  code: string
  step: "enter_email" | "enter_code"
  selectedMethod: string
}

type VerificationFormState = {
  email: string
  code: string
  step: "enter_email" | "enter_code"
  selectedMethod: string
}

export type AuthFormsState = {
  // Debug/visibility: store only the flow id (NOT the whole flow object).
  activeFlowId: string | null

  // Flow metadata derived from Kratos flow (UI stays decoupled from nodes).
  flowMeta: {
    id: string | null
    action: string | null
    httpMethod: string | null
    availableMethods: string[]
  }

  signIn: SignInFormState
  signUp: SignUpFormState
  recovery: RecoveryFormState
  verification: VerificationFormState
}

const initialState: AuthFormsState = {
  activeFlowId: null,
  flowMeta: {
    id: null,
    action: null,
    httpMethod: null,
    availableMethods: [],
  },
  signIn: {
    email: "",
    password: "",
    showPassword: false,
    selectedMethod: "password",
  },
  signUp: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    acceptedTos: false,
    showPassword: false,
    selectedMethod: "password",
  },
  recovery: {
    email: "",
    code: "",
    step: "enter_email",
    selectedMethod: "code",
  },
  verification: {
    email: "",
    code: "",
    step: "enter_email",
    selectedMethod: "code",
  },
}

export const authFormsSlice = createSlice({
  name: "authForms",
  initialState,
  reducers: {
    setActiveFlowId(state, action: PayloadAction<string | null>) {
      state.activeFlowId = action.payload
    },

    setFlowMeta(
      state,
      action: PayloadAction<{
        id: string | null
        action: string | null
        httpMethod: string | null
        availableMethods: string[]
      }>
    ) {
      state.flowMeta = action.payload
    },

    setSignInEmail(state, action: PayloadAction<string>) {
      state.signIn.email = action.payload
    },
    setSignInPassword(state, action: PayloadAction<string>) {
      state.signIn.password = action.payload
    },
    setSignInShowPassword(state, action: PayloadAction<boolean>) {
      state.signIn.showPassword = action.payload
    },
    setSignInSelectedMethod(state, action: PayloadAction<string>) {
      state.signIn.selectedMethod = action.payload
    },
    resetSignIn(state) {
      state.signIn = { ...initialState.signIn }
    },

    setSignUpEmail(state, action: PayloadAction<string>) {
      state.signUp.email = action.payload
    },
    setSignUpPassword(state, action: PayloadAction<string>) {
      state.signUp.password = action.payload
    },
    setSignUpFirstName(state, action: PayloadAction<string>) {
      state.signUp.firstName = action.payload
    },
    setSignUpLastName(state, action: PayloadAction<string>) {
      state.signUp.lastName = action.payload
    },
    setSignUpPhone(state, action: PayloadAction<string>) {
      state.signUp.phone = action.payload
    },
    setSignUpAcceptedTos(state, action: PayloadAction<boolean>) {
      state.signUp.acceptedTos = action.payload
    },
    setSignUpShowPassword(state, action: PayloadAction<boolean>) {
      state.signUp.showPassword = action.payload
    },
    setSignUpSelectedMethod(state, action: PayloadAction<string>) {
      state.signUp.selectedMethod = action.payload
    },
    resetSignUp(state) {
      state.signUp = { ...initialState.signUp }
    },

    setRecoveryEmail(state, action: PayloadAction<string>) {
      state.recovery.email = action.payload
    },
    setRecoveryCode(state, action: PayloadAction<string>) {
      state.recovery.code = action.payload
    },
    setRecoveryStep(state, action: PayloadAction<RecoveryFormState["step"]>) {
      state.recovery.step = action.payload
    },
    setRecoverySelectedMethod(state, action: PayloadAction<string>) {
      state.recovery.selectedMethod = action.payload
    },
    resetRecovery(state) {
      state.recovery = { ...initialState.recovery }
    },

    setVerificationEmail(state, action: PayloadAction<string>) {
      state.verification.email = action.payload
    },
    setVerificationCode(state, action: PayloadAction<string>) {
      state.verification.code = action.payload
    },
    setVerificationStep(state, action: PayloadAction<VerificationFormState["step"]>) {
      state.verification.step = action.payload
    },
    setVerificationSelectedMethod(state, action: PayloadAction<string>) {
      state.verification.selectedMethod = action.payload
    },
    resetVerification(state) {
      state.verification = { ...initialState.verification }
    },
  },
})

export const authFormsReducer = authFormsSlice.reducer
export const authFormsActions = authFormsSlice.actions


