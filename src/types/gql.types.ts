/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum OrganOrderFelid {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  creator = "creator",
  creatorName = "creatorName",
  updater = "updater",
  updaterName = "updaterName",
  sort = "sort",
  state = "state",
  name = "name",
  description = "description",
  uniqueName = "uniqueName",
  organId = "organId",
  parentId = "parentId"
}

export enum DictEntryOrderFelid {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  creator = "creator",
  creatorName = "creatorName",
  updater = "updater",
  updaterName = "updaterName",
  sort = "sort",
  state = "state",
  name = "name",
  value = "value",
  dictionaryId = "dictionaryId",
  description = "description"
}

export enum DictionaryOrderFelid {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  creator = "creator",
  creatorName = "creatorName",
  updater = "updater",
  updaterName = "updaterName",
  sort = "sort",
  state = "state",
  dictName = "dictName",
  name = "name",
  description = "description"
}

export enum OrderDirection {
  asc = "asc",
  desc = "desc"
}

export enum MenuOrderFelid {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  creator = "creator",
  creatorName = "creatorName",
  updater = "updater",
  updaterName = "updaterName",
  sort = "sort",
  state = "state",
  name = "name",
  description = "description",
  route = "route",
  icon = "icon",
  title = "title",
  type = "type",
  component = "component",
  outside = "outside",
  isHidden = "isHidden",
  parentId = "parentId"
}

export enum PostOrderFelid {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  creator = "creator",
  updater = "updater",
  sort = "sort",
  state = "state",
  name = "name",
  description = "description",
  organId = "organId",
  creatorName = "creatorName",
  updaterName = "updaterName"
}

export enum RoleOrderFelid {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  creatorName = "creatorName",
  updaterName = "updaterName",
  creator = "creator",
  updater = "updater",
  sort = "sort",
  state = "state",
  name = "name",
  description = "description",
  organId = "organId"
}

export enum UserOrderFelid {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  creator = "creator",
  updater = "updater",
  username = "username",
  password = "password",
  email = "email",
  nickname = "nickname",
  phone = "phone",
  age = "age",
  sex = "sex",
  admin = "admin",
  avatar = "avatar",
  sort = "sort",
  state = "state",
  roleId = "roleId",
  creatorName = "creatorName",
  updaterName = "updaterName"
}

export interface CreateCaptchaInput {
  background?: Nullable<string>;
  ignoreChars?: Nullable<string>;
  type?: Nullable<number>;
  size?: Nullable<number>;
  color?: Nullable<boolean>;
}

export interface SignUpInput {
  user?: Nullable<CreateUserInput>;
  uniCode?: Nullable<string>;
  answer?: Nullable<string>;
}

export interface SignInInput {
  username?: Nullable<string>;
  password?: Nullable<string>;
  uniCode?: Nullable<string>;
  answer?: Nullable<string>;
}

export interface CreateDepartmentInput {
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  parentId?: Nullable<string>;
  childrenIds?: Nullable<Nullable<string>[]>;
}

export interface UpdateDepartmentInput {
  id: number;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  parentId?: Nullable<string>;
  Organ?: Nullable<string>;
  parent?: Nullable<string>;
  childrenIds?: Nullable<Nullable<string>[]>;
}

export interface DepartmentOrderBy {
  field?: Nullable<OrganOrderFelid>;
  direction?: Nullable<OrderDirection>;
}

export interface DepartmentQuery {
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  creatorName?: Nullable<string>;
  updater?: Nullable<string>;
  updaterName?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  parentId?: Nullable<string>;
}

export interface QueryDepartmentInput {
  orderBy?: Nullable<DepartmentOrderBy>;
  query?: Nullable<DepartmentQuery>;
  after?: Nullable<string>;
  before?: Nullable<string>;
  first?: Nullable<number>;
  last?: Nullable<number>;
  skip?: Nullable<number>;
}

export interface CreateDictEntryInput {
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  value?: Nullable<string>;
  description?: Nullable<string>;
  dictionaryId?: Nullable<string>;
}

