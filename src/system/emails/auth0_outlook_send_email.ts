import axios from 'axios'
import configuration from '../../config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const msal = require('@azure/msal-node')

const SCOPES = ['https://graph.microsoft.com/.default']

interface Auth0OutlookSendEmailParams {
    toRecipients: string[]
    subject: string
    body: string
    emailContentType: 'Text' | 'HTML'
    ccRecipients?: string[]
    attachments?: { name: string; blob: Blob }[]
}
const auth0OutlookSendEmail = async (params: Auth0OutlookSendEmailParams): Promise<void> => {
    const { toRecipients, subject, body, emailContentType, ccRecipients = [], attachments = [] } = params

    const accessToken = await getToken()
    const URL_API = `https://graph.microsoft.com/v1.0/users/${configuration.AUTH0_EMAIL_AZURE_GRAPH.GRAPH_EMAIL_SENDER}/sendMail`

    const formattedAttachments = await Promise.all(
        attachments.map(async ({ blob, name }) => {
            const base64Content = await blobToBase64(blob)
            return {
                '@odata.type': '#microsoft.graph.fileAttachment',
                name,
                contentType: blob.type || 'application/octet-stream', // Tipo MIME
                contentBytes: base64Content,
            }
        }),
    )

    const sendResponse = await axios.post(
        URL_API,
        {
            message: {
                subject: subject,
                body: {
                    contentType: emailContentType,
                    content: body,
                },
                toRecipients: toRecipients.map((email) => ({ emailAddress: { address: email } })),
                ccRecipients: ccRecipients.length > 0 ? ccRecipients.map((email) => ({ emailAddress: { address: email } })) : undefined,
                attachments: formattedAttachments.length > 0 ? formattedAttachments : undefined,
            },
        },
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        },
    )

    if (sendResponse.status !== 200 && sendResponse.status !== 201 && sendResponse.status !== 202) {
        throw new Error(`Error sending email: ${sendResponse.statusText}`)
    }
}

const getToken = async (): Promise<string> => {
    const authClient = new msal.ConfidentialClientApplication({
        auth: {
            clientId: configuration.AUTH0_EMAIL_AZURE_GRAPH.GRAPH_EMAIL_CLIENT_ID,
            clientSecret: configuration.AUTH0_EMAIL_AZURE_GRAPH.GRAPH_EMAIL_CLIENT_SECRET,
            authority: `https://login.microsoftonline.com/${configuration.AUTH0_EMAIL_AZURE_GRAPH.GRAPH_EMAIL_TENANT_ID}`,
        },
    })
    const tokenRequest = authClient.acquireTokenByClientCredential({ scopes: SCOPES }).then((response: any) => {
        if (!response) throw new Error('Token acquisition failed')
        return response.accessToken
    })
    return tokenRequest
}

const blobToBase64 = async (blob: Blob): Promise<string> => {
    const buffer = await blob.arrayBuffer()
    return Buffer.from(buffer).toString('base64')
}

export { Auth0OutlookSendEmailParams, auth0OutlookSendEmail }
