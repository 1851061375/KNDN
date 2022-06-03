import { AuthModel } from './AuthModel'
import { UserAddressModel } from './UserAddressModel'
import { UserCommunicationModel } from './UserCommunicationModel'
import { UserEmailSettingsModel } from './UserEmailSettingsModel'
import { UserSocialNetworksModel } from './UserSocialNetworksModel'

export interface UserModel {
  token: string,
  groupcode: string,
  identifier: string,
  avartar: string,
  fullName: string,
  birthday: string,
  address: string,
  sex: string,
  phoneNumber: string,
  email: string
}