export interface UpdateDictEntryInput {
  id: number;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  value?: Nullable<string>;
  description?: Nullable<string>;
  dictionaryId?: Nullable<string>;
}

export interface DictEntryOrderBy {
  field?: Nullable<DictEntryOrderFelid>;
  direction?: Nullable<OrderDirection>;
}

export interface DictEntryQuery {
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  creatorName?: Nullable<string>;
  updater?: Nullable<string>;
  updaterName?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  value?: Nullable<string>;
  description?: Nullable<string>;
  dictionaryId?: Nullable<string>;
}

export interface QueryDictEntryInput {
  orderBy?: Nullable<DictEntryOrderBy>;
  query?: Nullable<DictEntryQuery>;
  after?: Nullable<string>;
  before?: Nullable<string>;
  first?: Nullable<number>;
  last?: Nullable<number>;
  skip?: Nullable<number>;
}

export interface CreateDictionaryInput {
  sort?: Nullable<number>;
  state?: Nullable<number>;
  dictName?: Nullable<string>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  dictEntries?: Nullable<Nullable<string>[]>;
  Organ?: Nullable<Nullable<string>[]>;
}

export interface UpdateDictionaryInput {
  id?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  dictName?: Nullable<string>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  dictEntries?: Nullable<Nullable<string>[]>;
  Organ?: Nullable<Nullable<string>[]>;
}

export interface DictionaryOrderBy {
  field?: Nullable<DictionaryOrderFelid>;
  direction?: Nullable<OrderDirection>;
}

export interface DictionaryQuery {
  id?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  creatorName?: Nullable<string>;
  updater?: Nullable<string>;
  updaterName?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  dictName?: Nullable<string>;
  name?: Nullable<string>;
  description?: Nullable<string>;
}

export interface QueryDictionaryInput {
  orderBy?: Nullable<DictionaryOrderBy>;
  query?: Nullable<DictionaryQuery>;
  after?: Nullable<string>;
  before?: Nullable<string>;
  first?: Nullable<number>;
  last?: Nullable<number>;
  skip?: Nullable<number>;
}

export interface CreateMenuInput {
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  route?: Nullable<string>;
  icon?: Nullable<string>;
  title?: Nullable<string>;
  type?: Nullable<number>;
  component?: Nullable<string>;
  outside?: Nullable<boolean>;
  isHidden?: Nullable<boolean>;
  isCache?: Nullable<boolean>;
  parentId?: Nullable<string>;
  childrenIds?: Nullable<Nullable<string>[]>;
  rolesIds?: Nullable<Nullable<string>[]>;
}

export interface UpdateMenuInput {
  id?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  route?: Nullable<string>;
  icon?: Nullable<string>;
  title?: Nullable<string>;
  type?: Nullable<number>;
  component?: Nullable<string>;
  outside?: Nullable<boolean>;
  isHidden?: Nullable<boolean>;
  isCache?: Nullable<boolean>;
  parentId?: Nullable<string>;
  childrenIds?: Nullable<Nullable<string>[]>;
  rolesIds?: Nullable<Nullable<string>[]>;
}

export interface MenuOrderBy {
  field?: Nullable<MenuOrderFelid>;
  direction?: Nullable<OrderDirection>;
}

export interface MenuQuery {
  id?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creatorName?: Nullable<string>;
  updaterName?: Nullable<string>;
  creator?: Nullable<string>;
  updater?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  route?: Nullable<string>;
  icon?: Nullable<string>;
  title?: Nullable<string>;
  type?: Nullable<number>;
  component?: Nullable<string>;
  outside?: Nullable<boolean>;
  isHidden?: Nullable<boolean>;
  isCache?: Nullable<boolean>;
  parentId?: Nullable<string>;
}

export interface QueryMenuInput {
  orderBy?: Nullable<MenuOrderBy>;
  query?: Nullable<MenuQuery>;
  after?: Nullable<string>;
  before?: Nullable<string>;
  first?: Nullable<number>;
  last?: Nullable<number>;
  skip?: Nullable<number>;
}

