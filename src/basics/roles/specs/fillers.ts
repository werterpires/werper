import { IRole } from '../types'

// ----------------------------- Data from Data Base ---------------------------

export const roleFfromDB1: any = {
  role_id: 2,
  role_name: 'subscriber',
  role_description: 'user who can control subscriptions'
}

export const rolefromDB2: any = {
  role_id: 1,
  role_name: 'superadmin',
  role_description: 'user who can control everything'
}

export const roleFfromDBwithNoName: any = {
  role_id: 2,
  role_description: 'user who can control subscriptions'
}

export const rolesfromDBwithNoName: any[] = [
  roleFfromDB1,
  rolefromDB2,
  roleFfromDBwithNoName
]

export const rolesArrayFromDb: any[] = [roleFfromDB1, rolefromDB2]

//-------------------------- Objects -------------------------------------------

export const role1: IRole = {
  roleId: 2,
  roleName: 'subscriber',
  roleDescription: 'user who can control subscriptions'
}

export const role2: IRole = {
  roleId: 1,
  roleName: 'superadmin',
  roleDescription: 'user who can control everything'
}

export const rolesArray: IRole[] = [role1, role2]
