import { gql } from "@apollo/client";

const AUTH_FIELDS = gql`
  fragment AuthFields on User {
    id
    image
    token
  }
`;

const LOGIN_USER = gql`
  ${AUTH_FIELDS}
  mutation LoginUser($email: String! $password: String!) {
    login(email: $email password: $password) {
      ...AuthFields
      firstName
      lastName
      email
    }
  }
`;

const REGISTER_USER = gql`
  ${AUTH_FIELDS}
  mutation RegisterUser($firstName: String! $lastName: String! $email: String! $password: String!) {
    register(firstName: $firstName lastName: $lastName email: $email password: $password) {
      ...AuthFields
    }
  }
`;

const EMAIL_FIELDS = gql`
  fragment EmailFields on Email {
    id
    subject
    content
    createdAt
  }
`;

const EMAIL_PARTICIPANT_FIELDS = gql`
  fragment ParticipantFields on Participant {
    email
    fullName
  }
`;

const GET_RECEIVED_EMAILS = gql`
  ${EMAIL_FIELDS}
  ${EMAIL_PARTICIPANT_FIELDS}
  query GetReceivedEmails($loggedInUserEmail: String!) {
    getReceivedEmails(loggedInUserEmail: $loggedInUserEmail) {
      ...EmailFields
      sender {
        ...ParticipantFields
      }
    }
  }
`;

const GET_SENT_EMAILS = gql`
  ${EMAIL_FIELDS}
  ${EMAIL_PARTICIPANT_FIELDS}
  query GetSentEmails($loggedInUserEmail: String!) {
    getSentEmails(loggedInUserEmail: $loggedInUserEmail) {
      ...EmailFields
      recipient {
        ...ParticipantFields
      }
    }
  }
`;

const SEND_EMAIL = gql`
  mutation SendEmail($senderEmail: String! $recipientEmail: String! $subject: String! $content: String!
    $isSenderNameInClient: Boolean! $isRecipientNameInClient: Boolean!) {
    sendEmail(senderEmail: $senderEmail recipientEmail: $recipientEmail subject: $subject content: $content
      isSenderNameInClient: $isSenderNameInClient isRecipientNameInClient: $isRecipientNameInClient) {
      id
    }
  }
`;

const DELETE_EMAILS = gql`
  mutation DeleteEmails($ids: [ID]!) {
    deleteEmails(ids: $ids)
  }
`;

const NEW_EMAIL = gql`
  ${EMAIL_FIELDS}
  ${EMAIL_PARTICIPANT_FIELDS}
  subscription NewEmail {
    newEmail {
      ...EmailFields
      sender {
        ...ParticipantFields
      }
      recipient {
        ...ParticipantFields
      }
    }
  }
`;

export { GET_RECEIVED_EMAILS, GET_SENT_EMAILS, LOGIN_USER, REGISTER_USER, SEND_EMAIL, DELETE_EMAILS, NEW_EMAIL };