export interface QueryMenusByUserIdInput {
  userId: string;
  query?: Nullable<MenuQuery>;
  orderBy?: Nullable<Nullable<MenuOrderBy>[]>;
}

export interface CreateOrganInput {
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  uniqueName?: Nullable<string>;
  departmentIds?: Nullable<Nullable<string>[]>;
  postIds?: Nullable<Nullable<string>[]>;
  roleIds?: Nullable<Nullable<string>[]>;
  DictionaryIds?: Nullable<Nullable<string>[]>;
  userIds?: Nullable<Nullable<string>[]>;
}

export interface UpdateOrganInput {
  id?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  uniqueName?: Nullable<string>;
  departmentIds?: Nullable<Nullable<string>[]>;
  postIds?: Nullable<Nullable<string>[]>;
  roleIds?: Nullable<Nullable<string>[]>;
  DictionaryIds?: Nullable<Nullable<string>[]>;
  userIds?: Nullable<Nullable<string>[]>;
}

export interface OrganOrderBy {
  field?: Nullable<OrganOrderFelid>;
  direction?: Nullable<OrderDirection>;
}

export interface OrganQuery {
  creator?: Nullable<string>;
  updater?: Nullable<string>;
  creatorName?: Nullable<string>;
  updaterName?: Nullable<string>;
  username?: Nullable<string>;
  password?: Nullable<string>;
  nickname?: Nullable<string>;
  email?: Nullable<string>;
  phone?: Nullable<string>;
  sex?: Nullable<number>;
  age?: Nullable<number>;
  admin?: Nullable<number>;
  organId?: Nullable<string>;
  state?: Nullable<number>;
}

export interface QueryOrganInput {
  orderBy?: Nullable<OrganOrderBy>;
  after?: Nullable<string>;
  before?: Nullable<string>;
  first?: Nullable<number>;
  last?: Nullable<number>;
  query?: Nullable<OrganQuery>;
  skip?: Nullable<number>;
}

export interface CreatePostInput {
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  users?: Nullable<Nullable<string>[]>;
}

export interface UpdatePostInput {
  id?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  users?: Nullable<Nullable<string>[]>;
}

export interface PostOrderBy {
  field?: Nullable<PostOrderFelid>;
  direction?: Nullable<OrderDirection>;
}

export interface PostQuery {
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  updater?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  creatorName?: Nullable<string>;
  updaterName?: Nullable<string>;
}

export interface QueryPostInput {
  orderBy?: Nullable<PostOrderBy>;
  after?: Nullable<string>;
  before?: Nullable<string>;
  first?: Nullable<number>;
  last?: Nullable<number>;
  query?: Nullable<PostQuery>;
  skip?: Nullable<number>;
}

export interface CreateRoleInput {
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  usersIds?: Nullable<Nullable<string>[]>;
  menusIds?: Nullable<Nullable<string>[]>;
}

export interface UpdateRoleInput {
  id?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  usersIds?: Nullable<Nullable<string>[]>;
  menusIds?: Nullable<Nullable<string>[]>;
}

export interface RoleOrderBy {
  field?: Nullable<RoleOrderFelid>;
  direction?: Nullable<OrderDirection>;
}

export interface RoleQuery {
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  updater?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  creatorName?: Nullable<string>;
  updaterName?: Nullable<string>;
}

export interface QueryRoleInput {
  orderBy?: Nullable<RoleOrderBy>;
  after?: Nullable<string>;
  before?: Nullable<string>;
  first?: Nullable<number>;
  last?: Nullable<number>;
  query?: Nullable<RoleQuery>;
  skip?: Nullable<number>;
}

export interface CreateUserInput {
  username?: Nullable<string>;
  password?: Nullable<string>;
  email?: Nullable<string>;
  nickname?: Nullable<string>;
  phone?: Nullable<string>;
  age?: Nullable<number>;
  sex?: Nullable<number>;
  admin?: Nullable<number>;
  avatar?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  roleId?: Nullable<string>;
  creatorName?: Nullable<string>;
  updaterName?: Nullable<string>;
  organsIds?: Nullable<Nullable<string>[]>;
  postsIds?: Nullable<Nullable<string>[]>;
}

