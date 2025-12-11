import { Configuration, FrontendApi } from '@ory/client'

const ory = new FrontendApi(
  new Configuration({
    basePath: process.env.ORY_SDK_URL || process.env.NEXT_PUBLIC_ORY_SDK_URL || 'http://kratos:4433',
    baseOptions: {
      withCredentials: true,
    },
  })
)

export default ory