export interface UpdateUserInput {
  id?: Nullable<string>;
  username?: Nullable<string>;
  password?: Nullable<string>;
  email?: Nullable<string>;
  nickname?: Nullable<string>;
  phone?: Nullable<string>;
  age?: Nullable<number>;
  sex?: Nullable<number>;
  admin?: Nullable<number>;
  avatar?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  roleId?: Nullable<string>;
  creatorName?: Nullable<string>;
  updaterName?: Nullable<string>;
  organsIds?: Nullable<Nullable<string>[]>;
  postsIds?: Nullable<Nullable<string>[]>;
}

export interface UserOrderBy {
  field?: Nullable<UserOrderFelid>;
  direction?: Nullable<OrderDirection>;
}

export interface UserQuery {
  creator?: Nullable<string>;
  updater?: Nullable<string>;
  username?: Nullable<string>;
  password?: Nullable<string>;
  nickname?: Nullable<string>;
  email?: Nullable<string>;
  phone?: Nullable<string>;
  sex?: Nullable<number>;
  age?: Nullable<number>;
  admin?: Nullable<number>;
  organId?: Nullable<string>;
  state?: Nullable<number>;
}

export interface QueryUsersInput {
  orderBy?: Nullable<UserOrderBy>;
  after?: Nullable<string>;
  before?: Nullable<string>;
  first?: Nullable<number>;
  last?: Nullable<number>;
  query?: Nullable<UserQuery>;
  skip?: Nullable<number>;
}

export interface Token {
  access_token?: Nullable<JWT>;
  refresh_token?: Nullable<JWT>;
}

export interface Captcha {
  time?: Nullable<number>;
  uniCode?: Nullable<string>;
  svg?: Nullable<string>;
}

export interface Auth extends Token {
  access_token?: Nullable<JWT>;
  refresh_token?: Nullable<JWT>;
  user?: Nullable<User>;
}

export interface IMutation {
  captcha(createCaptchaInput: CreateCaptchaInput): Captcha | Promise<Captcha>;
  signUp(signUpInput: SignUpInput): Auth | Promise<Auth>;
  signIn(signInInput: SignInInput): Auth | Promise<Auth>;
  createDepartment(createDepartmentInput: CreateDepartmentInput): Department | Promise<Department>;
  updateDepartment(updateDepartmentInput: UpdateDepartmentInput): Department | Promise<Department>;
  removeDepartment(id: string): Nullable<Department> | Promise<Nullable<Department>>;
  createDictEntry(createDictEntryInput: CreateDictEntryInput): DictEntry | Promise<DictEntry>;
  updateDictEntry(updateDictEntryInput: UpdateDictEntryInput): DictEntry | Promise<DictEntry>;
  removeDictEntry(id: number): Nullable<DictEntry> | Promise<Nullable<DictEntry>>;
  createDictionary(createDictionaryInput: CreateDictionaryInput): Dictionary | Promise<Dictionary>;
  updateDictionary(updateDictionaryInput: UpdateDictionaryInput): Dictionary | Promise<Dictionary>;
  removeDictionary(id: string): Nullable<Dictionary> | Promise<Nullable<Dictionary>>;
  createMenu(createMenuInput: CreateMenuInput): Menu | Promise<Menu>;
  updateMenu(updateMenuInput: UpdateMenuInput): Menu | Promise<Menu>;
  removeMenu(id: string): Nullable<Menu> | Promise<Nullable<Menu>>;
  createOrgan(createOrganInput: CreateOrganInput): Organ | Promise<Organ>;
  updateOrgan(updateOrganInput: UpdateOrganInput): Organ | Promise<Organ>;
  removeOrgan(id: string): Nullable<Organ> | Promise<Nullable<Organ>>;
  createPost(createPostInput: CreatePostInput): Post | Promise<Post>;
  updatePost(updatePostInput: UpdatePostInput): Post | Promise<Post>;
  removePost(id: string): Nullable<Post> | Promise<Nullable<Post>>;
  createRole(createRoleInput: CreateRoleInput): Role | Promise<Role>;
  updateRole(updateRoleInput: UpdateRoleInput): Role | Promise<Role>;
  removeRole(id: string): Nullable<Role> | Promise<Nullable<Role>>;
  createUser(createUserInput: CreateUserInput): User | Promise<User>;
  updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
  removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface Department {
  id?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  creatorName?: Nullable<string>;
  updater?: Nullable<string>;
  updaterName?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  parentId?: Nullable<string>;
  Organ?: Nullable<Organ>;
  parent?: Nullable<Department>;
  children?: Nullable<Nullable<Department>[]>;
}

export interface DepartmentEdge {
  cursor: string;
  node: Department;
}

export interface DepartmentConnection {
  edges?: Nullable<Nullable<DepartmentEdge>[]>;
  pageInfo: PageInfo;
  totalCount: number;
}

export interface IQuery {
  departments(
    queryDepartmentInput: QueryDepartmentInput
  ): Nullable<UserConnection[]> | Promise<Nullable<UserConnection[]>>;
  departmentsById(
    ids?: Nullable<Nullable<string>[]>
  ): Nullable<Nullable<Department>[]> | Promise<Nullable<Nullable<Department>[]>>;
  department(id: string): Nullable<Department> | Promise<Nullable<Department>>;
  dictEntries(
    queryDictEntryInput?: Nullable<QueryDictEntryInput>
  ): Nullable<DictEntry>[] | Promise<Nullable<DictEntry>[]>;
  dictEntry(id: number): Nullable<DictEntry> | Promise<Nullable<DictEntry>>;
  dictionaries(
    queryDictionaryInput?: Nullable<QueryDictionaryInput>
  ): Nullable<Nullable<Dictionary>[]> | Promise<Nullable<Nullable<Dictionary>[]>>;
  dictionary(id: string): Nullable<Dictionary> | Promise<Nullable<Dictionary>>;
  menus(queryMenuInput?: Nullable<QueryMenuInput>): MenuConnection | Promise<MenuConnection>;
  menusByUserId(
    queryMenusByUserIdInput?: Nullable<QueryMenusByUserIdInput>
  ): Nullable<Menu>[] | Promise<Nullable<Menu>[]>;
  menu(id: string): Nullable<Menu> | Promise<Nullable<Menu>>;
  organs(queryOrganInput?: Nullable<QueryOrganInput>): OrganConnection | Promise<OrganConnection>;
  organsById(ids?: Nullable<Nullable<string>[]>): Nullable<Nullable<Organ>[]> | Promise<Nullable<Nullable<Organ>[]>>;
  organ(id: string): Nullable<Organ> | Promise<Nullable<Organ>>;
  posts(queryPostInput?: Nullable<QueryPostInput>): PostConnection | Promise<PostConnection>;
  postsById(ids?: Nullable<Nullable<string>[]>): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;
  post(id: string): Nullable<Post> | Promise<Nullable<Post>>;
  roles(queryRoleInput?: Nullable<QueryRoleInput>): RoleConnection | Promise<RoleConnection>;
  rolesById(ids?: Nullable<Nullable<string>[]>): Nullable<Nullable<Role>[]> | Promise<Nullable<Nullable<Role>[]>>;
  role(id: string): Nullable<Role> | Promise<Nullable<Role>>;
  users(QueryUsersInput?: Nullable<QueryUsersInput>): UserConnection | Promise<UserConnection>;
  user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface DictEntry {
  id?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  creatorName?: Nullable<string>;
  updater?: Nullable<string>;
  updaterName?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  value?: Nullable<string>;
  dictionaryId?: Nullable<string>;
  description?: Nullable<string>;
  Dictionary?: Nullable<Dictionary>;
}

export interface DictEntryEdge {
  cursor: string;
  node: DictEntry;
}

export interface DictEntryConnection {
  edges?: Nullable<Nullable<DictEntryEdge>[]>;
  pageInfo: PageInfo;
  totalCount: number;
}

export interface Dictionary {
  id?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  creatorName?: Nullable<string>;
  updater?: Nullable<string>;
  updaterName?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  dictName?: Nullable<string>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  dictEntries?: Nullable<Nullable<DictEntry>[]>;
  Organ?: Nullable<Nullable<Organ>[]>;
}

export interface DictionaryEdge {
  cursor: string;
  node: Dictionary;
}

export interface DictionaryConnection {
  edges?: Nullable<Nullable<DictionaryEdge>[]>;
  pageInfo: PageInfo;
  totalCount: number;
}

export interface PageInfo {
  endCursor?: Nullable<string>;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: Nullable<string>;
}

export interface Menu {
  id?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  updater?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  route?: Nullable<string>;
  icon?: Nullable<string>;
  title?: Nullable<string>;
  type?: Nullable<number>;
  component?: Nullable<string>;
  outside?: Nullable<boolean>;
  isHidden?: Nullable<boolean>;
  isCache?: Nullable<boolean>;
  parentId?: Nullable<string>;
  parent?: Nullable<Menu>;
  children?: Nullable<Nullable<Menu>[]>;
  roles?: Nullable<Nullable<Role>[]>;
}

export interface MenuEdge {
  cursor: string;
  node: Menu;
}

export interface MenuConnection {
  edges?: Nullable<Nullable<MenuEdge>[]>;
  pageInfo: PageInfo;
  totalCount: number;
}

export interface Organ {
  id?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  creatorName?: Nullable<string>;
  updater?: Nullable<string>;
  updaterName?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  uniqueName?: Nullable<string>;
  departments?: Nullable<Nullable<Department>[]>;
  posts?: Nullable<Nullable<Post>[]>;
  roles?: Nullable<Nullable<Role>[]>;
  Dictionary?: Nullable<Nullable<Dictionary>[]>;
  users?: Nullable<Nullable<User>[]>;
}

export interface OrganConnection {
  edges?: Nullable<OrganEdge[]>;
  pageInfo: PageInfo;
  totalCount: number;
}

export interface OrganEdge {
  cursor: string;
  node: Organ;
}

export interface Post {
  id?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  updater?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  creatorName?: Nullable<string>;
  updaterName?: Nullable<string>;
  Organ?: Nullable<Organ>;
  users?: Nullable<Nullable<User>[]>;
}

export interface PostConnection {
  edges?: Nullable<PostEdge[]>;
  pageInfo: PageInfo;
  totalCount: number;
}

export interface PostEdge {
  cursor: string;
  node: Post;
}

export interface Role {
  id?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creatorName?: Nullable<string>;
  updaterName?: Nullable<string>;
  creator?: Nullable<string>;
  updater?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  name?: Nullable<string>;
  description?: Nullable<string>;
  organId?: Nullable<string>;
  Organ?: Nullable<Organ>;
  users?: Nullable<Nullable<User>[]>;
  menus?: Nullable<Nullable<Menu>[]>;
}

export interface RoleConnection {
  edges?: Nullable<RoleEdge[]>;
  pageInfo: PageInfo;
  totalCount: number;
}

export interface RoleEdge {
  cursor: string;
  node: Role;
}

export interface User {
  id?: Nullable<string>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
  creator?: Nullable<string>;
  updater?: Nullable<string>;
  username?: Nullable<string>;
  password?: Nullable<string>;
  email?: Nullable<string>;
  nickname?: Nullable<string>;
  phone?: Nullable<string>;
  age?: Nullable<number>;
  sex?: Nullable<number>;
  admin?: Nullable<number>;
  avatar?: Nullable<string>;
  sort?: Nullable<number>;
  state?: Nullable<number>;
  roleId?: Nullable<string>;
  creatorName?: Nullable<string>;
  updaterName?: Nullable<string>;
  Role?: Nullable<Role>;
  organs?: Nullable<Nullable<Organ>[]>;
  posts?: Nullable<Nullable<Post>[]>;
}

export interface UserConnection {
  edges?: Nullable<UserEdge[]>;
  pageInfo: PageInfo;
  totalCount: number;
}

export interface UserEdge {
  cursor: string;
  node: User;
}

export type DateTime = any;
export type JWT = any;
type Nullable<T> = T | null;
